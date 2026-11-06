import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// The site is served from the root of uditrawat.dev (Cloudflare Pages).
// GitHub Pages is retired, so there is no sub-path base any more.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
