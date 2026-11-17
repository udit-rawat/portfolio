import { brand, contact } from '../data'
import { useClock } from './useClock'

/* generaladmission.house's giant sign-off block, plus sebneil's corner details. */
function Clock({ city, tz }: { city: string; tz: string }) {
  const time = useClock(tz)
  return (
    <span className="mono">
      {time} {city}
    </span>
  )
}

export function Footer() {
  return (
    <footer className="overflow-hidden px-4 pt-24 pb-6 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p aria-label={`${brand.name}, ${brand.line}, ${brand.cities.map((c) => c.city).join(' and ')}`} className="display-wide text-[clamp(2.6rem,10.4vw,10rem)]">
          <span className="block">{brand.name}</span>
          <span className="block">&amp; team</span>
          <span className="block text-ink-faint">{brand.cities.map((c) => c.city).join(' + ')}</span>
        </p>
        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-5 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {brand.cities.map((c) => (
              <Clock key={c.city} city={c.city} tz={c.tz} />
            ))}
            <span>© 2026 {brand.team}</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a className="hover:text-ink" href="/lab">Lab</a></li>
            <li><a className="hover:text-ink" href={`mailto:${contact.email}`}>Email</a></li>
            <li><a className="hover:text-ink" href={contact.booking}>Book a call</a></li>
                      </ul>
        </div>
      </div>
    </footer>
  )
}
