import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, contact } from '../data'

const links = [
  { label: 'Demos', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#journey' },
  { label: 'Team', href: '/#team' },
]

const pill =
  'rounded-2xl bg-card/90 shadow-[0_1px_0_rgb(0_0_0/0.04),0_6px_24px_rgb(0_0_0/0.06)] ring-1 ring-black/5 backdrop-blur-md'

/* Floating pill nav, after butter.video. On phones the links fold into a menu. */
export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <nav aria-label="Main" className="pointer-events-auto relative flex w-full max-w-[1120px] items-center justify-between gap-2">
        <div className={`flex items-center gap-1 p-1.5 pr-2 ${pill}`}>
          <Link to="/" className="rounded-xl px-3 py-1.5 text-[15px] font-semibold tracking-tight">
            {brand.name}
          </Link>
          <ul className="hidden items-center sm:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="rounded-xl px-3 py-1.5 text-[14px] text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-xl px-3 py-1.5 text-[14px] text-ink-soft sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <a
          href={contact.booking}
          className={`hidden rounded-2xl bg-ink px-4 py-2.5 text-[14px] font-medium text-ground shadow-[0_6px_24px_rgb(0_0_0/0.12)] transition-colors hover:bg-black sm:inline-block`}
        >
          Book a call
        </a>

        {open && (
            <ul
              id="mobile-menu"
              className={`menu-in absolute top-[calc(100%+8px)] left-0 w-[min(260px,calc(100vw-24px))] p-1.5 sm:hidden ${pill}`}
            >
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3.5 py-3 text-[16px] active:bg-black/5">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={contact.booking} className="mt-1 block rounded-xl bg-ink px-3.5 py-3 text-[16px] font-medium text-ground">
                  Book a call
                </a>
              </li>
            </ul>
        )}
      </nav>
    </header>
  )
}
