import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { steps } from '../data'

/*
  A route across a centre spine: stages alternate sides on wide screens and sit on one
  column on phones. The spine only runs through the stages, and the closing note sits
  below it, so nothing overlaps.
*/
export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="journey" aria-labelledby="jny-h" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="jny-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          How it works
        </h2>
        <p className="mt-2 max-w-[56ch] text-[15px] text-ink-soft">
          Every project follows the same route, from the first call to ongoing support. You always know the next stop.
        </p>

        <div ref={ref} className="mt-16">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[5px] w-[1.5px] bg-rule md:left-1/2 md:-translate-x-1/2">
              <motion.div className="h-full w-full origin-top bg-signal" style={{ scaleY: fill }} />
            </div>

            <ol className="space-y-14 md:space-y-20">
              {steps.map((s, i) => {
                const left = i % 2 === 0
                return (
                  <li key={s.title} className="relative pl-7 md:pl-0">
                    <span
                      aria-hidden="true"
                      className="absolute top-[7px] left-0 size-[11px] rounded-full border-[1.5px] border-signal bg-ground md:left-1/2 md:-translate-x-1/2"
                    />
                    <div
                      className={`w-full md:w-[calc(50%-40px)] ${
                        left ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                      }`}
                    >
                      <h3 className="text-[19px] font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{s.text}</p>
                      <div className="mt-3 grid gap-1.5 text-[14.5px] leading-[1.55]">
                        <p>
                          <span className="font-semibold">You do: </span>
                          <span className="text-ink-soft">{s.doing}</span>
                        </p>
                        <p>
                          <span className="font-semibold">You get: </span>
                          <span className="text-ink-soft">{s.gets}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <p className="mt-16 text-center text-[15px] text-ink-soft">
            Then the loop begins again with the next project, usually with more context than the last one.
          </p>
        </div>
      </div>
    </section>
  )
}
