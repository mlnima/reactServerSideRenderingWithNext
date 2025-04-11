import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
  allConfig: {},
});

// Define your configuration directly in flat config format
const eslintConfig = [
  // Global ignores
  {
    ignores: ['**/node_modules/**', '.next/**', 'dist/**', 'build/**'],
  },

  // TypeScript & JSX files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: compat.plugins['@typescript-eslint'].parsers['@typescript-eslint-parser'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        // Node globals
        process: 'readonly',
        // ES globals
        Promise: 'readonly',
      }
    },
    // Use settings from compat to maintain compatibility with old format
    settings: {
      react: {
        version: 'detect'
      },
      next: {
        rootDir: 'apps/web-application/',
      },
    },
    plugins: {
      '@typescript-eslint': compat.plugins['@typescript-eslint'],
    },
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'args': 'after-used',
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      'no-unused-vars': 'off',
      'react/prop-types': 'off',
      'import/no-unresolved': 'off',
    }
  },

  // Include Next.js configuration
  ...compat.extends('next'),
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
];

export default eslintConfig;

// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//     es2021: true,
//     es6: true,
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
//     // Remove 'react-hooks' from here since it's already in 'next'
//     '@typescript-eslint'
//   ],
//   settings: {
//     react: {
//       version: 'detect'
//     }
//   },
//   extends: [
//     "plugin:@typescript-eslint/recommended",
//     "next",
//     "eslint:recommended"
//   ],
//   rules: {
//     // You can keep these rules even without the plugin listed above
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'warn',
//     "react/prop-types": "off",
//     'import/no-unresolved': 'off',
//     "no-unused-vars": "off", // Turn off the base rule
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
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
