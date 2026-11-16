import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import { DemoControls } from '../shared/DemoPlayer'
import { useDemoPlayer } from '../shared/useDemoPlayer'
import { Excerpt } from './Excerpt'
import { ANSWER, CONFLICT, GAP, QUESTION, RIFFLE, SOURCES, company } from './data'
import { springs } from '../shared/springs'

/*
  A 30-second story of a question answered from a company's own documents,
  told with paper rather than fades: the question types into a bar, a binder
  riffles, a highlighter sweeps the sentences that answer it, their numbered
  tags fly into the answer, a question nobody wrote down gets pinned to a board,
  and two price lists that disagree get circled. Plays only on screen.
*/

const SCENES = [
  { title: 'A question, in plain words', text: 'From a job site or the front desk, the way people actually ask.', ms: 3800 },
  { title: 'Every document is searched', text: `Manuals, warranty terms, procedures, price lists and old emails. ${company.docs} documents, ${company.pages} pages.`, ms: 3700 },
  { title: 'The exact sentences are found', text: 'Not a summary of a summary: the lines on the page that answer it.', ms: 4400 },
  { title: 'An answer, with its pages', text: 'Every part of the answer points to the page it came from, so anyone can check it.', ms: 6800 },
  { title: "When it isn't written down, it says so", text: 'No source, no answer. The question goes to the right person once, and their reply is kept.', ms: 6200 },
  { title: 'Out-of-date documents get caught', text: 'Two price lists disagree. It answers from the current one and flags the old one.', ms: 6400 },
]

/* ---------- small pieces ---------- */

function useTicker(total: number, run: boolean, every = 24, start = 300) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let id = 0
    const s = window.setTimeout(() => {
      setN(0)
      id = window.setInterval(() => setN((v) => (v >= total ? v : v + 1)), every)
    }, start)
    return () => {
      window.clearTimeout(s)
      window.clearInterval(id)
    }
  }, [total, run, every, start])
  return run ? n : total
}

function useSteps(count: number, run: boolean, start: number, every: number) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (!run) return
    const ids = [-1, ...Array(count).keys()].map((i) => window.setTimeout(() => setStep(i), i < 0 ? 0 : start + i * every))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [count, run, start, every])
  return run ? step : count - 1
}

