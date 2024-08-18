import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react(), eslint()],
    test: {
        globals: true,
        environment: 'jsdom',
        // this points to the setup file created earlier
        setupFiles: './src/setupTests.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
