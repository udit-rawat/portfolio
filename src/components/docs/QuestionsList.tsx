import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Excerpt } from './Excerpt'
import { WEEK, type Outcome } from './data'
import { leadEase, springs } from '../shared/springs'

/* Four questions from the example week, one per outcome. Tap one to see the answer and the pages behind it. */

const STYLE: Record<Outcome, { bar: string; tag: string; label: string }> = {
  answered: { bar: 'bg-[#3b2f63]', tag: 'text-[#3b2f63] bg-[#ebe8f1]', label: 'Answered, with sources' },
  gap: { bar: 'bg-[#b7791f]', tag: 'text-[#8a5a12] bg-[#fbf1df]', label: 'Not written down yet' },
  conflict: { bar: 'bg-[#c4321f]', tag: 'text-[#b42318] bg-[#fbecea]', label: 'Documents disagree' },
}

export function QuestionsList() {
  const [open, setOpen] = useState<string | null>(WEEK[0].id)
  return (
    <div className="divide-y divide-rule overflow-hidden rounded-[10px] border border-rule bg-card">
      {WEEK.map((q) => {
        const isOpen = open === q.id
        return (
          <div key={q.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`q-${q.id}`}
              onClick={() => setOpen(isOpen ? null : q.id)}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:px-5"
            >
              <span className={`h-9 w-1.5 shrink-0 rounded-full ${STYLE[q.outcome].bar}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold tracking-tight">“{q.question}”</span>
                <span className="block text-[13.5px] text-ink-soft">{q.who}</span>
              </span>
              <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium sm:inline ${STYLE[q.outcome].tag}`}>{STYLE[q.outcome].label}</span>
              <motion.span className="shrink-0 text-ink-faint" animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`q-${q.id}`}
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
                    <p className="text-[15px] leading-[1.55]">
                      <span className="font-semibold">Answer: </span>
                      {q.answer}
                    </p>
                    {q.sources.length > 0 && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {q.sources.map((s, i) => (
                          <Excerpt key={s.n} source={s} sweep delay={0.25 + i * 0.5} tone={s.doc.includes('(old)') ? 'old' : 'plain'} />
                        ))}
                      </div>
                    )}
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
