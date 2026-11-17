import { contact } from '../data'
import { DemoReel } from './DemoReel'
import { SpringButton } from './shared/SpringButton'

/* Hero: what we do for a business owner, the demos as proof, and one way to start. */
export function Hero() {
  return (
    <section className="ground-wash px-4 pt-28 pb-12 sm:px-8 sm:pt-36">
      <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
        <div className="min-w-0">
          <p className="mono flex flex-wrap items-center gap-x-4 gap-y-1 border-l border-dotted border-ink-faint pl-3 text-[11.5px] leading-[1.6] text-ink-soft">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-[#2f9e5b]" aria-hidden="true" />
              taking new clients for December
            </span>
          </p>
          <h1 className="mt-8 max-w-[16ch] text-[clamp(2.5rem,6.8vw,5.2rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance sm:mt-10">
            We connect your tools and take the busywork off your team.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.55] text-ink-soft">
            We connect the tools you already use, like Meta, Shopify, WhatsApp, QuickBooks and your documents, automate the repetitive work,
            and send you a one-page report every week on what's working.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SpringButton href={contact.booking}>Book 15 minutes</SpringButton>
            <a href="#work" className="text-[15px] font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              See the demos
            </a>
          </div>
        </div>
        <DemoReel />
      </div>

    </section>
  )
}
