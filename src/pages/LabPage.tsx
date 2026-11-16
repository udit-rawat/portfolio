import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { labProjects } from '../data'
import { ProjectIndex } from '../components/ProjectIndex'

export const LAB_TITLE = 'Lab: experiments and open-source tools, Udit Rawat'
export const LAB_DESCRIPTION =
  'Research reproductions, retrieval experiments and developer tools: the engineering behind the client work, with the numbers and the misses written up.'

/* The engineering work that sits behind the client demos, kept off the homepage. */
export function LabPage() {
  useEffect(() => {
    document.title = LAB_TITLE
  }, [])
  return (
    <main>
      <section className="ground-wash px-4 pt-32 pb-10 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="mono text-[12px] text-ink-soft">Lab</p>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.2rem,5.6vw,4.2rem)] leading-[1] font-semibold tracking-[-0.04em] text-balance">
            Experiments and open-source tools.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[clamp(1.02rem,1.5vw,1.15rem)] leading-[1.55] text-ink-soft">
            The engineering behind the client work: research reproductions, retrieval experiments and developer tools, with the numbers and
            the misses written up. Looking for what we build for businesses?{' '}
            <Link to="/" className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              See the demos
            </Link>
            .
          </p>
        </div>
      </section>
      <ProjectIndex list={labProjects} compact />
    </main>
  )
}
