import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { MiniDoc, type DocKind, type Mark } from './MiniDoc'
import { springs } from '../shared/springs'

/*
  A 30-second story of one file being checked, told in six scenes over
  realistic (and clearly fake) documents. Plain markup and motion, no video.
  It only plays while on screen, and holds still for reduced-motion users.
*/

const SCENES = [
  { title: 'The client sends the file', text: 'Photos and PDFs arrive over WhatsApp, the way they always do.', ms: 4200 },
  { title: 'Every document is read', text: 'Names, dates and amounts are pulled out of each one.', ms: 5600 },
  { title: 'A mismatch is caught', text: "The name on the marriage certificate doesn't match the passport.", ms: 5000 },
  { title: 'The client is asked to fix it', text: 'A message in Punjabi and English, ready for you to send.', ms: 5200 },
  { title: 'The fix comes back', text: 'The corrected certificate arrives and the mismatch clears.', ms: 4600 },
  { title: 'Ready for your review', text: 'You read the report and sign off. Nothing goes in without you.', ms: 5000 },
]

type Doc = { id: string; kind: DocKind; caption: string; value: string; problem?: boolean }

const DOCS: Doc[] = [
  { id: 'passport', kind: 'passport', caption: 'Passport', value: 'GURPREET KAUR' },
  { id: 'id', kind: 'idcard', caption: 'Aadhaar card', value: 'Gurpreet Kaur' },
  { id: 'cert', kind: 'certificate', caption: 'Marriage certificate', value: 'Gurpreet Sidhu', problem: true },
  { id: 'bank', kind: 'bank', caption: 'Bank statement', value: '₹42,000' },
  { id: 'letter', kind: 'letter', caption: 'Salary letter', value: '₹42,000' },
]

const READ_GAP = 0.75 // seconds between documents in the reading pass

