import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
const typedEslintPlugin = eslint as () => import('vite').Plugin
// https://vitejs.dev/config/
import path from 'path'

export default defineConfig({
    plugins: [react(), typedEslintPlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        // this points to the setup file that we created earlier
        setupFiles: './src/setupTests.ts',
    },
})
