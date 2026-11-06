# portfolio

Udit Rawat's portfolio and freelance site, live at https://uditrawat.dev (Cloudflare Pages)

Vite + React + TypeScript + Tailwind v4 + Motion. This is a consulting landing
page with project case studies, not a resume site.

## Run locally

    npm install
    npm run dev        # http://localhost:5173/

## Edit content

Everything you read on the site is in `src/data.ts`: projects, jobs, services,
papers, contact links. Write `[[shown text::how it was measured]]` in any text
to make a clickable number with a receipt.

## Folder covers

Each cover is a designed poster, one design movement per project (Brutalism,
De Stijl, Skeuomorphism, Swiss, Isometric, Bauhaus, 3D inflated, Paper cutout,
Op Art, Art Nouveau). All ten live in `covers-design/covers.html`; open it in a
browser to see them side by side. Render them to `public/covers/`:

    scripts/render_covers.sh            # all, or pass slugs: scripts/render_covers.sh tribunal

`scripts/make_covers.py` cuts the real project images used for the hover
previews and the sheets inside each folder, the dithered photo inside the
Misaanjh poster, and the School of Athens print in the hero (public domain,
Wikimedia Commons). Needs Pillow; the render script also needs Google Chrome.

## Deploy

Hosted on Cloudflare Pages at https://uditrawat.dev. Every push to `main` builds
and deploys automatically. The GitHub Pages site has been retired.

`npm run build` does four things:
1. Type-checks and builds the client bundle into `dist/`.
2. Builds a server bundle (`dist-ssr/`) of the same app.
3. Pre-renders every route (`/` and each `/work/<slug>`) into its own
   `index.html`, with per-page title, description, canonical and Open Graph tags,
   so pages are readable without JavaScript. `scripts/prerender.mjs` does this.
4. Copies `index.html` to `404.html` and keeps `public/_redirects` for any unknown address.

The route list comes from `src/data.ts`. Add a project there and it gets its own page on the next build.

Design notes and the deliberate exceptions to them: `docs/anti-slop.md`.
