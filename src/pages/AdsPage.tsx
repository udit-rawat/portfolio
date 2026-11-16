import { useEffect } from 'react'
import { contact } from '../data'
import { AdFunnelAnimation } from '../components/ads/AdFunnelAnimation'
import { ExampleMonth } from '../components/ads/ExampleMonth'
import { BookingNudge } from '../components/shared/BookingNudge'
import { SpringButton } from '../components/shared/SpringButton'

export const ADS_TITLE = 'Payback: see which Meta ads actually make money'
export const ADS_DESCRIPTION =
  'We connect your Meta ads, your messages and your Shopify sales or bookings, and every week tell you which ads actually make money.'

const SOLVES = [
  'Every comment and message answered, day or night.',
  'Sales and bookings matched to the ad that started them.',
  'A one-page report every week, with one thing to change.',
]

/* Same four parts as the other demos: the promise, the story, one example, a call. */
export function AdsPage() {
  useEffect(() => {
    document.title = ADS_TITLE
  }, [])

  return (
    <main>
      <section className="ground-wash px-4 pt-32 pb-14 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-[1120px]">
          <p className="mono text-[12px] text-ink-soft">For businesses that run on Facebook and Instagram ads</p>
          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
            See which of your ads actually make money.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
            We connect your Meta ads, your messages and your Shopify sales or bookings, and every week tell you what's working and what to
            change.
          </p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.55] text-ink-soft">
            Meta now replies to messages for free. We show you which replies turn into sales.
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
            <AdFunnelAnimation />
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
          <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">An example month</h2>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.55] text-ink-soft">
            Pick the kind of business closest to yours. Everything below changes with it.
          </p>
          <div className="mt-6">
            <ExampleMonth />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[880px] border-t border-rule pt-12">
          <p className="max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Want this on your ads? Let's talk for 15 minutes.
          </p>
          <SpringButton href={contact.booking} className="mt-7">
            Book 15 minutes
          </SpringButton>
          <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.55] text-ink-soft">
            Runs on Meta's official tools and follows their rules: one reply per comment, follow-ups only within 24 hours, and a person can
            take over any conversation. Works with Shopify, or with your booking calendar if you sell a service.
          </p>
        </div>
      </section>

      <BookingNudge title="Want this on your ads?" />
    </main>
  )
}
