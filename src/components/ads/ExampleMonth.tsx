import { useState } from 'react'
import { motion } from 'motion/react'
import { datasets, type Mode } from './data'
import { FunnelCompare } from './FunnelCompare'
import { WeeklyReport } from './WeeklyReport'
import { Conversations } from './Conversations'
import { springs } from '../shared/springs'

const MODES: Mode[] = ['service', 'store']

/*
  The worked example, with a switch between a service business that books calls
  and an online store whose sales come from Shopify. Everything below follows the switch.
*/
export function ExampleMonth() {
  const [mode, setMode] = useState<Mode>('service')
  const data = datasets[mode]

  return (
    <div>
      <div role="tablist" aria-label="Example business" className="inline-flex rounded-full bg-black/[0.06] p-1">
        {MODES.map((m) => {
          const active = m === mode
          return (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setMode(m)}
              className={`relative min-h-10 rounded-full px-4 text-[14px] font-medium transition-colors ${active ? 'text-ground' : 'text-ink-soft hover:text-ink'}`}
            >
              {active && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-ink" transition={springs.snappy} />}
              <span className="relative">{datasets[m].label}</span>
            </button>
          )
        })}
      </div>

      <p className="mono mt-4 text-[12px] text-ink-soft">
        {data.business.name} (made up), {data.business.kind} in {data.business.place} · two ads · last 30 days
      </p>

      <motion.div key={mode} initial={{ opacity: 0.001, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
        <div className="mt-6">
          <FunnelCompare data={data} />
        </div>

        <h3 className="mt-14 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">The report that lands every Monday</h3>
        <p className="mt-2 text-[15px] text-ink-soft">One page, in plain words, with one thing to change.</p>
        <div className="mt-5">
          <WeeklyReport data={data} />
        </div>

        <h3 className="mt-14 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">Three conversations from that month</h3>
        <p className="mt-2 text-[15px] text-ink-soft">Tap one to read it.</p>
        <div className="mt-5">
          <Conversations key={mode} convos={data.convos} mode={mode} />
        </div>
      </motion.div>
    </div>
  )
}
