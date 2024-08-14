import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import filenames from 'eslint-plugin-filenames';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      filenames: filenames,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      'camelcase': ['error', { properties: 'never', ignoreDestructuring: false }],
      'class-name-casing': ['error', 'pascal-case'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          filter: {
            regex: '^[A-Z][A-Z0-9_]*$', 
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],
      // Enforce camelCase for file names
      'filenames/match-regex': [2, '^[a-z][a-zA-Z0-9]*\\.(ts|js)$', true], 
      // Ensure exported file names match the default export
      'filenames/match-exported': [2, 'camel', true], 
    },
  },
];
