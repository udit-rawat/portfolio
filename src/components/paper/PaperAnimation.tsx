import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, animate, motion, useInView, useReducedMotion } from 'motion/react'
import { load } from './data'
import { springs } from '../shared/springs'

/*
  A 30-second story of one delivery turning into an invoice, told with
  physical motion rather than fades: the photo flies out of the driver's phone
  and straightens like a scan, a bracket reads each field while the value types
  out, the checks settle on a split-flap board, the signature draws itself and
  a stamp lands, and the invoice prints out of a slot. Plays only on screen.
*/

const SCENES = [
  { title: 'The driver sends a photo', text: 'Right after the delivery, a photo of the signed paperwork goes over WhatsApp.', ms: 3800 },
  { title: 'Every field is read', text: 'Load number, receiver, pallets, time and signature, pulled straight off the photo.', ms: 6000 },
  { title: 'It is checked against the load', text: 'Compared with the rate confirmation and the bill of lading before anything is billed.', ms: 5400 },
  { title: 'A problem is caught at the dock', text: 'No receiver signature. The driver is asked to get it signed before leaving the dock.', ms: 4600 },
  { title: 'The signed copy comes back', text: 'Twenty minutes later, everything matches.', ms: 5200 },
  { title: 'Invoice out the same day', text: 'Printed with the paperwork attached, sent to the customer or your factoring company after your OK.', ms: 7000 },
]

const total = load.rate + load.fuel
const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/* The fields read off the photo, in reading order. Row heights match the sheet. */
const ROW = 27
const SIG_ROW = 54
const FIELDS = [
  { label: 'Load', value: load.number },
  { label: 'Shipper', value: load.shipper },
  { label: 'Receiver', value: load.consignee },
  { label: 'Pallets', value: '22' },
  { label: 'Delivered', value: load.delivered },
]

/* ---------- small motion pieces ---------- */

const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/* A split-flap display, the kind on station departure boards: characters spin, then settle left to right. */
function Flap({ text, tone = 'plain', delay = 0, run = true }: { text: string; tone?: 'plain' | 'ok' | 'bad'; delay?: number; run?: boolean }) {
  const [spun, setShown] = useState(text)
  const shown = run ? spun : text
  useEffect(() => {
    if (!run) return
    let frame = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        frame++
        const next = text
          .split('')
          .map((ch, i) => (ch === ' ' || frame > 5 + i * 2 ? ch : FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]))
          .join('')
        setShown(next)
        if (frame > 5 + text.length * 2) window.clearInterval(interval)
      }, 42)
    }, delay * 1000)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [text, delay, run])

  const color = tone === 'ok' ? 'text-[#7ee2a4]' : tone === 'bad' ? 'text-[#ff9b8a]' : 'text-[#f3efe6]'
  return (
    <span className="inline-flex gap-[2px]" aria-label={text}>
      {shown.split('').map((ch, i) => (
        <span
          key={i}
          className={`relative grid h-[1.55em] w-[1.05em] place-items-center overflow-hidden rounded-[2px] bg-[#1d1d1b] font-mono text-[1em] leading-none font-bold ${color}`}
          aria-hidden="true"
        >
          <motion.span key={ch} initial={run ? { rotateX: -80, opacity: 0.4 } : false} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.07 }}>
            {ch === ' ' ? ' ' : ch}
          </motion.span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/60" />
        </span>
      ))}
    </span>
  )
}

