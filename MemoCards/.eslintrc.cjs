module.exports = {
    root: true,
    env: { browser: true, es2020: true },

    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        `plugin:@typescript-eslint/recommended-type-checked`,
        `plugin:@typescript-eslint/stylistic-type-checked`,
        'plugin:react-hooks/recommended',
        `plugin:react/recommended`,
        `plugin:react/jsx-runtime`,
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/no-unused-vars': 'off',
    },
}
