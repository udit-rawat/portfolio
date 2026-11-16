import { company, report } from './data'

/* The weekly report, drawn like the email it is. */
export function DocsReport() {
  return (
    <article className="overflow-hidden rounded-[10px] border border-rule bg-white">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule bg-[#f6f5f1] px-4 py-3 sm:px-5">
        <p className="text-[14.5px] font-semibold tracking-tight">Weekly report · {company.name}</p>
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

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            { title: 'Asked most', rows: report.top },
            { title: 'Asked, but not in your documents', rows: report.gaps },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold">{col.title}</h4>
              <ul className="mt-2 divide-y divide-rule border-y border-rule">
                {col.rows.map((r) => (
                  <li key={r.text} className="flex items-baseline justify-between gap-3 py-2 text-[13.5px]">
                    <span className="min-w-0">{r.text}</span>
                    <span className="shrink-0 tabular-nums text-ink-soft">{r.count}×</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[8px] bg-[#fdf0ee] px-3.5 py-3">
          <p className="text-[12px] font-semibold tracking-wide text-[#a3200f] uppercase">One thing to change</p>
          <p className="mt-1 text-[14px] leading-[1.5]">{report.change}</p>
        </div>
      </div>
    </article>
  )
}
