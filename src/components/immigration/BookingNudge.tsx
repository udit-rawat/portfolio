import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contact } from '../../data'
import { SpringButton } from './SpringButton'
import { springs } from './springs'

const AFTER_MS = 120_000
const KEY = 'booking-nudge-dismissed'

function wasDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/* A small corner card after two minutes on the page. Never blocks the page, shows once per visit. */
export function BookingNudge() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // ?nudge=now shows the card after a second, for previewing and demos.
    const preview = new URLSearchParams(window.location.search).get('nudge') === 'now'
    if (!preview && wasDismissed()) return
    const id = window.setTimeout(() => setShow(true), preview ? 1000 : AFTER_MS)
    return () => window.clearTimeout(id)
  }, [])

  function dismiss() {
    setShow(false)
    try {
      window.sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode: the card just won't remember */
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          aria-label="Book a call"
          className="fixed right-3 bottom-3 left-3 z-40 rounded-[12px] border border-rule bg-card p-4 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.3)] sm:left-auto sm:w-[320px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={springs.gentle}
        >
          <button type="button" onClick={dismiss} aria-label="Close" className="absolute top-1 right-1 grid size-10 place-items-center rounded-full text-[20px] text-ink-faint hover:bg-black/5 hover:text-ink">
            ×
          </button>
          <p className="pr-6 text-[15px] font-semibold tracking-tight">Want this on your files?</p>
          <p className="mt-1 text-[13.5px] text-ink-soft">15 minutes, on your schedule. We'll walk you through it.</p>
          <SpringButton href={contact.booking} onClick={dismiss} size="sm" className="mt-3">
            Book 15 minutes
          </SpringButton>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
