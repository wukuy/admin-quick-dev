import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createSetupMock from './setup-mock'
import eslint from 'vite-plugin-eslint'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSetupMock())
    vitePlugins.push(eslint())
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
