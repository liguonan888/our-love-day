import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/our-love-day/',
 build:{
  outDir:'docs',
 },
  plugins: [react()],
  css:{
    modules:{
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix'
    }
  }
})
