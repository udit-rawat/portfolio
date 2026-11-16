import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MiniDoc, type DocKind } from './MiniDoc'
import { leadEase, springs } from './springs'

/*
  One made-up file, already checked. Nothing to run or learn:
  tap a finding to see the documents side by side and the next step.
  The unfold follows EasyUI's UnfoldAccordion (MIT): the height springs open
  while the content slides up a hair ahead of it, so it reads as one motion.
*/

type Level = 'fix' | 'check'

type Evidence = { kind: DocKind; doc: string; label: string; value: string }

type Finding = {
  id: string
  level: Level
  title: string
  summary: string
  evidence: Evidence[]
  next: string
}

const FINDINGS: Finding[] = [
  {
    id: 'name',
    level: 'fix',
    title: 'Name spelled three ways',
    summary: 'Passport, Aadhaar card and marriage certificate',
    evidence: [
      { kind: 'passport', doc: 'Passport', label: 'Given name', value: 'GURPREET KAUR' },
      { kind: 'idcard', doc: 'Aadhaar card', label: 'Name', value: 'Gurpreet Kaur Sidhu' },
      { kind: 'certificate', doc: 'Marriage certificate', label: 'Bride', value: 'Gurpreet Sidhu' },
    ],
    next: 'Ask the client for a corrected certificate, or a sworn statement that these names are the same person.',
  },
  {
    id: 'met',
    level: 'fix',
    title: 'Different "first met" dates',
    summary: "The sponsor's and the applicant's forms disagree",
    evidence: [
      { kind: 'form', doc: "Sponsor's form", label: 'Date first met', value: 'December 2021' },
      { kind: 'form', doc: "Applicant's form", label: 'Date first met', value: 'March 2022' },
    ],
    next: 'Confirm the right date with both clients and correct the form before submitting.',
  },
  {
    id: 'salary',
    level: 'check',
    title: "Salary doesn't match the bank",
    summary: 'Salary letter and six months of bank statements',
    evidence: [
      { kind: 'letter', doc: 'Salary letter', label: 'Monthly salary', value: '₹42,000' },
      { kind: 'bank', doc: 'Bank statement, Apr to Sep', label: 'Salary credit', value: '₹25,000' },
    ],
    next: 'Ask the client to explain the difference with proof, or for a corrected letter.',
  },
  {
    id: 'registration',
    level: 'check',
    title: 'Marriage not registered with the government',
    summary: 'Only the ceremony record was sent',
    evidence: [
      { kind: 'ceremony', doc: 'Sent', label: 'Ceremony', value: 'Anand Karaj' },
      { kind: 'certificate', doc: 'Missing', label: 'Registration no.', value: 'not found' },
    ],
    next: 'Ask the client for the government marriage registration certificate.',
  },
]

const STYLE: Record<Level, { bar: string; tag: string; label: string }> = {
  fix: { bar: 'bg-[#c4321f]', tag: 'text-[#b42318] bg-[#fbecea]', label: 'Fix before submitting' },
  check: { bar: 'bg-[#b7791f]', tag: 'text-[#8a5a12] bg-[#fbf1df]', label: 'Check with the client' },
}

export function ExampleFile() {
  const [open, setOpen] = useState<string | null>(FINDINGS[0].id)

  return (
    <div>
      <p className="mono text-[12px] text-ink-soft">
        Example file (made up) · sponsor in Brampton, applicant in Ludhiana · 14 documents · 4 things to look at
      </p>

      <div className="mt-4 divide-y divide-rule overflow-hidden rounded-[10px] border border-rule bg-card">
        {FINDINGS.map((f) => {
          const isOpen = open === f.id
          return (
            <div key={f.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`finding-${f.id}`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-black/[0.025] sm:px-5"
              >
                <span className={`h-9 w-1.5 shrink-0 rounded-full ${STYLE[f.level].bar}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold tracking-tight">{f.title}</span>
                  <span className="block text-[13.5px] text-ink-soft">{f.summary}</span>
                </span>
                <span className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-medium sm:inline ${STYLE[f.level].tag}`}>
                  {STYLE[f.level].label}
                </span>
                <motion.span
                  className="shrink-0 text-ink-faint"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={springs.snappy}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`finding-${f.id}`}
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
                      <div className={`grid gap-3 ${f.evidence.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} max-w-[560px]`}>
                        {f.evidence.map((e) => (
                          <div key={e.doc + e.value} className="min-w-0">
                            <MiniDoc
                              kind={e.kind}
                              label={e.label}
                              value={e.value}
                              mark={e.doc === 'Sent' ? 'none' : 'bad'}
                              className={`aspect-[4/3] w-full text-[clamp(8px,1.6vw,11px)] ${e.doc === 'Missing' ? 'opacity-45 grayscale' : ''}`}
                            />
                            <p className="mono mt-1.5 truncate text-[10.5px] text-ink-faint">{e.doc}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-[14.5px] leading-[1.5]">
                        <span className="font-semibold">Next step for you: </span>
                        {f.next}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <span className="h-9 w-1.5 shrink-0 rounded-full bg-[#2f7d4f]" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-semibold tracking-tight">10 other checks passed</span>
            <span className="block text-[13.5px] text-ink-soft">Passport validity, photo pages, signatures, translations, address history and more</span>
          </span>
        </div>
      </div>
    </div>
  )
}
