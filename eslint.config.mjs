import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import testingLibrary from 'eslint-plugin-testing-library';
import reactCompiler from 'eslint-plugin-react-compiler';

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  reactCompiler.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',

      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',

      'import/order': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            ['parent', 'internal'],
            ['index', 'sibling'],
          ],
          'newlines-between': 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'import/no-default-export': 'error',
      // Disallow process.env access in src directory
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message:
            'Direct access to process.env is not allowed in src/. Import environment variables from @/env instead.',
        },
      ],
      // Disallow importing root env.js from src folder (must use @/env instead)
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['env', 'env.js', '../**/env', '../**/env.js', '!@/env'],
              message: 'Do not import root env.js from src/. Use @/env instead.',
            },
          ],
        },
      ],
    },
  },
  // Allow default exports for Expo Router files
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // Testing Library rules for test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: { 'testing-library': testingLibrary },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
