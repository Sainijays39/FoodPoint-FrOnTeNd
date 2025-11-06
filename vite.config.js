import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true,
    // 👇 This is the key part
    historyApiFallback: true
  },
  // 👇 Add this for production routing on Vercel
  build: {
    outDir: 'dist',
  },
  preview: {
    historyApiFallback: true,
  }
})
