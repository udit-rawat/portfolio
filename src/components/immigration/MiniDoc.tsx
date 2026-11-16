import type { ReactNode } from 'react'

/*
  Small, obviously fake documents drawn with plain markup: a passport data page,
  an ID card, a marriage certificate, a bank statement, a salary letter and a form.
  Each one has a "key line", the fact the check reads, which can be marked
  as a problem (red) or as fixed (green). Every one carries a SAMPLE stamp.
*/

export type DocKind = 'passport' | 'idcard' | 'certificate' | 'bank' | 'letter' | 'form' | 'ceremony'
export type Mark = 'none' | 'bad' | 'good'

const MARK: Record<Mark, string> = {
  none: '',
  bad: 'bg-[#fbd9d4] text-[#a3200f] ring-1 ring-[#e8a59b]',
  good: 'bg-[#d6eedd] text-[#17633a] ring-1 ring-[#9fd0ae]',
}

function KeyLine({ label, value, mark }: { label?: string; value: string; mark: Mark }) {
  return (
    <span className="block leading-tight">
      {label && <span className="block text-[0.62em] tracking-wide text-black/45 uppercase">{label}</span>}
      <span className={`inline-block rounded-[2px] px-[3px] font-semibold transition-colors duration-500 ${MARK[mark]}`}>{value}</span>
    </span>
  )
}

function Lines({ n, w = ['92%', '78%', '85%', '60%'] }: { n: number; w?: string[] }) {
  return (
    <span className="mt-1 block space-y-[3px]">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="block h-[3px] rounded-full bg-black/10" style={{ width: w[i % w.length] }} />
      ))}
    </span>
  )
}

/* Body text that fills the rest of the page, so a tall document doesn't look empty. */
function Filler() {
  return (
    <span className="mt-auto block space-y-[3px] pt-2">
      {['88%', '94%', '72%', '90%', '64%'].map((w, i) => (
        <span key={i} className="block h-[3px] rounded-full bg-black/[0.07]" style={{ width: w }} />
      ))}
    </span>
  )
}

function Stamp() {
  return (
    <span className="pointer-events-none absolute right-1 bottom-1 rotate-[-8deg] rounded-[2px] border border-[#b42318]/40 px-1 text-[0.5em] font-bold tracking-widest text-[#b42318]/50">
      SAMPLE
    </span>
  )
}

type Props = {
  kind: DocKind
  value: string
  label?: string
  mark?: Mark
  /** Extra content drawn over the paper, e.g. a scan bar. */
  overlay?: ReactNode
  className?: string
}

export function MiniDoc({ kind, value, label, mark = 'none', overlay, className = '' }: Props) {
  const base = `relative flex flex-col overflow-hidden rounded-[4px] text-[11px] text-[#222] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_6px_16px_-8px_rgb(0_0_0/0.25)] ${className}`

  if (kind === 'passport') {
    return (
      <span className={`${base} bg-[#eef0f6] p-2`}>
        <span className="block text-[0.7em] font-bold tracking-[0.18em] text-[#2b3a67]">PASSPORT</span>
        <span className="mt-1.5 flex gap-1.5">
          <span className="block h-[3.1em] w-[2.4em] shrink-0 rounded-[2px] bg-[#c9cede]" />
          <span className="min-w-0 flex-1">
            <KeyLine label="Given name" value={value} mark={mark} />
            <Lines n={2} />
          </span>
        </span>
        <span className="mt-1.5 block truncate font-mono text-[0.58em] text-black/40">P&lt;IND&lt;&lt;SAMPLE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
        <Filler />
        <Stamp />
        {overlay}
      </span>
    )
  }

  if (kind === 'idcard') {
    return (
      <span className={`${base} bg-white p-2`}>
        <span className="absolute inset-x-0 top-0 h-[4px] bg-[#e98b3a]" />
        <span className="mt-0.5 block text-[0.66em] font-bold tracking-wide text-black/60">ID CARD</span>
        <span className="mt-1.5 flex gap-1.5">
          <span className="block h-[2.6em] w-[2.1em] shrink-0 rounded-[2px] bg-black/10" />
          <span className="min-w-0 flex-1">
            <KeyLine label="Name" value={value} mark={mark} />
            <Lines n={1} />
          </span>
        </span>
        <span className="mt-1.5 block font-mono text-[0.6em] text-black/40">XXXX XXXX 0000</span>
        <Filler />
        <Stamp />
        {overlay}
      </span>
    )
  }

  if (kind === 'certificate' || kind === 'ceremony') {
    return (
      <span className={`${base} bg-[#fbf6e9] p-1.5`}>
        <span className="block rounded-[2px] border border-double border-[#b89a5a] border-[3px] px-1.5 py-1.5 text-center">
          <span className="block font-serif text-[0.78em] italic text-[#6b5320]">
            {kind === 'certificate' ? 'Certificate of Marriage' : 'Anand Karaj record'}
          </span>
          <Lines n={1} w={['70%']} />
          <span className="mt-1 block">
            <KeyLine label={label ?? 'Bride'} value={value} mark={mark} />
          </span>
          <Lines n={1} w={['55%']} />
        </span>
        <Filler />
        <Stamp />
        {overlay}
      </span>
    )
  }

  if (kind === 'bank') {
    return (
      <span className={`${base} bg-white p-2`}>
        <span className="block text-[0.66em] font-bold tracking-wide text-[#1d4f7a]">BANK STATEMENT</span>
        <span className="mt-1 block space-y-[3px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex justify-between gap-2">
              <span className="block h-[3px] w-[45%] self-center rounded-full bg-black/10" />
              <span className="block h-[3px] w-[18%] self-center rounded-full bg-black/10" />
            </span>
          ))}
        </span>
        <span className="mt-1 block">
          <KeyLine label={label ?? 'Salary credit'} value={value} mark={mark} />
        </span>
        <Filler />
        <Stamp />
        {overlay}
      </span>
    )
  }

  if (kind === 'letter') {
    return (
      <span className={`${base} bg-white p-2`}>
        <span className="block border-b border-black/10 pb-1 text-[0.66em] font-bold tracking-wide text-black/55">EMPLOYER LETTERHEAD</span>
        <Lines n={2} />
        <span className="mt-1 block">
          <KeyLine label={label ?? 'Monthly salary'} value={value} mark={mark} />
        </span>
        <Lines n={1} w={['50%']} />
        <Filler />
        <Stamp />
        {overlay}
      </span>
    )
  }

  // form
  return (
    <span className={`${base} bg-white p-2`}>
      <span className="-mx-2 -mt-2 mb-1.5 block bg-[#e9e9e6] px-2 py-1 text-[0.62em] font-bold tracking-wide text-black/55">
        RELATIONSHIP INFORMATION
      </span>
      <KeyLine label={label ?? 'Date first met'} value={value} mark={mark} />
      <Lines n={2} />
      <Filler />
      <Stamp />
      {overlay}
    </span>
  )
}
