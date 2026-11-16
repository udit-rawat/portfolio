import { useEffect } from 'react'
import { contact } from '../data'
import { FileCheckAnimation } from '../components/immigration/FileCheckAnimation'
import { ExampleFile } from '../components/immigration/ExampleFile'
import { BookingNudge } from '../components/shared/BookingNudge'
import { SpringButton } from '../components/shared/SpringButton'

export const IMMIGRATION_TITLE = 'Clean File: file review for immigration consultants'
export const IMMIGRATION_DESCRIPTION =
  "We check every name, date and number across your client's documents, so a mismatch is caught before the file goes to IRCC."

const SOLVES = [
  'Fewer files sent back or questioned over a mismatch.',
  'Less time chasing clients for the right documents.',
  'A record showing nothing in the file was changed.',
]

/* Four parts and nothing to learn: the promise, how it works, one example, a call. */
export function ImmigrationPage() {
  useEffect(() => {
    document.title = IMMIGRATION_TITLE
  }, [])

  return (
    <main>
      {/* 1. The promise */}
      <section className="ground-wash px-4 pt-32 pb-14 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="mono text-[12px] text-ink-soft">For licensed immigration consultants in the GTA</p>
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
            Catch the mistake in a file before the visa officer does.
          </h1>
          <p className="mt-6 max-w-[54ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
            We check every name, date and number across your client's documents, so a mismatch is caught before the file goes in.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SpringButton href={contact.booking}>Book 15 minutes</SpringButton>
            <a href="#example" className="text-[15px] font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              See an example file
            </a>
          </div>
        </div>
      </section>

      {/* 2. How it works, as a short story */}
      <section id="how" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">How it works, in 30 seconds</h2>
          <div className="mt-8">
            <FileCheckAnimation />
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-3 border-t border-rule pt-6 sm:grid-cols-3">
            {SOLVES.map((s) => (
              <li key={s} className="flex gap-2.5 text-[15.5px] leading-[1.5]">
                <span className="mt-[3px] text-[#2f7d4f]" aria-hidden="true">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. One example, already checked */}
      <section id="example" className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[880px]">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">An example file, already checked</h2>
          <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.55] text-ink-soft">Tap any finding to see the documents side by side.</p>
          <div className="mt-8">
            <ExampleFile />
          </div>
        </div>
      </section>

      {/* 4. The call */}
      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[880px] border-t border-rule pt-12">
          <p className="max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Want this on your files? Let's talk for 15 minutes.
          </p>
          <SpringButton href={contact.booking} className="mt-7">
            Book 15 minutes
          </SpringButton>
          <p className="mt-5 max-w-[60ch] text-[14px] leading-[1.55] text-ink-soft">
            Your licensed consultant decides everything. We never give immigration advice or submit anything.
          </p>
        </div>
      </section>

      <BookingNudge />
    </main>
  )
}
