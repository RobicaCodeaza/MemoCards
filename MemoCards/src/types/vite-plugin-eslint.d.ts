// src/types/vite-plugin-eslint.d.ts

declare module 'vite-plugin-eslint' {
    import { Plugin } from 'vite'
    const eslintPlugin: () => Plugin
    export default eslintPlugin
}
