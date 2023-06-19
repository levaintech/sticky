import * as process from 'process';

import { Turbo } from './Turbo';

it(`turbo.runTask('invalid-script') should be ignored; porting a desired behavior that was present in <1.8.0`, async () => {
  const turbo = new Turbo(process.cwd());
  turbo.runTask('invalid-script', {
    filter: `@stickyjs/turbo^...`,
  });
});

it(`turbo.runTasks('invalid-script') should be ignored; porting a desired behavior that was present in <1.8.0`, async () => {
  const turbo = new Turbo(process.cwd());
  turbo.runTasks([
    {
      task: 'invalid-script',
      opts: {
        filter: `@stickyjs/turbo^...`,
      },
    },
  ]);
});

it(`should turbo.runBefore('build') without failure`, async () => {
  const turbo = new Turbo(process.cwd());
  turbo.runBefore('build', {
    dry: 'json',
  });
});

it(`turbo.planPackages('test') should generate a list of packages to run`, async () => {
  const turbo = new Turbo(process.cwd());
  const packages = turbo.planPackages('test');
  expect(packages).toStrictEqual(
    expect.arrayContaining(['@stickyjs/jest', '@stickyjs/testcontainers', '@stickyjs/turbo']),
  );
});
