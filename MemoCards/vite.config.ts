import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
import path from 'path'

export default defineConfig({
    plugins: [react(), eslint()],
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
        // you might want to disable the `css: true` line, since we don't have
        // tests that rely on CSS -- and parsing CSS is slow.
        // I'm leaving it in here becasue often people want to parse CSS in tests.
        css: true,
    },
})
