module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'react-hooks',
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    // 'plugin:react/recommended',
    "plugin:@typescript-eslint/recommended",
    "next",
    // 'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'prettier',
    // "next/core-web-vitals",
    "eslint:recommended"
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    "react/prop-types": "off",
    "no-unused-vars": "warn", // Disable the default rule
    "@typescript-eslint/no-unused-vars": [
      "warn", // Or "error" if you prefer
      {
        "vars": "all", // Check all variables
        "args": "after-used", // Check function arguments
        "argsIgnorePattern": "^_", // Ignore arguments prefixed with "_"
        "varsIgnorePattern": "^_", // Ignore variables prefixed with "_"
        "ignoreRestSiblings": true // Ignore unused siblings in object destructuring
      }
    ]
  }
};
