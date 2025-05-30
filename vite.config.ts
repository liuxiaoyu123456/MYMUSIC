import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import requireTransform from 'vite-plugin-require-transform';
import electron from 'vite-plugin-electron'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
 
    alias: {
      "@": resolve(__dirname, "src"),
      '*': resolve('')
    },
 
  },
  plugins: [
    requireTransform({ fileRegex: /^(?!.*node_modules).*\.(js|jsx|ts|tsx)$/, }),
    vue(),
    electron({
      // 主进程入口文件
      entry: 'background.js'
    })
  ],
  server: {
    port: 3000,
  }
})
