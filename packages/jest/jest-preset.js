module.exports = {
  roots: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '.*\\.(unit|i9n|e2e)\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'ts-jest',
  reporters: ['default', 'github-actions'],
  coverageReporters: ['json', 'json-summary'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testTimeout: 240000,
};
