import { Link } from 'react-router-dom'
import { alsoAvailable, contact, services } from '../data'

/* Offers: what I take on, the proof behind each one, and where to start. */
export function Services() {
  return (
    <section id="services" aria-labelledby="svc-h" className="bg-ink px-4 py-24 text-ground sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="svc-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          Work with me
        </h2>
        <p className="mt-3 max-w-[54ch] text-[16px] leading-[1.55] text-white/65">
          Each offer is agreed in scope before any work starts. Pick the one closest to your problem.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="flex flex-col rounded-[14px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
              <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.55] text-white/80">{s.lede}</p>
              <ul className="mt-6 space-y-2 text-[15px] text-white/70">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-white/40">
                      +
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {s.proofHref.startsWith('/') && !s.proofHref.startsWith('/#') ? (
                  <Link to={s.proofHref} className="text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {s.proof}
                  </Link>
                ) : (
                  <a href={s.proofHref} className="text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {s.proof}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-white/15 pt-10">
          <h3 className="text-[19px] font-semibold tracking-tight">Also available</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 text-[15.5px] text-white/75 sm:grid-cols-2 lg:grid-cols-3">
            {alsoAvailable.map((x) => (
              <li key={x} className="flex gap-2.5">
                <span aria-hidden="true" className="text-white/40">
                  +
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-col items-start gap-5 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
            Tell me what you want to build.
          </p>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href={contact.projectMail}
              className="rounded-full bg-ground px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              Email me about a project
            </a>
            <span className="mono text-[12px] text-white/50">{contact.email}, usually a reply within a day</span>
          </div>
        </div>
      </div>
    </section>
  )
}
