import { spawnSync, SpawnSyncReturns, StdioOptions } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';

import { PackageJson } from './PackageJson';

export class Turbo {
  private readonly rootDir: string;

  constructor(protected readonly cwd: string, depth = 4) {
    const path = findRootTurboJsonPath(cwd, depth);
    if (path === undefined) {
      throw new Error('turbo.json not found');
    }
    this.rootDir = dirname(path);
  }

  getRootDir(): string {
    return this.rootDir;
  }

  /**
   * @param {string} task to plan
   * @param {Record<string, string | undefined>} opts for turbo CLI
   * @return {string[]} planned list of packages to run
   */
  planPackages(task: string, opts?: Record<string, string | undefined>): string[] {
    const { tasks } = this.plan(task, opts);
    return tasks
      .filter((t: any) => t.task === task)
      .filter((t: any) => t.command !== '<NONEXISTENT>')
      .map((t: any) => t.package as string);
  }

  /**
   * @param {string} task to run
   * @param {Record<string, string | undefined>} opts for turbo CLI
   * @deprecated use runTask
   */
  run(task: string, opts?: Record<string, string | undefined>): void {
    this.exec(['run', task], opts);
  }

  /**
   * @param {string} task to run
   * @param {Record<string, string | undefined>} opts for turbo CLI
   */
  runTask(task: string, opts?: Record<string, string | undefined>): void {
    this.exec(['run', task, ...optionsAsArgs(opts)]);
  }

  runTasks(
    pipelines: {
      task: string;
      opts?: Record<string, string | undefined>;
    }[],
    opts?: Record<string, string | undefined>,
  ): void {
    /**
     * Optimize the order of the pipelines to run where the most concurrent pipelines are run first.
     */
    const priority: Record<string, number> = {
      'build:docker': 1,
      default: Number.MAX_VALUE,
    };
    pipelines.sort((a, b): number => (priority[a.task] || priority.default) - (priority[b.task] || priority.default));

    for (const pipeline of pipelines) {
      this.exec([
        'run',
        pipeline.task,
        ...optionsAsArgs({
          ...opts,
          ...pipeline.opts,
        }),
      ]);
    }
  }

  /**
   * By taking advantage of content-aware hashing from turborepo. `dependsOn` only runs if the pipeline `inputs` has
   * changed.
   *
   * @param {string} task `dependsOn` without running the script
   * @param {Record<string, string | undefined>} opts for turbo CLI
   */
  runBefore(task: string, opts?: Record<string, string | undefined>): void {
    const packageJson = new PackageJson(this.cwd);
    const plan = this.plan(task, {
      ...opts,
      only: undefined,
      filter: packageJson.getName(),
    });

    const pipelines = plan.tasks[0].resolvedTaskDefinition.dependsOn
      .map((dependOnScript: string) => {
        if (dependOnScript.startsWith('^')) {
          return {
            task: dependOnScript.substring(1),
            opts: {
              filter: `${packageJson.getName()}^...`,
            },
          };
        }
        if (packageJson.hasScript(dependOnScript)) {
          return {
            task: dependOnScript,
            opts: {
              filter: packageJson.getName(),
            },
          };
        }

        return undefined;
      })
      .filter((p: any) => p !== undefined);

    this.runTasks(pipelines, opts);
  }

  /**
   * @param {string} task to plan
   * @param {Record<string, string | undefined>} opts for turbo CLI
   * @return {any} json object
   */
  private plan(task: string, opts?: Record<string, string | undefined>): any {
    const spawn = this.exec(
      ['run', task],
      {
        ...opts,
        dry: 'json',
      },
      'pipe',
    );

    return JSON.parse(spawn.stdout);
  }

  /**
   * @throws Error
   */
  private exec(
    args: string[],
    opts?: Record<string, string | undefined>,
    stdio: StdioOptions = ['inherit', 'inherit', 'pipe'],
  ): SpawnSyncReturns<string> {
    const bin = './node_modules/.bin/turbo';

    if (!existsSync(join(this.getRootDir(), bin))) {
      throw new Error(`Cannot find ${bin}`);
    }

    const spawn = spawnSync(bin, [...args, ...optionsAsArgs(opts)], {
      stdio,
      maxBuffer: 20_000_000,
      cwd: this.getRootDir(),
      encoding: 'utf-8',
    });

    // throw an error if non-zero exit code encountered
    if (spawn.status !== 0) {
      if (spawn.stderr?.length === 0) {
        throw new Error(`Encountered non-zero exit code while running: ${args.join(' ')}`);
      }
      if (spawn.stderr?.includes('error preparing engine: Could not find the following tasks in project: ')) {
        // Allow skipping of scripts that are not found in the project.
        // Porting back a desired behavior that was present in <1.8.0
        // TODO: we need to hide this misleading error "Could not find the following tasks in project" in console stdout
        // See https://github.com/vercel/turbo/pull/3828
        return spawn;
      }

      throw new Error(spawn.stderr);
    }

    return spawn;
  }
}

/**
 * Find the path of root turbo.json, locates where the monorepo root is.
 *
 * @param cwd {string} of the current working directory
 * @param depth {number} on how far up to search
 */
export function findRootTurboJsonPath(cwd: string, depth: number = 4): string | undefined {
  const paths = cwd.split(sep);

  for (let i = 0; i < depth; i += 1) {
    const path = `${paths.join(sep)}/turbo.json`;
    if (existsSync(path)) {
      const object = JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
      if (!object.extends?.includes('//')) {
        return path;
      }
    }
    paths.pop();
  }

  return undefined;
}

function optionsAsArgs(options?: Record<string, string | undefined>): string[] {
  if (!options) {
    return [];
  }

  return Object.entries(options).map(([key, value]) => {
    if (value === undefined) {
      return `--${key}`;
    }
    return `--${key}=${value}`;
  });
}
