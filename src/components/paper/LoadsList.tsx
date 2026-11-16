import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FreightDoc } from './FreightDoc'
import { LOADS, type LoadStatus } from './data'
import { leadEase, springs } from '../shared/springs'

/* Four loads from the example week, one per outcome. Tap one to see the paperwork and what happened. */

const STYLE: Record<LoadStatus, { bar: string; tag: string; label: string }> = {
  fixed: { bar: 'bg-[#2f7d4f]', tag: 'text-[#1f6b3f] bg-[#e9f4ec]', label: 'Fixed, invoiced same day' },
  invoiced: { bar: 'bg-[#2f7d4f]', tag: 'text-[#1f6b3f] bg-[#e9f4ec]', label: 'Invoiced' },
  waiting: { bar: 'bg-[#b7791f]', tag: 'text-[#8a5a12] bg-[#fbf1df]', label: 'Waiting on paperwork' },
  held: { bar: 'bg-[#c4321f]', tag: 'text-[#b42318] bg-[#fbecea]', label: 'Held for you' },
}

export function LoadsList() {
  const [open, setOpen] = useState<string | null>(LOADS[0].id)
  return (
    <div className="divide-y divide-rule overflow-hidden rounded-[10px] border border-rule bg-card">
      {LOADS.map((l) => {
        const isOpen = open === l.id
        return (
          <div key={l.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`load-${l.id}`}
              onClick={() => setOpen(isOpen ? null : l.id)}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:px-5"
            >
              <span className={`h-9 w-1.5 shrink-0 rounded-full ${STYLE[l.status].bar}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold tracking-tight">{l.title}</span>
                <span className="block text-[13.5px] text-ink-soft">{l.summary}</span>
              </span>
              <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium sm:inline ${STYLE[l.status].tag}`}>{STYLE[l.status].label}</span>
              <motion.span className="shrink-0 text-ink-faint" animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`load-${l.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={springs.gentle}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.28, ease: leadEase }}
                    className="px-4 pb-5 sm:px-5 sm:pl-[42px]"
                  >
                    <div className="grid max-w-[460px] grid-cols-2 gap-3">
                      {l.docs.map((d) => (
                        <div key={d.caption} className="min-w-0">
                          <FreightDoc kind={d.kind} fields={d.fields} signed={d.signed} dark={d.dark} className="aspect-[4/3] w-full text-[clamp(8px,1.6vw,10.5px)]" />
                          <p className="mono mt-1.5 text-[10.5px] leading-snug text-ink-faint">{d.caption}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[14.5px] leading-[1.5]">
                      <span className="font-semibold">What happened: </span>
                      {l.result}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
