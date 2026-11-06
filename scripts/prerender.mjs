// Writes one static HTML file per route into dist/, so every page is readable
// without running JavaScript and each URL exists as a real file on the host.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const template = await readFile(join(root, 'dist', 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

// Tags that the server head replaces, so the page never carries two titles.
const STRIP = [
  /<title>[\s\S]*?<\/title>\s*/g,
  /<meta name="description"[^>]*>\s*/g,
  /<meta property="og:[^>]*>\s*/g,
  /<link rel="canonical"[^>]*>\s*/g,
]

for (const url of routes) {
  const { html, head } = render(url)
  let page = template
  for (const re of STRIP) page = page.replace(re, '')
  page = page.replace('</head>', `    ${head}\n  </head>`)
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const out = url === '/' ? join(root, 'dist', 'index.html') : join(root, 'dist', url.slice(1), 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, page)
  console.log(`prerendered ${url} -> ${out.replace(root + '/', '')}`)
}