export function FileCheckAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)

  const playing = inView && !paused && !reduced

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENES[scene].ms)
    return () => window.clearTimeout(id)
  }, [playing, scene])

  const flagged = scene >= 2 && scene < 4
  const fixed = scene >= 4
  const current = SCENES[scene]

  function markFor(d: Doc): Mark {
    if (d.id === 'cert') return fixed ? 'good' : flagged ? 'bad' : 'none'
    if (d.id === 'passport' && flagged) return 'bad'
    if (d.id === 'passport' && fixed) return 'good'
    return 'none'
  }

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      {/* The stage */}
      <div className="relative order-2 min-w-0 overflow-hidden rounded-[10px] border border-rule bg-[#f6f5f1] p-4 pb-40 sm:p-6 sm:pb-44 lg:order-none" aria-hidden="true">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-semibold tracking-tight">Client file · Spousal sponsorship</p>
          <p className="mono text-[11px] text-ink-faint">{scene === 0 ? 'arriving on WhatsApp' : `${DOCS.length} documents`}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-5">
          {DOCS.map((d, i) => {
            const mark = markFor(d)
            const dim = flagged && !(d.id === 'cert' || d.id === 'passport')
            const read = scene >= 2
            return (
              <motion.div
                key={d.id}
                className="min-w-0"
                initial={reduced ? false : { opacity: 0, y: 24, rotate: i % 2 ? 3 : -3 }}
                animate={{ opacity: dim ? 0.35 : 1, y: 0, rotate: 0 }}
                transition={{ ...springs.smooth, delay: reduced || scene !== 0 ? 0 : 0.15 + i * 0.32 }}
              >
                <motion.div
                  animate={{ scale: mark === 'bad' ? 1.04 : 1 }}
                  transition={springs.snappy}
                  className={`rounded-[6px] transition-shadow duration-500 ${mark === 'bad' ? 'shadow-[0_0_0_2px_#d1432d]' : mark === 'good' ? 'shadow-[0_0_0_2px_#2f9e5b]' : ''}`}
                >
                  <MiniDoc
                    kind={fixed && d.id === 'cert' ? 'certificate' : d.kind}
                    value={fixed && d.id === 'cert' ? 'Gurpreet Kaur' : d.value}
                    mark={mark}
                    className="aspect-[3/4] w-full text-[clamp(7px,1.25vw,10.5px)]"
                    overlay={
                      scene === 1 && !reduced ? (
                        <motion.span
                          className="absolute inset-x-0 block h-[18%] bg-gradient-to-b from-transparent via-[#2b4fd6]/25 to-transparent"
                          initial={{ top: '-20%' }}
                          animate={{ top: '105%' }}
                          transition={{ delay: 0.2 + i * READ_GAP, duration: 0.8, ease: 'easeInOut' }}
                        />
                      ) : null
                    }
                  />
                </motion.div>
                <p className="mt-2 truncate text-[11.5px] font-medium sm:text-[12.5px]">
                  {fixed && d.id === 'cert' ? 'Certificate (new copy)' : d.caption}
                </p>
                <div className="h-4 text-[11px]">
                  {scene === 1 && !reduced && (
                    <motion.span
                      className="text-ink-faint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * READ_GAP }}
                    >
                      read ✓
                    </motion.span>
                  )}
                  {(read || reduced) && mark === 'none' && <span className="text-ink-faint">read ✓</span>}
                  {mark === 'bad' && <span className="font-semibold text-[#b42318]">mismatch</span>}
                  {mark === 'good' && <span className="font-semibold text-[#1f7a46]">matches ✓</span>}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Callouts at the bottom of the stage */}
        <AnimatePresence>
          {scene === 2 && (
            <motion.div
              key="mismatch"
              className="absolute right-4 bottom-4 left-4 rounded-[10px] border border-[#efc3bc] bg-[#fdf0ee] p-3.5 sm:right-6 sm:left-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springs.gentle}
            >
              <p className="text-[14.5px] font-semibold text-[#a3200f]">Name doesn't match</p>
              <p className="mono mt-1 text-[12px] text-ink-soft">Passport: GURPREET KAUR<br className="sm:hidden" /><span className="hidden sm:inline"> · </span>Marriage certificate: Gurpreet Sidhu</p>
            </motion.div>
          )}
          {scene === 3 && (
            <motion.div
              key="msg"
              className="absolute right-4 bottom-4 left-4 rounded-[12px] rounded-br-[3px] border border-[#cfe3d3] bg-[#e7f5ea] p-3.5 sm:left-auto sm:w-[340px]"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springs.gentle}
            >
              <p className="mono text-[10.5px] text-ink-faint">WhatsApp · draft for your approval</p>
              <p className="mt-1.5 text-[14px] leading-[1.5]">
                ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਜੀ। ਕਿਰਪਾ ਕਰਕੇ ਵਿਆਹ ਦੇ ਸਰਟੀਫਿਕੇਟ ਦੀ ਨਵੀਂ ਕਾਪੀ ਭੇਜੋ, ਜਿਸ ਵਿੱਚ ਨਾਮ ਪਾਸਪੋਰਟ ਵਾਂਗ ਹੋਵੇ।
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-soft">
                Please send a new copy of the marriage certificate with the name exactly as on the passport.
              </p>
            </motion.div>
          )}
          {scene === 4 && (
            <motion.div
              key="reply"
              className="absolute bottom-4 left-4 rounded-[12px] rounded-bl-[3px] border border-rule bg-white p-3.5 sm:w-[300px]"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={springs.gentle}
            >
              <p className="mono text-[10.5px] text-ink-faint">Client replied</p>
              <p className="mt-1.5 text-[14px]">📎 marriage-certificate-corrected.pdf</p>
            </motion.div>
          )}
          {scene === 5 && (
            <motion.div
              key="done"
              className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-[10px] bg-ink p-4 text-ground sm:right-6 sm:left-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={springs.gentle}
            >
              <motion.span
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2f9e5b] text-[15px] font-bold"
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ ...springs.snappy, delay: 0.15 }}
              >
                ✓
              </motion.span>
              <span>
                <span className="block text-[15px] font-semibold">File checked. Ready for your review.</span>
                <span className="mono block text-[11px] opacity-70">0 issues left · nothing was changed without you</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The caption, readable at a glance */}
      <div className="order-1 flex min-w-0 flex-col justify-between gap-5 lg:order-none lg:gap-6">
        <div aria-live="polite">
          <p className="mono text-[11px] text-ink-faint">
            Step {scene + 1} of {SCENES.length}
          </p>
          {/* Keyed so each new caption fades up; no exit animation to wait on. */}
          <motion.div
            key={scene}
            initial={reduced ? false : { opacity: 0.001, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.1] font-semibold tracking-[-0.02em]">{current.title}</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-ink-soft">{current.text}</p>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          {SCENES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Show step ${i + 1}: ${s.title}`}
              aria-current={i === scene}
              onClick={() => setScene(i)}
              className="flex h-7 flex-1 cursor-pointer items-center"
            >
              <span className="block h-2 w-full overflow-hidden rounded-full bg-rule">
                <span
                  className={`block h-full rounded-full bg-ink transition-[width] ${i <= scene ? 'w-full' : 'w-0'}`}
                  style={i === scene && playing ? { transitionDuration: `${s.ms}ms`, transitionTimingFunction: 'linear' } : { transitionDuration: '0ms' }}
                />
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="ml-2 min-h-9 rounded-full border border-rule px-3.5 text-[13px] text-ink-soft hover:text-ink"
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}