/* Types a value out, a character at a time. */
function Typed({ text, run }: { text: string; run: boolean }) {
  const [typed, setN] = useState(0)
  const n = run ? typed : text.length
  useEffect(() => {
    if (!run) return
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 28)
    return () => window.clearInterval(id)
  }, [text, run])
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-current" />}
    </>
  )
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [counted, setV] = useState(0)
  const v = run ? counted : to
  useEffect(() => {
    if (!run) return
    const c = animate(0, to, { duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [to, run])
  return <>{money(Math.round(v))}</>
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 rounded-[10px] rounded-br-[3px] bg-[#d9fdd3] px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-[#4b6b47]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </span>
  )
}

/* ---------- the paper ---------- */

function Signature({ instant }: { instant: boolean }) {
  return (
    <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <motion.path
        d="M8 30c12-20 18-22 20-11s-8 14 3 3 16-19 19-8-6 16 8 5 13-13 18-5 11 8 24-3 18-8 27-3 14 6 24-2"
        fill="none"
        stroke="#1d3a6b"
        strokeWidth="2.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={instant ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: instant ? 0 : 1.1, ease: 'easeInOut', delay: instant ? 0 : 0.9 }}
      />
    </svg>
  )
}

function PodSheet({ signed, small = false, instant = false }: { signed: boolean; small?: boolean; instant?: boolean }) {
  const k = small ? 2.6 : 1
  return (
    <div className={`relative overflow-hidden rounded-[3px] bg-[#f7f2e6] text-[#222] ${small ? 'p-1.5 text-[6px]' : 'p-3 text-[11.5px]'}`}>
      <p className={`border-b border-black/20 font-bold tracking-[0.14em] text-black/60 ${small ? 'pb-0.5 text-[5px]' : 'h-[22px] pb-1.5 text-[9px]'}`}>
        PROOF OF DELIVERY
      </p>
      <div className={small ? 'mt-1' : 'mt-2'}>
        {FIELDS.map((f) => (
          <div key={f.label} className="flex items-center justify-between gap-2" style={{ height: ROW / k }}>
            <span className={`tracking-wide text-black/45 uppercase ${small ? 'text-[4.5px]' : 'text-[8.5px]'}`}>{f.label}</span>
            <span className="truncate font-semibold">{f.value}</span>
          </div>
        ))}
        <div style={{ height: SIG_ROW / k }} className="flex flex-col justify-end">
          <span className={`tracking-wide text-black/45 uppercase ${small ? 'text-[4.5px]' : 'text-[8.5px]'}`}>Receiver signature</span>
          <span className={`relative mt-0.5 block flex-1 border-b border-black/25 ${signed ? '' : 'bg-[#fbe3de]/70'}`}>{signed && <Signature instant={instant} />}</span>
        </div>
      </div>
      {/* the look of a phone photo of paper */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_35%_25%,transparent_50%,rgb(60_40_10/0.16))]" />
    </div>
  )
}

/* ---------- scenes on the desk ---------- */

function useSteps(count: number, run: boolean, start = 1300, every = 720) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (!run) return
    const ids = [-1, ...Array(count + 1).keys()].map((i) => window.setTimeout(() => setStep(i), i < 0 ? 0 : start + i * every))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [count, run, start, every])
  return run ? step : count
}

