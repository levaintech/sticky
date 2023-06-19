const { Turbo } = require('@stickyjs/turbo');

module.exports = async function (_, project) {
  if (isTurbo()) {
    console.log('jest-turbo: turbo is already running. skipping...');
    return;
  }

  const turbo = new Turbo(project.rootDir);
  // project.displayName represent the script
  const script = project.displayName.name;
  turbo.runBefore(script, {
    'output-logs': 'new-only',
  });
};

/**
 * Detects if the current process is a turbo invocation.
 * If so, we don't need to run turbo again.
 * @return {boolean}
 */
function isTurbo() {
  return process.env.TURBO_INVOCATION_DIR !== undefined;
}
