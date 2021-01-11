const rules = {
  'linebreak-style': 0,
  'object-curly-spacing': ['error', 'always'],
  'quote-props': ['error', 'as-needed'],
  indent: 0,
  'sort-keys': 0,
  'array-element-newline': ['error', 'consistent'],
  'padded-blocks': ['error', 'never'],
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }
  ],
  'array-bracket-newline': 0,
  'object-property-newline': 0,
  quotes: ['error', 'single'],
  'function-call-argument-newline': 0,
  'no-ternary': 0,
  'multiline-ternary': 0,
  'capitalized-comments': 0,
  'arrow-body-style': 0,
  'sort-vars': 0,
  'arrow-parens': ['error', 'as-needed'],
  'no-extra-parens': [
    'error',
    'all',
    {
      nestedBinaryExpressions: false
    }
  ],
  'no-process-env': 0,
  'one-var': [
    'error',
    {
      var: 'always',
      let: 'always',
      const: 'always',
      separateRequires: true
    }
  ],
  'sort-imports': 0,
  'max-statements': ['error', 20],
  'new-cap': 0,
  'prefer-named-capture-group': 0
};
export default rules;
