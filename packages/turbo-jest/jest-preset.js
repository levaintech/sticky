const preset = require('@stickyjs/jest/jest-preset');

module.exports = {
  ...preset,
  globalSetup: `${__dirname}/jest-turbo.js`,
};
