const preset = require('@birthdayresearch/sticky-jest/jest-preset');

module.exports = {
  ...preset,
  globalSetup: `${__dirname}/jest-turbo.js`,
};
