import type { Dataset } from './data'

/*
  The one-page report an owner gets every week, drawn like the email it is:
  four numbers, what people asked under each ad, spam hidden, and one change.
*/
export function WeeklyReport({ data }: { data: Dataset }) {
  const { report, business } = data
  return (
    <article className="overflow-hidden rounded-[10px] border border-rule bg-white">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule bg-[#f6f5f1] px-4 py-3 sm:px-5">
        <p className="text-[14.5px] font-semibold tracking-tight">Weekly report · {business.name}</p>
        <p className="mono text-[11px] text-ink-faint">{report.week}</p>
      </header>

      <div className="px-4 py-4 sm:px-5">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
          {report.tiles.map((t) => (
            <div key={t.label} className="border-l-2 border-rule pl-3">
              <dt className="text-[12px] text-ink-soft">{t.label}</dt>
              <dd className="mt-0.5 text-[20px] font-semibold tracking-tight tabular-nums">{t.value}</dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-6 text-[13px] font-semibold">What people asked under your ads</h4>
        <ul className="mt-2 divide-y divide-rule border-y border-rule">
          {report.questions.map((q) => (
            <li key={q.text} className="flex items-baseline gap-3 py-2 text-[13.5px]">
              <span className="mono w-[42px] shrink-0 text-[11px] text-ink-faint">{q.ad}</span>
              <span className="min-w-0 flex-1">“{q.text}”</span>
              <span className="shrink-0 tabular-nums text-ink-soft">{q.count}×</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[13px] text-ink-soft">
          <span className="font-semibold text-ink">{report.spamHidden}</span> spam and scam comments hidden from your ads.
        </p>

        <div className="mt-4 rounded-[8px] bg-[#fdf0ee] px-3.5 py-3">
          <p className="text-[12px] font-semibold tracking-wide text-[#a3200f] uppercase">One thing to change</p>
          <p className="mt-1 text-[14px] leading-[1.5]">{report.change}</p>
        </div>
      </div>
    </article>
  )
}
