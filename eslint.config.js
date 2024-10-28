import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import pluginJs from '@eslint/js';
import pluginNoOnlyTests from 'eslint-plugin-no-only-tests';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

/** @type {import('eslint').Linter.Config} */
export default [
    includeIgnoreFile(gitignorePath),
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
            '@stylistic/block-spacing': ['error', 'always'],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/computed-property-spacing': ['error', 'never'],
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
            '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/max-len': ['error', { code: 120, comments: 120, ignoreUrls: true }],
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/no-tabs': ['error', { allowIndentationTabs: false }],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
            '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
            '@stylistic/quote-props': ['error', 'as-needed'],
            '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-before-blocks': ['error', { classes: 'always', functions: 'always', keywords: 'always' }],
            '@stylistic/space-before-function-paren': [
                'error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }
            ],
            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],
            '@stylistic/spaced-comment': ['error', 'always'],
            '@stylistic/switch-colon-spacing': ['error', { before: false, after: true }],
            '@typescript-eslint/no-explicit-any': 'off', // TODO: Revisit this and consider switching to `unknown`.
            '@typescript-eslint/no-unused-expressions': 'off', // For `conditional && action()` syntax.
            '@typescript-eslint/no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_$' }],
            camelcase: 'error',
            eqeqeq: ['error', 'smart'],
            'no-var': 'error',
            'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }]
        }
    },
    {
        files: ['**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off'
        }
    },
    {
        files: ['**/*.spec.ts'],
        plugins: {
            '@no-only-tests': pluginNoOnlyTests
        },
        rules: {
            '@no-only-tests/no-only-tests': 'error',
            'no-useless-escape': 'off' // Needed to test vCard property value escaping.
        }
    }
];
