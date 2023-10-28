import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    react()
  ],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
    }
  }
})