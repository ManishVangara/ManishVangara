import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel sets the VERCEL environment variable to "1" during build.
  // We serve from '/' on Vercel, and '/ManishVangara/' on GitHub Pages/local.
  base: process.env.VERCEL ? '/' : '/ManishVangara/',
})
