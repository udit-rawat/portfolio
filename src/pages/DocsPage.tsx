import { useEffect } from 'react'
import { contact } from '../data'
import { AskAnimation } from '../components/docs/AskAnimation'
import { QuestionsList } from '../components/docs/QuestionsList'
import { DocsReport } from '../components/docs/DocsReport'
import { company } from '../components/docs/data'
import { BookingNudge } from '../components/shared/BookingNudge'
import { SpringButton } from '../components/shared/SpringButton'

export const DOCS_TITLE = 'Doc2Answer: answers from your own documents, with the page they came from'
export const DOCS_DESCRIPTION =
  'Your team asks in plain words. The answer comes from your manuals, policies and price lists, with the exact page it came from, and anything not written down gets flagged.'

const SOLVES = [
  'Answers in seconds, with the page they came from.',
  'Never guesses: no source, no answer.',
  'Shows which documents are missing or out of date.',
]

/* Same four parts as the other demos: the promise, the story, one example, a call. */
export function DocsPage() {
  useEffect(() => {
    document.title = DOCS_TITLE
  }, [])

  return (
    <main>
      <section className="ground-wash px-4 pt-32 pb-14 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="mono text-[12px] text-ink-soft">For teams that keep asking the office the same questions</p>
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
            Every answer your team needs, from your own documents.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
            Your team asks in plain words, from the office or a job site. The answer comes from your manuals, policies and price lists, with the
            exact page it came from.
          </p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.55] text-ink-soft">
            When the answer isn't written down, it says so, and tells you what to write down once.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SpringButton href={contact.booking}>Book 15 minutes</SpringButton>
            <a href="#example" className="text-[15px] font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              See an example
            </a>
          </div>
        </div>
      </section>

      <section id="how" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">How it works, in 30 seconds</h2>
          <div className="mt-8">
            <AskAnimation />
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-3 border-t border-rule pt-6 sm:grid-cols-3">
            {SOLVES.map((s) => (
              <li key={s} className="flex gap-2.5 text-[15.5px] leading-[1.5]">
                <span className="mt-[3px] text-[#2f7d4f]" aria-hidden="true">
                  ✓
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="example" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[880px]">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">An example week</h2>
          <p className="mono mt-4 text-[12px] text-ink-soft">
            {company.name} (made up), {company.kind} in {company.place} · {company.staff} staff · {company.docs} documents · Nov 10 to 16
          </p>

          <h3 className="mt-10 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">Four questions from that week</h3>
          <p className="mt-2 text-[15px] text-ink-soft">Tap one to see the answer and the pages behind it.</p>
          <div className="mt-5">
            <QuestionsList />
          </div>

          <h3 className="mt-14 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">The report that lands every Monday</h3>
          <p className="mt-2 text-[15px] text-ink-soft">What your team asked, what's missing, and one thing to write down.</p>
          <div className="mt-5">
            <DocsReport />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[880px] border-t border-rule pt-12">
          <p className="max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Want this on your documents? Let's talk for 15 minutes.
          </p>
          <SpringButton href={contact.booking} className="mt-7">
            Book 15 minutes
          </SpringButton>
          <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.55] text-ink-soft">
            Works with Google Drive, SharePoint, Dropbox or a folder of PDFs, and answers in Slack, Teams, WhatsApp or the browser. Your
            documents stay private to your company, and people only get answers from files they're allowed to open.
          </p>
        </div>
      </section>

      <BookingNudge title="Want this on your documents?" />
    </main>
  )
}
