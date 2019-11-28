module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    indent: ['error', 2, { MemberExpression: 1 }],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'max-len': ['warn', { code: 80, ignoreUrls: true, ignoreTrailingComments: true }],
  },
  env: {
    'jest/globals': true,
    es6: true,
  },
};
