const { spawnSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { TurboJson, PackageJson } = require('@birthdayresearch/sticky-turbo');

module.exports = async function (_, project) {
  const turboJson = new TurboJson(project.rootDir);
  const packageJson = new PackageJson(project.rootDir);
  const displayName = project.displayName.name;

  for (const script of turboJson.getPipeline(displayName)?.dependsOn ?? []) {
    if (script.startsWith('^')) {
      await run(turboJson.getRootDir(), script.substring(1), `${packageJson.getName()}^...`);
    } else if (packageJson.hasScript(script)) {
      await run(turboJson.getRootDir(), script, packageJson.getName());
    }
  }
};

async function run(rootDir, script, filter) {
  const bin = './node_modules/.bin/turbo';
  const args = ['run', script, `--filter=${filter}`, `--output-logs=new-only`];

  if (!existsSync(join(rootDir, bin))) {
    throw new Error(`Cannot find ${bin}`);
  }

  const spawn = spawnSync(bin, args, {
    stdio: ['inherit', 'inherit', 'pipe'],
    cwd: rootDir,
  });

  if (spawn.stderr && spawn.stderr.length > 0) {
    throw new Error(spawn.stderr.toString('utf-8'));
  }
}