function ReadPanel({ step, run }: { step: number; run: boolean }) {
  return (
    <div className="min-w-0">
      <p className="mono mb-2 text-[10.5px] tracking-wide text-ink-faint uppercase">Read from the photo</p>
      <ul className="space-y-1 font-mono text-[12px]">
        {FIELDS.map((f, i) => (
          <li key={f.label} className={`flex gap-2 border-b border-dashed border-black/15 pb-1 transition-opacity ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
            <span className="w-[74px] shrink-0 text-ink-faint">{f.label.toLowerCase()}</span>
            <span className="min-w-0 truncate font-semibold text-ink">{i <= step ? <Typed key={f.value} text={f.value} run={run && i === step} /> : '·'}</span>
          </li>
        ))}
        <li className={`flex gap-2 pb-1 transition-opacity ${step >= FIELDS.length ? 'opacity-100' : 'opacity-30'}`}>
          <span className="w-[74px] shrink-0 text-ink-faint">signature</span>
          <span className="font-semibold text-[#b42318]">{step >= FIELDS.length ? <Typed text="none found" run={run} /> : '·'}</span>
        </li>
      </ul>
    </div>
  )
}

/* The reading bracket that walks down the sheet, field by field. */
function Bracket({ step }: { step: number }) {
  if (step < 0 || step > FIELDS.length) return null
  const sig = step === FIELDS.length
  const top = 12 + 22 + 8 + step * ROW // padding + title + gap
  const corner = `absolute size-2.5 ${sig ? 'border-[#d1432d]' : 'border-[#2b4fd6]'}`
  return (
    <motion.span
      className={`pointer-events-none absolute right-1.5 left-1.5 rounded-[3px] ${sig ? 'bg-[#d1432d]/10' : 'bg-[#2b4fd6]/[0.08]'}`}
      initial={{ top: 12 + 22 + 8, height: ROW, opacity: 0 }}
      animate={{ top, height: sig ? SIG_ROW : ROW, opacity: 1 }}
      transition={springs.snappy}
    >
      <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} right-0 bottom-0 border-r-2 border-b-2`} />
    </motion.span>
  )
}

function CheckBoard({ scene, run }: { scene: number; run: boolean }) {
  const signed = scene >= 4
  const rows = [
    { label: 'Load no.', photo: load.number, file: load.number, status: 'OK' },
    { label: 'Receiver', photo: 'Northbay', file: 'Northbay', status: 'OK' },
    { label: 'Pallets', photo: '22', file: '22', status: 'OK' },
    { label: 'Signature', photo: signed ? 'M. Ortiz' : 'none', file: 'required', status: signed ? 'OK' : 'NO SIG' },
  ]
  return (
    <div className="min-w-0">
      <p className="mono mb-2 text-[10.5px] tracking-wide text-ink-faint uppercase">Photo vs. the load file</p>
      <div className="rounded-[6px] bg-[#2a2a27] p-2.5 text-[10.5px] text-[#d8d3c7] shadow-[0_10px_20px_-12px_rgb(0_0_0/0.6)] sm:text-[11px]">
        {rows.map((r, i) => {
          const bad = r.status !== 'OK'
          const flips = scene === 2 || (scene === 4 && r.label === 'Signature')
          return (
            <motion.div
              key={r.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-white/10 px-1 py-1.5 last:border-0 sm:grid-cols-[62px_minmax(0,1fr)_auto]"
              animate={bad && scene === 3 && run ? { backgroundColor: ['rgba(209,67,45,0)', 'rgba(209,67,45,0.3)', 'rgba(209,67,45,0)'] } : { backgroundColor: 'rgba(209,67,45,0)' }}
              transition={bad && scene === 3 ? { duration: 1.1, repeat: Infinity } : { duration: 0.3 }}
            >
              <span className="font-mono text-white/55">{r.label}</span>
              <span className="hidden min-w-0 truncate font-mono sm:block">
                {r.photo}
              </span>
              <span className="text-[9.5px] sm:text-[10px]">
                <Flap text={r.status.padEnd(6, ' ')} tone={bad ? 'bad' : 'ok'} delay={scene === 2 ? 0.3 + i * 0.5 : 2.2} run={run && flips} />
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function Printer({ run }: { run: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative z-10 h-3.5 rounded-full bg-[#1d1d1b] shadow-[0_3px_0_rgb(0_0_0/0.18)]" />
      <div className="-mt-2 overflow-hidden px-3">
        <motion.div
          className="rounded-b-[4px] bg-white px-4 pt-5 pb-3 shadow-[0_10px_20px_-12px_rgb(0_0_0/0.4)]"
          initial={run ? { y: '-102%' } : false}
          animate={{ y: '0%' }}
          transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[14px] font-semibold">Invoice INV-1088</p>
            <p className="mono text-[10.5px] text-ink-faint">Nov 12</p>
          </div>
          <p className="mt-0.5 text-[12px] text-ink-soft">
            {load.consignee} · Load {load.number}
          </p>
          <p className="text-[12px] text-ink-soft">{load.lane}</p>
          <dl className="mt-3 space-y-1 border-t border-dashed border-black/20 pt-2 font-mono text-[12px]">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Line haul</dt>
              <dd>{money(load.rate)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Fuel surcharge</dt>
              <dd>{money(load.fuel)}</dd>
            </div>
            <div className="flex justify-between border-t border-black/15 pt-1 text-[13.5px] font-bold">
              <dt>Total</dt>
              <dd>
                <CountUp to={total} run={run} />
              </dd>
            </div>
          </dl>
          <p className="mono mt-2 text-[10px] text-ink-faint">+ proof of delivery (signed), bill of lading</p>
        </motion.div>
      </div>
      <div className="mt-5 space-y-1.5 px-3 text-[10px] sm:text-[11px]">
        <div className="flex items-center justify-between gap-3">
          <span className="mono text-[11px] text-ink-soft">Delivered</span>
          <Flap text=" 1:05 PM" delay={2.7} run={run} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="mono text-[11px] text-ink-soft">Invoice sent</span>
          <Flap text=" 4:12 PM" tone="ok" delay={3.2} run={run} />
        </div>
      </div>
    </div>
  )
}

/* ---------- the phone ---------- */

function Phone({ scene, run }: { scene: number; run: boolean }) {
  const enter = run ? { opacity: 0, y: 10, scale: 0.94 } : false
  const flash = run && (scene === 0 || scene === 4)
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-[30px] bg-[#1d1d1b] p-[7px] shadow-[0_18px_30px_-18px_rgb(0_0_0/0.6)]">
      <div className="relative flex h-[290px] flex-col overflow-hidden rounded-[24px] bg-[#e7e1d6] sm:h-[372px]">
        <div className="flex items-center gap-2 bg-[#25433a] px-3 pt-4 pb-2 text-white">
          <span className="grid size-6 place-items-center rounded-full bg-white/20 text-[10px] font-bold">{load.driver[0]}</span>
          <span className="text-[12px] leading-tight font-semibold">
            {load.driver}
            <span className="block text-[9.5px] font-normal opacity-70">Truck 3</span>
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden p-2.5">
          <motion.div layout="position" initial={enter} animate={{ opacity: 1, y: 0, scale: 1 }} transition={springs.smooth} className="w-[80%]">
            <p className="w-fit rounded-[10px] rounded-bl-[3px] bg-white px-2.5 py-1 text-[11.5px]">Delivered {load.number} ✅</p>
            <div className="mt-1 rounded-[8px] bg-white p-1">
              {scene === 0 ? (
                <motion.div layoutId="pod-photo" transition={springs.gentle}>
                  <PodSheet signed={false} small />
                </motion.div>
              ) : (
                <PodSheet signed={false} small />
              )}
            </div>
          </motion.div>
          <AnimatePresence initial={false} mode="popLayout">
            {scene === 3 && run && (
              <motion.div
                key="dots"
                layout="position"
                className="ml-auto"
                initial={enter}
                animate={{ opacity: [1, 1, 0], y: 0, scale: 1 }}
                transition={{ opacity: { duration: 1.1, times: [0, 0.9, 1] }, default: springs.smooth }}
              >
                <TypingDots />
              </motion.div>
            )}
            {scene >= 3 && (
              <motion.p
                key="ask"
                layout="position"
                className="ml-auto w-fit max-w-[90%] rounded-[10px] rounded-br-[3px] bg-[#d9fdd3] px-2.5 py-1.5 text-[11px] leading-snug"
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ...springs.smooth, delay: run && scene === 3 ? 1.1 : 0 }}
              >
                Hi {load.driver}, load {load.number} has no receiver signature. Can you get it signed before you leave the dock?
              </motion.p>
            )}
            {scene >= 4 && (
              <motion.p
                key="reply"
                layout="position"
                className="w-fit rounded-[10px] rounded-bl-[3px] bg-white px-2.5 py-1 text-[11.5px]"
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ...springs.smooth, delay: run ? 0.35 : 0 }}
              >
                signed copy 📎
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {/* camera flash when a photo is taken */}
        {flash && (
          <motion.span
            key={`flash-${scene}`}
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            transition={{ duration: 0.5, times: [0, 0.15, 1], delay: scene === 4 ? 0.2 : 0.05 }}
          />
        )}
      </div>
    </div>
  )
}

/* ---------- the stage ---------- */

function Desk({ scene, run }: { scene: number; run: boolean }) {
  const step = useSteps(FIELDS.length, run && scene === 1)
  if (scene === 0) return <p className="mono hidden h-full place-content-center text-center text-[11px] text-ink-faint sm:grid">waiting for paperwork…</p>
  if (scene === 5) return <Printer run={run} />
  return (
    <div className={`grid gap-5 sm:items-start ${scene === 1 ? 'sm:grid-cols-[minmax(0,230px)_minmax(0,1fr)]' : 'sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)]'}`}>
      {/* The photo, flown in from the phone, straightens like a scan */}
      <motion.div
        layoutId="pod-photo"
        className="relative mx-auto w-full max-w-[240px] shadow-[0_14px_28px_-14px_rgb(0_0_0/0.45)]"
        initial={false}
        animate={{
          rotate: scene === 1 && run ? [-8, -8, 0] : 0,
          filter: scene === 1 && run ? ['brightness(0.8)', 'brightness(0.8)', 'brightness(1)'] : 'brightness(1)',
          y: scene === 4 && run ? [0, 4, 0] : 0,
        }}
        transition={{
          layout: springs.gentle,
          rotate: { duration: 1.1, times: [0, 0.55, 1], ease: 'easeOut' },
          filter: { duration: 1.1, times: [0, 0.55, 1] },
          y: { duration: 0.22, delay: 2.3 },
        }}
      >
        <PodSheet signed={scene >= 4} instant={!run} />
        {scene === 1 && <Bracket step={step} />}
        {scene >= 4 && (
          <motion.span
            className="pointer-events-none absolute right-2.5 bottom-4 rounded-[4px] border-[3px] border-[#2f7d4f] px-2 py-1 text-[15px] font-black tracking-[0.1em] text-[#2f7d4f] mix-blend-multiply"
            initial={run ? { scale: 2.6, opacity: 0, rotate: -26 } : false}
            animate={{ scale: 1, opacity: 0.9, rotate: -11 }}
            transition={{ type: 'spring', stiffness: 560, damping: 19, delay: run ? 2.2 : 0 }}
          >
            MATCHED
          </motion.span>
        )}
      </motion.div>
      {scene === 1 ? <ReadPanel step={step} run={run} /> : <CheckBoard scene={scene} run={run} />}
    </div>
  )
}

export function PaperAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion() ?? false
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)
  const playing = inView && !paused && !reduced
  const run = !reduced

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setScene((s) => (s + 1) % SCENES.length), SCENES[scene].ms)
    return () => window.clearTimeout(id)
  }, [playing, scene])

  const current = SCENES[scene]

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      <div
        className="relative order-2 min-w-0 overflow-hidden rounded-[10px] border border-rule p-4 sm:p-6 lg:order-none"
        style={{
          backgroundColor: '#e9e6dc',
          backgroundImage: 'linear-gradient(rgb(0 0 0 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(0 0 0 / 0.045) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      >
        <LayoutGroup>
          <div className="grid gap-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-7">
            <Phone scene={scene} run={run} />
            <div className="relative min-w-0 sm:min-h-[388px]">
              <Desk key={scene === 5 ? 'print' : 'desk'} scene={scene} run={run} />
            </div>
          </div>
        </LayoutGroup>
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
          <button type="button" onClick={() => setPaused((p) => !p)} className="ml-2 min-h-9 rounded-full border border-rule px-3.5 text-[13px] text-ink-soft hover:text-ink">
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}
