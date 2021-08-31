module.exports = {
  extends: 'eslint-config-egg',
  rules: {
    'no-unused-vars': 0,
    'valid-jsdoc': 0,
    "require-jsdoc" : 0,
    semi: 0,
    eqeqeq: 2,
    quotes: [2, 'single', { allowTemplateLiterals: true }]
  }
}
