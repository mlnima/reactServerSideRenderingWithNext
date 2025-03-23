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
    // Remove 'react-hooks' from here since it's already in 'next'
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next",
    "eslint:recommended"
  ],
  rules: {
    // You can keep these rules even without the plugin listed above
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/prop-types": "off",
    "no-unused-vars": "off", // Turn off the base rule
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "after-used",
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ]
  }
};


// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//     es2021: true,
//   },
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 2020,
//     sourceType: 'module'
//   },
//   plugins: [
//     'react-hooks',
//     '@typescript-eslint'
//   ],
//   settings: {
//     react: {
//       version: 'detect'
//     }
//   },
//   extends: [
//     // 'plugin:react/recommended',
//     "plugin:@typescript-eslint/recommended",
//     "next",
//     "eslint:recommended"
//   ],
//   rules: {
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'warn',
//     "react/prop-types": "off",
//     "no-unused-vars": "warn", // Disable the default rule
//     "@typescript-eslint/no-unused-vars": [
//       "warn", // Or "error" if you prefer
//       {
//         "vars": "all",
//         "args": "after-used",
//         "argsIgnorePattern": "^_",
//         "varsIgnorePattern": "^_",
//         "ignoreRestSiblings": true
//       }
//     ]
//   }
// };
