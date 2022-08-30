import { existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

interface TurboPipeline {
  inputs?: string[];
  outputs?: string[];
  dependsOn?: string[];
}

/**
 * `turbo.json` represented as constructable Class.
 * This class will automatically locate where is the turbo.json and subsequently finding the project root.
 */
export class TurboJson {
  private readonly json: {
    pipeline: Record<string, TurboPipeline>;
  };

  private readonly rootDir: string;

  constructor(cwd: string, depth = 4) {
    const path = getTurboJsonPath(cwd, depth);
    if (path === undefined) {
      throw new Error('turbo.json not found');
    }
    this.rootDir = dirname(path);
    this.json = JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
  }

  /**
   * @return {string} root of the project dir
   */
  getRootDir() {
    return this.rootDir;
  }

  /**
   * @param {string} name of a pipeline
   * @return {TurboPipeline} with cache information about the pipeline
   */
  getPipeline(name: string): TurboPipeline | undefined {
    return this.json.pipeline[name];
  }
}

/**
 * Find turbo.json file, for locating where the monorepo root is.
 *
 * @param cwd {string} of the current working directory
 * @param depth {number} on how far up to search
 */
export function getTurboJsonPath(cwd: string, depth: number = 4): string | undefined {
  const paths = cwd.split('/');

  for (let i = 0; i < depth; i += 1) {
    const path = `${paths.join('/')}/turbo.json`;
    if (existsSync(path)) {
      return path;
    }
    paths.pop();
  }

  return undefined;
}
