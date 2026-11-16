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

function Home() {
  useEffect(() => {
    document.title = 'Udit Rawat, AI Consultant'
  }, [])
  return (
    <main>
      <Hero />
      <Ring />
      <ProjectIndex />
      <Journey />
      <Services />
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
