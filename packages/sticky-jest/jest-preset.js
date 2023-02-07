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
  setupFilesAfterEnv: ['jest-extended/all', './jest.setup.ts'],
  testTimeout: 120000,
};
