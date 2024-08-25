import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import vitest from 'eslint-plugin-vitest'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default tseslint.config(
    { ignores: ['dist', 'build'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
            react.configs.flat.recommended, // 'plugin:react/recommended',
            react.configs.flat['jsx-runtime'], // 'plugin:react/jsx-runtime',
            vitest.configs.recommended,
            jestDom.configs['flat/recommended'],
            testingLibrary['flat/recommended'],
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...vitest.environments.env.globals, ...globals.browser },
            parserOptions: {
                projectService: path.resolve(__dirname, './tsconfig.json'),
                tsconfigRootDir: __dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    project: path.resolve(__dirname, './tsconfig.json'),
                },
            },
        }, // What version of react we use to be available to the eslint-plugin-react
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            vitest,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-target-blank': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'vitest/expect-expect': 'off', // eliminate distracting red squiggles while writing tests
        },
    }
)
