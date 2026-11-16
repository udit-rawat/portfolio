import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { leadEase, springs } from '../shared/springs'
import type { Convo, Mode, Outcome } from './data'

/*
  Three example conversations, one per outcome. Tap one to read it.
  The conversations come from the selected example business.
*/

const STYLE: Record<Outcome, { bar: string; tag: string }> = {
  won: { bar: 'bg-[#2f7d4f]', tag: 'text-[#1f6b3f] bg-[#e9f4ec]' },
  answered: { bar: 'bg-[#2b4fd6]', tag: 'text-[#22409f] bg-[#e7ecfb]' },
  person: { bar: 'bg-[#b7791f]', tag: 'text-[#8a5a12] bg-[#fbf1df]' },
  stopped: { bar: 'bg-[#8d8d87]', tag: 'text-ink-soft bg-[#efeee9]' },
}

function labelFor(outcome: Outcome, mode: Mode) {
  if (outcome === 'won') return mode === 'store' ? 'Ordered' : 'Booked'
  if (outcome === 'answered') return 'Answered from Shopify'
  if (outcome === 'person') return 'Handed to you'
  return 'Followed up once'
}

export function Conversations({ convos, mode }: { convos: Convo[]; mode: Mode }) {
  const [open, setOpen] = useState<string | null>(convos[0].id)

  return (
    <div className="divide-y divide-rule overflow-hidden rounded-[10px] border border-rule bg-card">
      {convos.map((c) => {
        const isOpen = open === c.id
        return (
          <div key={c.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`convo-${c.id}`}
              onClick={() => setOpen(isOpen ? null : c.id)}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:px-5"
            >
              <span className={`h-9 w-1.5 shrink-0 rounded-full ${STYLE[c.outcome].bar}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold tracking-tight">{c.title}</span>
                <span className="block text-[13.5px] text-ink-soft">{c.summary}</span>
              </span>
              <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium sm:inline ${STYLE[c.outcome].tag}`}>
                {labelFor(c.outcome, mode)}
              </span>
              <motion.span className="shrink-0 text-ink-faint" animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`convo-${c.id}`}
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
                    <div className="max-w-[520px] space-y-2 rounded-[10px] bg-[#f6f5f1] p-3">
                      {c.messages.map((m) => (
                        <div key={m.text}>
                          {m.note && <p className="mono mb-1 text-center text-[10.5px] text-ink-faint">{m.note}</p>}
                          <p
                            className={`max-w-[85%] rounded-[14px] px-3 py-2 text-[13.5px] leading-snug ${
                              m.from === 'ai' ? 'rounded-bl-[4px] bg-white' : 'ml-auto w-fit rounded-br-[4px] bg-ink text-ground'
                            }`}
                          >
                            {m.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[14.5px] leading-[1.5]">
                      <span className="font-semibold">What happened: </span>
                      {c.result}
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
