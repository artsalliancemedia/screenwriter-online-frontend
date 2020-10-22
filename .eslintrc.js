module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'no-unused-vars': 1,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    camelcase: 0,
    'arrow-parens': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
