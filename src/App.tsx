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

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        {/* /index.html and any other unknown address land on the home page. */}
        <Route path="*" element={<Navigate to={{ pathname: '/', hash: window.location.hash }} replace />} />
      </Routes>
      <Footer />
    </>
  )
}
