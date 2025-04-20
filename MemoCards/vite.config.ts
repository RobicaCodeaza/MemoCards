import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
import path from 'path'

export default defineConfig({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
