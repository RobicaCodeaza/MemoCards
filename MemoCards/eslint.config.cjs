// eslint.config.js or eslint.config.cjs
import { defineConfig } from 'eslint'

export default defineConfig({
    root: true,
    overrides: [
        {
            files: ['*.js', '*.ts', '*.tsx'],
            env: {
                browser: true,
                es2021: true,
            },
            settings: {
                react: {
                    version: 'detect',
                },
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/stylistic-type-checked',
                'plugin:react-hooks/recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
                'plugin:testing-library/react',
                'plugin:vitest/recommended',
                'plugin:jest-dom/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: __dirname,
            },
            plugins: ['react', '@typescript-eslint', 'react-refresh'],
            ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
            rules: {
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                'no-unused-vars': 'off',
                'react/prop-types': 'off',
                '@typescript-eslint/no-misused-promises': 'off',
                '@typescript-eslint/consistent-type-definitions': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                'vitest/expect-expect': 'off',
            },
            globals: {
                ...require('eslint-plugin-vitest').environments.env.globals,
            },
        },
    ],
})
