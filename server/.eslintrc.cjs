export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['canonical'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
  },
};
