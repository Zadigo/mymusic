module.exports = {
  env: {
    node: true,
    browser: true
  },

  parser: 'vue-eslint-parser',

  rules: {
    'vue/attributes-order': 'warn',
    'vue/v-bind-style': [
      'error',
      'shorthand'
    ],
    'vue/html-quotes': 'warn',
    'vue/html-end-tags': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/html-indent': 'warn',
    'vue/order-in-components': 'warn',
    'vue/require-prop-types': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/v-on-style': 'warn',
    'vue/this-in-template': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': ['warn', { 'ignoreComments': true }]
  },

  root: true,

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],

  parserOptions: {
    ecmaVersion: 2020
  }
}
