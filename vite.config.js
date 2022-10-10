import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default ({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_APP_BASE } = env
    return defineConfig({
        base: VITE_APP_BASE,
        resolve: {
            alias: {
                '~': resolve(__dirname, './'),
                '@': resolve(__dirname, './src'),
                components: resolve(__dirname, './src/components'),
                styles: resolve(__dirname, './src/styles'),
                utils: resolve(__dirname, './src/utils')
            }
        },
        plugins: createVitePlugins(env, command === 'build')
    })
}
