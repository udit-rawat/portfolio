import { team } from '../data'

/* Who a client actually works with: one builder, one person on the ground in Toronto, one main contact. */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="team-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          Who you'll work with
        </h2>
        <p className="mt-2 max-w-[56ch] text-[15px] text-ink-soft">A small team, so you always talk to the people doing the work.</p>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="flex flex-col rounded-[14px] bg-card p-6 ring-1 ring-black/5 sm:p-7">
              <div className="flex items-center gap-3.5">
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-[16px] font-semibold text-ground">
                  {m.name[0]}
                </span>
                <span>
                  <span className="block text-[18px] font-semibold tracking-tight">{m.name}</span>
                  <span className="mono block text-[11.5px] text-ink-faint">{m.city}</span>
                </span>
              </div>
              <p className="mt-5 text-[15px] font-semibold">{m.role}</p>
              <p className="mt-1.5 text-[15px] leading-[1.55] text-ink-soft">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
