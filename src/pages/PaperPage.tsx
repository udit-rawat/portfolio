import { useEffect } from 'react'
import { contact } from '../data'
import { PaperAnimation } from '../components/paper/PaperAnimation'
import { LoadsList } from '../components/paper/LoadsList'
import { PaperReport } from '../components/paper/PaperReport'
import { carrier } from '../components/paper/data'
import { BookingNudge } from '../components/shared/BookingNudge'
import { SpringButton } from '../components/shared/SpringButton'

export const PAPER_TITLE = 'Paper2Paid: invoice the same day the job is done'
export const PAPER_DESCRIPTION =
  'Your drivers or crew send a photo of the signed paperwork. We read it, check it against the job, catch problems on the spot, and get the invoice out the same day.'

const SOLVES = [
  'No more paperwork lost in the truck.',
  'Missing signatures caught before the driver leaves.',
  'Invoices out the same day, not next week.',
]

/* Same four parts as the other demos: the promise, the story, one example, a call. */
export function PaperPage() {
  useEffect(() => {
    document.title = PAPER_TITLE
  }, [])

  return (
    <main>
      <section className="ground-wash px-4 pt-32 pb-14 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="mono text-[12px] text-ink-soft">For businesses that can't bill until the paperwork comes back</p>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
            Invoice the same day the job is done.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
            Your drivers or crew send a photo of the signed paperwork. We read it, check it against the job, catch problems on the spot, and
            get the invoice out the same day.
          </p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.55] text-ink-soft">
            Built for small fleets first, and works the same for contractors, installers and wholesalers.
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
            <PaperAnimation />
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
            {carrier.name} (made up), {carrier.trucks} trucks in {carrier.place} · 14 loads delivered · Nov 10 to 16
          </p>

          <h3 className="mt-10 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">Four loads from that week</h3>
          <p className="mt-2 text-[15px] text-ink-soft">Tap one to see the paperwork and what happened.</p>
          <div className="mt-5">
            <LoadsList />
          </div>

          <h3 className="mt-14 text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em]">The report that lands every Monday</h3>
          <p className="mt-2 text-[15px] text-ink-soft">Where your money is stuck, and one thing to change.</p>
          <div className="mt-5">
            <PaperReport />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[880px] border-t border-rule pt-12">
          <p className="max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Want this on your paperwork? Let's talk for 15 minutes.
          </p>
          <SpringButton href={contact.booking} className="mt-7">
            Book 15 minutes
          </SpringButton>
          <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.55] text-ink-soft">
            Works with the WhatsApp or text your team already uses, and with QuickBooks or your factoring company. Nothing is sent to a
            customer without your OK, and anything that could become a claim goes to a person.
          </p>
        </div>
      </section>

      <BookingNudge title="Want this on your paperwork?" />
    </main>
  )
}
