import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { costPerResult, datasets, returnPerDollar, type Dataset } from './data'
import { springs } from '../shared/springs'

/*
  Two ads side by side, each narrowed from messages to clients or orders.
  Each ad's bars are scaled to its own messages, so the funnel's shape (how much
  survives each step) reads at a glance; the counts carry the volume.
*/
export function FunnelCompare({ data = datasets.service, compact = false }: { data?: Dataset; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const { ads, result } = data
  const best = ads.reduce((a, b) => (costPerResult(a) <= costPerResult(b) ? a : b))
  const worst = ads.reduce((a, b) => (costPerResult(a) > costPerResult(b) ? a : b))
  const store = data.mode === 'store'

  return (
    <div ref={ref}>
      <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'sm:grid-cols-2'}`}>
        {ads.map((ad) => {
          const winner = ad.id === best.id
          return (
            <div key={ad.id} className={`rounded-[10px] border bg-white p-3 sm:p-4 ${winner ? 'border-[#9fd0ae]' : 'border-rule'}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[14px] font-semibold">{ad.name}</p>
                <p className="mono text-[10.5px] text-ink-faint">${ad.spend} spent</p>
              </div>
              {!compact && <p className="mt-0.5 truncate text-[12.5px] text-ink-soft">“{ad.headline}”</p>}
              <ul className="mt-3 space-y-2">
                {ad.stages.map((s, i) => {
                  const last = i === ad.stages.length - 1
                  return (
                    <li key={s.label} className="grid grid-cols-[72px_1fr_30px] items-center gap-2 text-[12px] sm:grid-cols-[80px_1fr_34px]">
                      <span className="text-ink-soft">{s.label}</span>
                      <span className="block h-[10px] overflow-hidden rounded-full bg-[#efeee9]">
                        <motion.span
                          className={`block h-full rounded-full ${last ? (winner ? 'bg-[#2f9e5b]' : 'bg-[#c4321f]') : 'bg-ink'}`}
                          initial={reduced ? false : { width: 0 }}
                          animate={{ width: inView || reduced ? `${Math.max(3, (s.value / ad.stages[0].value) * 100)}%` : 0 }}
                          transition={{ ...springs.gentle, delay: reduced ? 0 : 0.1 + i * 0.12 }}
                        />
                      </span>
                      <span className={`text-right font-semibold tabular-nums ${last ? (winner ? 'text-[#1f7a46]' : 'text-[#b42318]') : ''}`}>{s.value}</span>
                    </li>
                  )
                })}
              </ul>
              <div className={`mt-3 flex flex-wrap justify-between gap-x-3 border-t border-rule pt-2 text-[12.5px] ${winner ? 'text-[#1f7a46]' : 'text-ink-soft'}`}>
                <span>
                  <span className="font-semibold">${costPerResult(ad)}</span> per {result.one}
                </span>
                {store && ad.revenue && (
                  <span>
                    <span className="font-semibold">${ad.revenue.toLocaleString('en-US')}</span> in sales
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {!compact && (
        <p className="mt-4 text-[15px] leading-[1.5]">
          <span className="font-semibold">
            {best.name} brings {result.one === 'order' ? 'an' : 'a'} {result.one} for ${costPerResult(best)}; {worst.name} for ${costPerResult(worst)}.
          </span>{' '}
          {store
            ? `Every $1 on ${best.name} brought back $${returnPerDollar(best).toFixed(2)} in Shopify sales, against $${returnPerDollar(worst).toFixed(2)} for ${worst.name}. Move the budget to ${best.name}.`
            : `${worst.name} gets far more messages, but most are "price?" and never book. Move the budget to ${best.name}.`}
        </p>
      )}
    </div>
  )
}
