const resolve = require('path').resolve;

module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module'
  },

  extends: 'airbnb-base',

  env: {
    browser: true,
    node: true
  },

  plugins: [
    'vue',
    'html'
  ],

  rules: {
    'comma-dangle': [2, 'never'],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'func-names': 0
  }
}
