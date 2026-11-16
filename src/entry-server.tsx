import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'
import { projects, contact } from './data.ts'
import { IMMIGRATION_TITLE, IMMIGRATION_DESCRIPTION } from './pages/ImmigrationPage.tsx'
import { ADS_TITLE, ADS_DESCRIPTION } from './pages/AdsPage.tsx'
import { PAPER_TITLE, PAPER_DESCRIPTION } from './pages/PaperPage.tsx'

const SITE = 'https://uditrawat.dev'
const HOME_TITLE = 'Udit Rawat, AI Consultant'
const HOME_DESCRIPTION =
  'Udit Rawat builds AI systems and websites that hold up in production. Offline models on phones, agents with evals, LLM cost cuts, and Shopify stores. Taking freelance projects.'

/* Demo pages that live at their own address, with their own title and poster. */
const DEMOS: Record<string, { title: string; description: string; cover: string }> = {
  '/immigration': { title: IMMIGRATION_TITLE, description: IMMIGRATION_DESCRIPTION, cover: 'clean-file' },
  '/ad2client': { title: ADS_TITLE, description: ADS_DESCRIPTION, cover: 'ad2client' },
  '/paper2paid': { title: PAPER_TITLE, description: PAPER_DESCRIPTION, cover: 'paper2paid' },
}

/* Every page that gets its own static HTML file at build time. */
export const routes = ['/', ...Object.keys(DEMOS), ...projects.filter((p) => !p.href).map((p) => `/work/${p.slug}`)]

function headFor(url: string): string {
  const project = projects.find((p) => url === `/work/${p.slug}`)
  const demo = DEMOS[url]
  const title = project ? `${project.title}, Udit Rawat` : demo ? demo.title : HOME_TITLE
  const description = project ? project.oneLiner : demo ? demo.description : HOME_DESCRIPTION
  const canonical = url === '/' ? `${SITE}/` : `${SITE}${url}/`
  const image = project ? `${SITE}/covers/${project.slug}.webp` : demo ? `${SITE}/covers/${demo.cover}.webp` : `${SITE}/covers/tribunal.webp`

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${project ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (!project && !demo) {
    const person = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${SITE}/#udit`,
          name: 'Udit Rawat',
          url: SITE,
          email: contact.email,
          jobTitle: 'AI Consultant',
          address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
          sameAs: [contact.github, contact.linkedin],
          knowsAbout: ['Large language models', 'RAG', 'AI agents', 'Evals', 'On-device ML', 'Shopify automation'],
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE}/#service`,
          name: 'Udit Rawat, AI Consultant',
          url: SITE,
          provider: { '@id': `${SITE}/#udit` },
          email: contact.email,
          areaServed: 'Worldwide',
          serviceType: ['AI document processing', 'Support triage automation', 'LLM evaluation and reliability', 'Shopify store automation'],
        },
      ],
    }
    tags.push(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function render(url: string): { html: string; head: string } {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return { html, head: headFor(url) }
}