function Caret() {
  return <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-[#3b2f63]" />
}

function Cite({ n, id }: { n: number; id?: string }) {
  return (
    <motion.span
      layoutId={id}
      transition={springs.gentle}
      className="mx-[2px] inline-grid size-[18px] translate-y-[-1px] place-items-center rounded-full bg-[#3b2f63] align-middle text-[10px] font-bold text-white"
    >
      {n}
    </motion.span>
  )
}

/* ---------- the question bar ---------- */

function SearchBar({ text, typing, run }: { text: string; typing: boolean; run: boolean }) {
  const n = useTicker(text.length, run && typing, 34, 250)
  const done = n >= text.length
  return (
    <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3.5 py-2.5 shadow-[0_1px_0_rgb(0_0_0/0.06),0_8px_20px_-14px_rgb(0_0_0/0.4)]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a7398" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <p className="min-w-0 flex-1 text-[13.5px] leading-snug sm:text-[14.5px]">
        {text.slice(0, n)}
        {!done && <Caret />}
      </p>
      <motion.span
        className="hidden shrink-0 rounded-[8px] bg-[#3b2f63] px-3 py-1.5 text-[12.5px] font-semibold text-white sm:inline"
        animate={typing && done && run ? { scale: [1, 0.9, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        Ask
      </motion.span>
    </div>
  )
}

/* ---------- left side: the paper ---------- */

const TABS = [
  { label: 'Warranty', color: '#f2d36b' },
  { label: 'Pricing', color: '#f0a9a0' },
  { label: 'Manuals', color: '#9fc3e8' },
  { label: 'Procedures', color: '#a9d6a6' },
  { label: 'Emails', color: '#cfc8dc' },
]

function Binder() {
  return (
    <div className="relative mx-auto h-[230px] w-full max-w-[280px]">
      {[2, 1, 0].map((k) => (
        <div
          key={k}
          className="absolute inset-y-0 left-0 right-6 rounded-[3px] bg-[#fdfbf6] shadow-[0_1px_0_rgb(0_0_0/0.06),0_10px_18px_-14px_rgb(0_0_0/0.5)]"
          style={{ transform: `translate(${k * 5}px, ${k * -5}px)` }}
        />
      ))}
      <div className="absolute inset-y-0 left-0 right-6 rounded-[3px] p-4">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-black/50">{company.name.toUpperCase()} · ALL DOCUMENTS</p>
        <p className="mt-2 text-[22px] leading-none font-semibold tracking-tight text-[#2a2a2a]">{company.docs} documents</p>
        <p className="mono mt-1 text-[11px] text-black/45">{company.pages} pages</p>
        <div className="mt-4 space-y-1.5">
          {['82%', '64%', '74%', '52%', '68%'].map((w) => (
            <span key={w} className="block h-[4px] rounded-full bg-black/[0.07]" style={{ width: w }} />
          ))}
        </div>
      </div>
      <div className="absolute top-3 right-0 flex flex-col gap-1">
        {TABS.map((t) => (
          <span key={t.label} className="rounded-r-[4px] py-1 pr-1.5 pl-2 text-[8.5px] font-semibold text-black/60" style={{ background: t.color }}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Pages flipping over on a hinge, one after another. */
function Riffle({ run, nothing = false }: { run: boolean; nothing?: boolean }) {
  const every = nothing ? 0.24 : 0.32
  return (
    <div className="relative mx-auto h-[230px] w-full max-w-[280px] [perspective:900px]">
      {RIFFLE.map((doc, i) => (
        <motion.div
          key={doc}
          className="absolute inset-y-0 left-0 right-6 rounded-[3px] bg-[#fdfbf6] p-4 shadow-[0_1px_0_rgb(0_0_0/0.06),0_10px_18px_-14px_rgb(0_0_0/0.5)] [backface-visibility:hidden]"
          style={{ zIndex: RIFFLE.length - i, transformOrigin: 'left center' }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: run && (i < RIFFLE.length - 1 || nothing) ? -172 : 0 }}
          transition={{ duration: 0.42, ease: [0.5, 0, 0.3, 1], delay: run ? 0.25 + i * every : 0 }}
        >
          <p className="text-[10px] font-semibold tracking-[0.14em] text-black/50 uppercase">{doc}</p>
          <div className="mt-3 space-y-1.5">
            {['86%', '70%', '78%', '58%', '74%', '66%', '80%'].map((w, k) => (
              <span key={k} className="block h-[4px] rounded-full bg-black/[0.07]" style={{ width: w }} />
            ))}
          </div>
          <p className="mono absolute right-3 bottom-2.5 text-[9.5px] text-black/35">p. {12 + i * 37}</p>
        </motion.div>
      ))}
      {nothing && (
        <motion.div
          className="absolute inset-0 right-6 grid place-items-center"
          initial={run ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springs.snappy, delay: run ? 0.3 + RIFFLE.length * every : 0 }}
        >
          <p className="rounded-[6px] border-2 border-dashed border-[#7a7398]/60 px-3 py-2 text-center text-[13px] font-semibold text-[#3b2f63]">
            No page answers this
          </p>
        </motion.div>
      )}
    </div>
  )
}

function Excerpts({ scene, cited, run }: { scene: number; cited: number; run: boolean }) {
  const tilt = ['-rotate-[1.2deg]', 'rotate-[0.8deg] sm:ml-4', '-rotate-[0.6deg] sm:ml-1']
  return (
    <div className="space-y-2.5">
      {SOURCES.map((s, i) => (
        <motion.div
          key={s.n}
          className={tilt[i]}
          initial={run && scene === 2 ? { opacity: 0, y: 24, rotate: i % 2 ? 4 : -4 } : false}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ ...springs.smooth, delay: run && scene === 2 ? i * 0.12 : 0 }}
        >
          <Excerpt
            source={s}
            sweep={scene >= 2}
            delay={0.55 + i * 0.75}
            instant={!run || scene > 2}
            badge={
              cited < s.n && (
                <motion.span
                  className="absolute -top-2 -right-2"
                  initial={run && scene === 2 ? { scale: 0 } : false}
                  animate={{ scale: 1 }}
                  transition={{ ...springs.snappy, delay: run && scene === 2 ? 1.35 + i * 0.75 : 0 }}
                >
                  <Cite n={s.n} id={`cite-${s.n}`} />
                </motion.span>
              )
            }
          />
        </motion.div>
      ))}
    </div>
  )
}

function Circle({ delay, run, color = '#d1432d' }: { delay: number; run: boolean; color?: string }) {
  return (
    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-3 -inset-y-2" aria-hidden="true">
      <motion.path
        d="M52 4C24 2 4 12 5 26s22 21 46 20 44-8 44-22S72 2 40 6"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={run ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: run ? 0.7 : 0, ease: 'easeInOut', delay: run ? delay : 0 }}
      />
    </svg>
  )
}

function PriceCards({ run }: { run: boolean }) {
  const card = 'relative rounded-[3px] bg-[#fdfbf6] p-3.5 shadow-[0_1px_0_rgb(0_0_0/0.06),0_10px_20px_-14px_rgb(0_0_0/0.5)]'
  return (
    <div className="relative mx-auto max-w-[300px] pt-1">
      <motion.div
        className={`${card} -rotate-[3deg]`}
        initial={run ? { x: -40, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ...springs.smooth, delay: run ? 1.6 : 0 }}
      >
        <p className="text-[10px] font-semibold tracking-wide text-black/50 uppercase">{CONFLICT.old.doc}</p>
        <p className="mt-1 text-[11.5px] text-black/55">Diagnostic visit</p>
        <span className="relative mt-1 inline-block text-[28px] leading-none font-semibold tracking-tight text-[#2a2a2a]">
          {CONFLICT.old.amount}
          <Circle delay={2.6} run={run} />
          <motion.span
            className="absolute -inset-x-1 top-1/2 h-[3px] origin-left rounded-full bg-[#d1432d]"
            initial={run ? { scaleX: 0 } : false}
            animate={{ scaleX: 1 }}
            transition={{ duration: run ? 0.3 : 0, delay: run ? 4 : 0, ease: 'easeOut' }}
          />
        </span>
      </motion.div>
      <motion.div
        className={`${card} relative -mt-2 ml-12 rotate-[2deg]`}
        initial={run ? { x: 40, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ...springs.smooth, delay: run ? 1.8 : 0 }}
      >
        <p className="text-[10px] font-semibold tracking-wide text-black/50 uppercase">{CONFLICT.current.doc}</p>
        <p className="mt-1 text-[11.5px] text-black/55">Diagnostic visit</p>
        <span className="relative mt-1 inline-block text-[28px] leading-none font-semibold tracking-tight text-[#2a2a2a]">
          {CONFLICT.current.amount}
          <Circle delay={3.1} run={run} color="#2f7d4f" />
        </span>
      </motion.div>
    </div>
  )
}

/* ---------- right side: answers ---------- */

const panel = 'rounded-[10px] bg-white p-4 shadow-[0_1px_0_rgb(0_0_0/0.06),0_12px_24px_-16px_rgb(0_0_0/0.4)]'

function LookingIn({ run }: { run: boolean }) {
  const rows = [
    ['Service records', '412'],
    ['Warranty terms', '38'],
    ['Field procedures', '96'],
    ['Price lists', '14'],
    ['Manuals', '610'],
    ['Team emails', '70'],
  ]
  const step = useSteps(rows.length, run, 300, 480)
  return (
    <div className={panel}>
      <p className="mono text-[10.5px] tracking-wide text-ink-faint uppercase">Looking in</p>
      <ul className="mt-2 space-y-1.5 text-[13px]">
        {rows.map(([name, pages], i) => (
          <li key={name} className={`flex items-center gap-2 transition-opacity duration-200 ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
            <span className={`grid size-4 place-items-center rounded-full text-[9px] font-bold text-white transition-colors ${i <= step ? 'bg-[#3b2f63]' : 'bg-black/15'}`}>✓</span>
            <span className="flex-1">{name}</span>
            <span className="mono text-[11px] text-ink-faint">{pages} pp.</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Found() {
  return (
    <div className={panel}>
      <p className="mono text-[10.5px] tracking-wide text-ink-faint uppercase">3 sentences answer this</p>
      <ul className="mt-2 space-y-2 text-[13px]">
        {SOURCES.map((s) => (
          <li key={s.n} className="flex items-start gap-2">
            <span className="mt-[1px] grid size-[18px] shrink-0 place-items-center rounded-full bg-[#3b2f63]/15 text-[10px] font-bold text-[#3b2f63]">{s.n}</span>
            <span className="min-w-0">
              {s.doc} <span className="mono text-[11px] text-ink-faint">{s.page}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ENDS = ANSWER.reduce<number[]>((acc, seg) => [...acc, (acc.at(-1) ?? 0) + seg.text.length], [])

function AnswerCard({ n }: { n: number }) {
  return (
    <div className={panel}>
      <p className="mono text-[10.5px] tracking-wide text-ink-faint uppercase">Answer</p>
      <p className="mt-2 text-[14.5px] leading-[1.6]">
        {ANSWER.map((seg, i) => {
          const from = ENDS[i] - seg.text.length
          const shown = seg.text.slice(0, Math.max(0, n - from))
          const done = n >= ENDS[i]
          return (
            <span key={i}>
              {shown}
              {seg.cite && done && <Cite n={seg.cite} id={`cite-${seg.cite}`} />}
            </span>
          )
        })}
        {n < (ENDS.at(-1) ?? 0) && <Caret />}
      </p>
      <p className="mono mt-3 border-t border-rule pt-2 text-[10.5px] text-ink-faint">Tap a number to open the page</p>
    </div>
  )
}

function Board({ run }: { run: boolean }) {
  const note = 'absolute w-[46%] p-2.5 text-[11.5px] leading-snug text-[#3a3320] shadow-[0_6px_10px_-6px_rgb(0_0_0/0.45)]'
  return (
    <div className="space-y-3">
      <div className={panel}>
        <p className="mono text-[10.5px] tracking-wide text-ink-faint uppercase">Answer</p>
        <p className="mt-2 text-[14px] leading-[1.55]">
          Not in your documents, so it won't guess. Sent to {GAP.owner} to answer once.
        </p>
      </div>
      <div
        className="relative h-[176px] overflow-hidden rounded-[8px] border-[5px] border-[#8a6a48] bg-[#c99f72]"
        style={{ backgroundImage: 'radial-gradient(rgb(90 60 30 / 0.25) 1px, transparent 1.2px)', backgroundSize: '7px 7px' }}
      >
        <p className="absolute top-1.5 left-2.5 rounded-[3px] bg-white/85 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#5a4026] uppercase">Not written down yet</p>
        <div className={`${note} top-9 left-3 rotate-[4deg] bg-[#fff2a8]/80`}>Refund over $500, who approves?</div>
        <div className={`${note} top-[98px] left-6 -rotate-[2deg] bg-[#ffd9e6]/80`}>Heat pump rebate paperwork?</div>
        <motion.div
          className={`${note} top-10 right-3 bg-[#ffe66d]`}
          initial={run ? { y: -140, rotate: -22, scale: 1.3, opacity: 0 } : false}
          animate={{ y: 0, rotate: -3, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 17, delay: run ? 3.1 : 0 }}
        >
          <motion.span
            className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#d1432d] shadow-[0_2px_2px_rgb(0_0_0/0.4)]"
            initial={run ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ ...springs.snappy, delay: run ? 3.5 : 0 }}
          />
          <span className="font-semibold">{GAP.question}</span>
          <span className="mt-1 block text-[10.5px] opacity-70">
            asked {GAP.asked}× this week · {GAP.owner}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function ConflictAnswer({ run }: { run: boolean }) {
  return (
    <div className="space-y-3">
      <motion.div className={panel} initial={run ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ ...springs.smooth, delay: run ? 3.6 : 0 }}>
        <p className="mono text-[10.5px] tracking-wide text-ink-faint uppercase">Answer</p>
        <p className="mt-2 text-[14.5px] leading-[1.55]">
          {CONFLICT.current.amount}, from the 2026 price list <Cite n={1} />, waived if the repair goes ahead.
        </p>
      </motion.div>
      <motion.div
        className="flex items-start gap-2.5 rounded-[10px] border border-[#e8a59b] bg-[#fdf0ee] p-3.5"
        initial={run ? { opacity: 0, x: 16 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...springs.snappy, delay: run ? 4.4 : 0 }}
      >
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="mt-0.5 shrink-0"
          aria-hidden="true"
          style={{ originX: 0.15, originY: 1 }}
          animate={run ? { rotate: [0, -14, 10, -6, 0] } : undefined}
          transition={{ duration: 0.7, delay: 4.7 }}
        >
          <path d="M5 21V4" stroke="#a3200f" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M5 4h12l-2.5 4L17 12H5" fill="#d1432d" />
        </motion.svg>
        <p className="text-[13px] leading-snug text-[#7a1d10]">
          <span className="font-semibold">Flagged for you:</span> {CONFLICT.old.doc} still says {CONFLICT.old.amount} and is in the shared drive. Remove it?
        </p>
      </motion.div>
    </div>
  )
}

/* ---------- the stage ---------- */

function Stage({ scene, run }: { scene: number; run: boolean }) {
  const total = ENDS.at(-1) ?? 0
  const n = useTicker(total, run && scene === 3, 22, 500)
  const cited = scene < 3 ? 0 : ANSWER.filter((seg, i) => seg.cite && n >= ENDS[i]).length
  const question = scene === 4 ? GAP.question : scene === 5 ? CONFLICT.question : QUESTION

  return (
    <LayoutGroup>
      <SearchBar key={question} text={question} typing={scene === 0 || scene === 4 || scene === 5} run={run} />
      <div className="mt-5 grid gap-5 sm:min-h-[330px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6">
        <div className="min-w-0">
          {scene === 0 && <Binder />}
          {scene === 1 && <Riffle run={run} />}
          {(scene === 2 || scene === 3) && <Excerpts scene={scene} cited={cited} run={run} />}
          {scene === 4 && <Riffle run={run} nothing />}
          {scene === 5 && <PriceCards run={run} />}
        </div>
        <div className="min-w-0">
          {scene === 0 && <p className="hidden pt-16 text-center text-[13px] text-ink-faint sm:block">Answers come with the page they came from.</p>}
          {scene === 1 && <LookingIn run={run} />}
          {scene === 2 && <Found />}
          {scene === 3 && <AnswerCard n={n} />}
          {scene === 4 && <Board run={run} />}
          {scene === 5 && <ConflictAnswer run={run} />}
        </div>
      </div>
    </LayoutGroup>
  )
}

export function AskAnimation() {
  const { ref, scene, setScene, playing, still, toggle } = useDemoPlayer(SCENES)
  const reduced = still
  const run = !still

  const current = SCENES[scene]

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      <div
        className="relative order-2 min-w-0 overflow-hidden rounded-[10px] border border-rule p-4 sm:p-6 lg:order-none"
        style={{ backgroundColor: '#ebe8f1', backgroundImage: 'radial-gradient(rgb(59 47 99 / 0.13) 1px, transparent 1.3px)', backgroundSize: '16px 16px' }}
        aria-hidden="true"
      >
        <Stage scene={scene} run={run} />
      </div>

      {/* Caption */}
      <div className="order-1 flex min-w-0 flex-col justify-between gap-5 lg:order-none lg:gap-6">
        <div aria-live="polite">
          <p className="mono text-[11px] text-ink-faint">
            Step {scene + 1} of {SCENES.length}
          </p>
          <motion.div key={scene} initial={reduced ? false : { opacity: 0.001, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={springs.smooth}>
            <p className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.1] font-semibold tracking-[-0.02em]">{current.title}</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-ink-soft">{current.text}</p>
          </motion.div>
        </div>
        <DemoControls scenes={SCENES} scene={scene} setScene={setScene} playing={playing} onToggle={toggle} />
      </div>
    </div>
  )
}
