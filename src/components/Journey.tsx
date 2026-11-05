import { steps } from '../data'

/* How a project works, from first call to ongoing support. Each stage expands to show what you do and what you get. */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="jny-h" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="jny-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          How it works
        </h2>
        <p className="mt-3 max-w-[54ch] text-[16px] leading-[1.55] text-ink-soft">
          Six stages from the first call to ongoing support. Open any stage to see what you do and what you get.
        </p>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <details open={i === 0} className="group rounded-[14px] bg-white/60 p-5 ring-1 ring-black/5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="mono text-[12px] text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="block text-[18px] font-semibold tracking-tight">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-[1.5] text-ink-soft">{s.text}</span>
                  </span>
                </summary>
                <div className="mt-5 space-y-3 border-t border-black/10 pt-4 text-[15px] leading-[1.55]">
                  <p>
                    <span className="font-semibold">You do: </span>
                    {s.doing}
                  </p>
                  <p>
                    <span className="font-semibold">You get: </span>
                    {s.gets}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
