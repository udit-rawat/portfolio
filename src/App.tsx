import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ring } from './components/Ring'
import { ProjectIndex } from './components/ProjectIndex'
import { Services } from './components/Services'
import { Journey } from './components/Journey'
import { Footer } from './components/Footer'
import { ProjectPage } from './pages/ProjectPage'
import { ImmigrationPage } from './pages/ImmigrationPage'
import { AdsPage } from './pages/AdsPage'
import { PaperPage } from './pages/PaperPage'
import { DocsPage } from './pages/DocsPage'
import { LabPage } from './pages/LabPage'
import { Team } from './components/Team'
import { ClosingCta } from './components/ClosingCta'
import { HOME_TITLE } from './home'

function Home() {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])
  return (
    <main>
      <Hero />
      <section id="work" aria-labelledby="demos-h" className="scroll-mt-20 px-4 pt-20 pb-8 sm:px-8">
        <div className="mx-auto max-w-[1120px]">
          <h2 id="demos-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
            See it working
          </h2>
          <p className="mt-2 max-w-[60ch] text-[15px] text-ink-soft">
            Four live demos, each built around a problem small businesses pay for every week, then the work we've shipped. Open one and watch it run.
          </p>
        </div>
      </section>
      <ProjectIndex />
      <Services />
      <Journey />
      <Team />
      <Ring />
      <ClosingCta />
    </main>
  )
}

/* Scroll to the hash target after navigation, or to the top on a new page. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView())
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFoundRedirect() {
  const { hash } = useLocation()
  return <Navigate to={{ pathname: '/', hash }} replace />
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/immigration" element={<ImmigrationPage />} />
        <Route path="/payback" element={<AdsPage />} />
        <Route path="/signed-off" element={<PaperPage />} />
        <Route path="/know-how" element={<DocsPage />} />
        <Route path="/lab" element={<LabPage />} />
        {/* /index.html and any other unknown address land on the home page. */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
      <Footer />
    </>
  )
}
