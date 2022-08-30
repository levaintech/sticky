module.exports = {
  plugins: ['simple-import-sort', 'check-file'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  ignorePatterns: ['dist'],
  rules: {
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-use-before-define': 'off',
    'no-console': 'error',

    // https://github.com/airbnb/javascript/issues/1271
    'no-restricted-syntax': 'off',

    'no-await-in-loop': 'off',

    // import
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // simple-import-sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // check-file
    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/*.{js,jsx,tsx,ts}': 'PASCAL_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],

    // @typescript-eslint
    '@typescript-eslint/no-use-before-define': 'off',
  },
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['**/*.unit.ts', '**/*.i9n.ts', '**/*.e2e.ts'],
      rules: {},
    },
    {
      files: ['src/**/{index,cli,main}.ts'],
      rules: {
        'check-file/filename-naming-convention': ['off'],
      },
    },
  ],
};
