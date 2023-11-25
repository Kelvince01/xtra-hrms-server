/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "plugin:prettier/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    indent: ['error', 'tab'],
    "linebreak-style": ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prettier/prettier': [
      1,
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
      },
    ],
    ...require('eslint-config-prettier').rules,
    // ...require('eslint-config-prettier/@typescript-eslint').rules,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}