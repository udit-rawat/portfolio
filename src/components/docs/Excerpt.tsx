import { motion } from 'motion/react'
import type { Source } from './data'

/*
  A torn-out piece of a document page: the document's name and page, a little
  context, and the one sentence that answers, which a highlighter can sweep across.
  The highlight is an inline background that grows left to right, so it follows
  the sentence across line breaks like a real marker.
*/

const HI = 'linear-gradient(transparent 12%, rgb(255 222 77 / 0.85) 12%, rgb(255 222 77 / 0.85) 88%, transparent 88%)'

type Props = {
  source: Source
  sweep?: boolean
  delay?: number
  instant?: boolean
  badge?: React.ReactNode
  className?: string
  tone?: 'plain' | 'old'
}

export function Excerpt({ source, sweep = false, delay = 0, instant = false, badge, className = '', tone = 'plain' }: Props) {
  return (
    <div className={`relative rounded-[3px] bg-[#fdfbf6] px-3 pt-2.5 pb-3 text-[12px] leading-[1.5] text-[#2a2a2a] shadow-[0_1px_0_rgb(0_0_0/0.06),0_10px_20px_-14px_rgb(0_0_0/0.45)] ${className}`}>
      <div className="flex items-baseline justify-between gap-2 border-b border-black/10 pb-1">
        <p className={`truncate text-[10px] font-semibold tracking-wide uppercase ${tone === 'old' ? 'text-black/40 line-through decoration-[#d1432d]/60' : 'text-black/55'}`}>{source.doc}</p>
        <p className="mono shrink-0 text-[9.5px] text-black/40">{source.page}</p>
      </div>
      <p className="mt-1.5">
        <span className="text-black/45">{source.before} </span>
        <motion.span
          className="rounded-[2px] bg-no-repeat font-medium"
          style={{ backgroundImage: HI }}
          initial={instant ? false : { backgroundSize: '0% 100%' }}
          animate={{ backgroundSize: sweep || instant ? '100% 100%' : '0% 100%' }}
          transition={{ duration: instant ? 0 : 0.9, ease: [0.6, 0, 0.4, 1], delay: instant ? 0 : delay }}
        >
          {source.quote}
        </motion.span>
        <span className="text-black/45"> {source.after}</span>
      </p>
      {badge}
    </div>
  )
}
