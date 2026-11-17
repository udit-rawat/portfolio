import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { projectHref, showcase } from '../data'
import { asset } from '../asset'

/*
  The hero's right side: the demo posters as a small deck. Every few seconds the
  front card flicks off to the left and slides in at the back, and the line
  underneath says what that demo does. Hover holds it; click opens the demo.
*/

const OUTCOME: Record<string, string> = {
  'clean-file': 'Catch every mismatch before a file goes in',
  payback: 'See which of your ads actually pay back',
  'signed-off': 'Invoice the same day the job is done',
  'know-how': 'Answers from your own documents',
}

const demos = showcase.filter((p) => p.category === 'demo')

/* Resting place in the deck for each depth: front, then two peeking behind, then hidden. */
const SLOTS = [
  { x: 0, y: 0, rotate: -2, scale: 1 },
  { x: 26, y: -12, rotate: 4, scale: 0.94 },
  { x: -22, y: -22, rotate: -7, scale: 0.88 },
  { x: 0, y: -28, rotate: 0, scale: 0.84 },
]

export function DemoReel() {
  const reduced = useReducedMotion()
  const [front, setFront] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (reduced || hold) return
    const id = window.setTimeout(() => setFront((f) => (f + 1) % demos.length), 3400)
    return () => window.clearTimeout(id)
  }, [front, hold, reduced])

  const current = demos[front]

  return (
    <div className="mx-auto w-full max-w-[360px] pt-4 lg:mx-0 lg:pt-0" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
      <div className="relative mx-auto aspect-[300/390] w-[58%] max-w-[240px] sm:w-[72%] sm:max-w-none">
        {demos.map((p, i) => {
          const depth = (i - front + demos.length) % demos.length
          const slot = SLOTS[Math.min(depth, SLOTS.length - 1)]
          const leaving = depth === demos.length - 1
          return (
            <motion.div
              key={p.slug}
              className="absolute inset-0"
              style={{ zIndex: demos.length - depth }}
              initial={false}
              animate={
                leaving && !reduced
                  ? { x: [-0, -190, slot.x], y: [0, 30, slot.y], rotate: [-2, -18, slot.rotate], scale: [1, 0.96, slot.scale] }
                  : slot
              }
              transition={leaving && !reduced ? { duration: 0.85, times: [0, 0.42, 1], ease: [0.45, 0, 0.2, 1] } : { type: 'spring', stiffness: 260, damping: 26 }}
            >
              <Link
                to={projectHref(p)}
                tabIndex={depth === 0 ? 0 : -1}
                aria-hidden={depth !== 0}
                className="block h-full w-full overflow-hidden rounded-[6px] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_22px_40px_-16px_rgb(40_30_20/0.45)]"
              >
                <img src={asset(`covers/${p.slug}.webp`)} alt={`${p.title} demo poster`} className="h-full w-full object-cover" draggable={false} loading={i < 2 ? 'eager' : 'lazy'} />
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-7 min-h-[64px]">
        <motion.p key={current.slug} className="text-[15px] leading-snug" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
          <span className="font-semibold">{current.title}.</span> <span className="text-ink-soft">{OUTCOME[current.slug] ?? current.oneLiner}</span>
        </motion.p>
        <div className="mt-3 flex items-center gap-1.5" role="tablist" aria-label="Demos">
          {demos.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === front}
              aria-label={`Show ${p.title}`}
              onClick={() => setFront(i)}
              className="grid h-6 cursor-pointer place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === front ? 'w-6 bg-ink' : 'w-1.5 bg-ink/25'}`} />
            </button>
          ))}
          <Link to={projectHref(current)} className="ml-auto text-[14px] font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            Open demo
          </Link>
        </div>
      </div>
    </div>
  )
}
