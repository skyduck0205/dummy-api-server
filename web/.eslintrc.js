module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'function-paren-newline': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-curly-spacing': 0,
    'react/jsx-equals-spacing': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-indent': 0,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-multi-spaces': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-tag-spacing': 0,
    'react/jsx-wrap-multiline': 0,
    'react/no-did-update-set-state': 0,
    'react/prefer-stateless-function': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
