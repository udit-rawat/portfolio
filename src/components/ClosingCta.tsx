import { contact } from '../data'
import { SpringButton } from './shared/SpringButton'

/* The last thing on the homepage: one clear way to start. */
export function ClosingCta() {
  return (
    <section aria-labelledby="cta-h" className="px-4 pt-8 pb-8 sm:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col items-start gap-6 rounded-[18px] bg-ink px-6 py-12 text-ground sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-14">
        <div>
          <h2 id="cta-h" className="max-w-[20ch] text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Tell us what's eating your team's time.
          </h2>
          <p className="mt-3 max-w-[48ch] text-[15.5px] leading-[1.55] text-white/65">
            15 minutes, on your schedule. You'll leave with an idea of what could be automated, whether or not we work together.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <SpringButton href={contact.booking} tone="light">
            Book 15 minutes
          </SpringButton>
          <a href={`mailto:${contact.email}`} className="mono text-[12px] text-white/55 hover:text-white">
            or email {contact.email}
          </a>
        </div>
      </div>
    </section>
  )
}
