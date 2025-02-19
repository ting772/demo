import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

let base = process.env.base
if (base) {
  base = base.replace(/^\/|\/$/, '')
}

base = base ? `/${base}/` : "/"
console.log('当前base：', base ?? '未定义')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      "dts": true,
      // global imports to register
      imports: [
        'vue',
        "vue-router"
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      "dts": true,
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@imgs': fileURLToPath(new URL('./src/assets/imgs/', import.meta.url)),
    },
    extensions: [
      ".vue",
      ".ts",
      ".js",
      ".json"
    ]
  },
})
