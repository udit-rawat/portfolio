import { business } from './data'

/*
  A generic social ad, drawn with plain markup: no platform logos or branding,
  just the shape people recognise (account row, "Sponsored", picture, actions).
*/
export function AdCard({ headline, comments, className = '' }: { headline: string; comments: number; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-rule bg-white text-[13px] ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="grid size-7 place-items-center rounded-full bg-[#2f4a3a] text-[10px] font-bold text-white">{business.initials}</span>
        <span className="leading-tight">
          <span className="block text-[12.5px] font-semibold">{business.name}</span>
          <span className="block text-[10.5px] text-ink-faint">Sponsored</span>
        </span>
      </div>
      {/* The "photo": a calm kitchen made of blocks */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e2d4]">
        <span className="absolute inset-x-0 bottom-0 h-[38%] bg-[#d8cdb8]" />
        <span className="absolute bottom-[38%] left-[8%] h-[30%] w-[52%] rounded-t-[3px] bg-[#f6f2ea] shadow-[inset_0_-6px_0_#e3dccd]" />
        <span className="absolute bottom-[38%] left-[8%] h-[3%] w-[52%] bg-[#bfae8e]" />
        <span className="absolute top-[12%] left-[10%] h-[18%] w-[48%] rounded-[2px] bg-[#f6f2ea] shadow-[inset_0_-4px_0_#e3dccd]" />
        <span className="absolute top-[14%] right-[10%] h-[44%] w-[22%] rounded-[2px] bg-[#cfe0e8]" />
        <span className="absolute bottom-[38%] right-[8%] h-[46%] w-[26%] rounded-t-[2px] bg-[#2f4a3a]" />
        <span className="absolute right-3 bottom-3 left-3 rounded-[6px] bg-white/90 px-2.5 py-2 text-[12px] leading-snug font-semibold">{headline}</span>
      </div>
      <div className="flex items-center gap-4 px-3 py-2 text-[12px] text-ink-soft">
        <span>♡ 214</span>
        <span>
          💬 <span className="tabular-nums">{comments}</span>
        </span>
        <span className="ml-auto rounded-[6px] bg-[#eef0f3] px-2 py-1 text-[11.5px] font-medium text-ink">Send message</span>
      </div>
    </div>
  )
}
