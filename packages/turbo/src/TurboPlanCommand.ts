import * as process from 'node:process';

import { Command, Option } from 'clipanion';

import { Turbo } from './Turbo';

/**
 * Running `sticky-turbo plan test` generate a list of packages that contains a `test` script in the package.
 * You can use the output and loop through an array to run test individually via `turbo run test --filter=package`
 */
export class TurboPlanCommand extends Command {
  static override paths = [[`plan`]];

  task = Option.String({ required: true });

  scope = Option.Boolean('--scope', true, {
    description: 'Include scope in the package name, default to true',
  });

  async execute(): Promise<void> {
    const turbo = new Turbo(process.cwd());
    const packages = turbo.planPackages(this.task).map((name) => {
      if (this.scope) {
        return name;
      }
      return name.replace(/^@[^/]+\//, '');
    });
    this.context.stdout.write(`${JSON.stringify(packages, null, 2)}`);
    this.context.stdout.write('\n');
  }
}
