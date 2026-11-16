import type { ReactNode } from 'react'
import type { DocKind, Field, Mark } from './data'

/*
  Small, clearly fake freight papers: a rate confirmation, a bill of lading,
  a proof of delivery (drawn like a phone photo) and an invoice. Each shows a
  few fields that can be marked as a problem or as fine, a signature box,
  and a SAMPLE stamp.
*/

const TITLE: Record<DocKind, string> = {
  ratecon: 'RATE CONFIRMATION',
  bol: 'BILL OF LADING',
  pod: 'PROOF OF DELIVERY',
  invoice: 'INVOICE',
}

const MARK: Record<Mark, string> = {
  none: '',
  bad: 'bg-[#fbd9d4] text-[#a3200f] ring-1 ring-[#e8a59b]',
  good: 'bg-[#d6eedd] text-[#17633a] ring-1 ring-[#9fd0ae]',
}

function Signature({ signed }: { signed?: boolean | 'missing' }) {
  if (signed === undefined) return null
  return (
    <span className="mt-1.5 block">
      <span className="block text-[0.6em] tracking-wide text-black/45 uppercase">Receiver signature</span>
      {signed === 'missing' ? (
        <span className="mt-0.5 block h-[2.2em] rounded-[2px] border border-dashed border-[#d1432d] bg-[#fdf0ee]" />
      ) : (
        <svg viewBox="0 0 120 30" className="mt-0.5 block h-[2.2em] w-full" aria-hidden="true">
          <path d="M4 22c10-14 14-16 16-8s-6 10 2 2 12-14 14-6-4 12 6 4 10-10 14-4 8 6 18-2 14-6 20-2" fill="none" stroke="#1d3a6b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="2" y1="27" x2="118" y2="27" stroke="rgb(0 0 0 / 0.2)" />
        </svg>
      )}
    </span>
  )
}

type Props = {
  kind: DocKind
  fields: Field[]
  signed?: boolean | 'missing'
  dark?: boolean
  overlay?: ReactNode
  className?: string
}

export function FreightDoc({ kind, fields, signed, dark = false, overlay, className = '' }: Props) {
  const photo = kind === 'pod'
  return (
    <span
      className={`relative flex flex-col overflow-hidden rounded-[4px] p-2 text-[11px] text-[#222] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_6px_16px_-8px_rgb(0_0_0/0.25)] ${
        photo ? 'bg-[#f7f3ea]' : 'bg-white'
      } ${className}`}
    >
      <span className={`block border-b pb-1 text-[0.68em] font-bold tracking-[0.12em] ${kind === 'invoice' ? 'border-[#2f4a3a] text-[#2f4a3a]' : 'border-black/15 text-black/60'}`}>
        {TITLE[kind]}
      </span>
      <span className="mt-1.5 block space-y-1">
        {fields.map((f) => (
          <span key={f.label} className="flex items-baseline justify-between gap-2 leading-tight">
            <span className="text-[0.66em] tracking-wide text-black/45 uppercase">{f.label}</span>
            <span className={`rounded-[2px] px-[3px] font-semibold transition-colors duration-500 ${MARK[f.mark ?? 'none']}`}>{f.value}</span>
          </span>
        ))}
      </span>
      <span className="mt-1.5 block space-y-[3px]">
        {['86%', '64%'].map((w) => (
          <span key={w} className="block h-[3px] rounded-full bg-black/[0.08]" style={{ width: w }} />
        ))}
      </span>
      <span className="mt-auto pt-1">
        <Signature signed={signed} />
      </span>
      <span className="pointer-events-none absolute right-1 bottom-1 rotate-[-8deg] rounded-[2px] border border-[#b42318]/40 px-1 text-[0.5em] font-bold tracking-widest text-[#b42318]/50">
        SAMPLE
      </span>
      {/* A phone photo of paper: slight vignette, or too dark to read */}
      {photo && <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_40%_30%,transparent_55%,rgb(60_40_10/0.12))]" />}
      {dark && <span className="pointer-events-none absolute inset-0 bg-black/55" />}
      {overlay}
    </span>
  )
}
