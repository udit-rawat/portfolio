# portfolio

Udit Rawat's portfolio and freelance site, live at https://udit-rawat.github.io/portfolio/

Vite + React + TypeScript + Tailwind v4 + Motion. The resume PDF lives in the
separate [resume](https://github.com/udit-rawat/resume) repo; this site links to it.

## Run locally

    npm install
    npm run dev        # http://localhost:5173/portfolio/

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

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). The build copies `index.html` to `404.html` so
links to `/portfolio/work/<slug>` work on a refresh.

To move to another host later (Cloudflare Pages, a custom domain), change
`base` in `vite.config.ts` to `/` and point the host at `npm run build` / `dist`.

Design notes and the deliberate exceptions to them: `docs/anti-slop.md`.
