import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Cloudflare Pages (uditrawat.dev) serves from the root; GitHub Pages serves from /portfolio/.
// Cloudflare Pages sets CF_PAGES during builds.
export default defineConfig({
  base: process.env.CF_PAGES ? '/' : '/portfolio/',
  plugins: [react(), tailwindcss()],
})
