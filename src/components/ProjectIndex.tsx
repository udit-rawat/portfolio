import { useRef, useSyncExternalStore, type CSSProperties } from 'react'
import { useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import { projectHref, showcase, type Project } from '../data'
import { Folder, shade } from './Folder'

/*
  The scannable version of the ring: fanout.sh style cards. On the homepage every
  card is wide: live demos first, then shipped products, then the agent work.
  The Lab page passes its own list and gets the compact four-up grid.
*/
export function ProjectIndex({ list, compact = false }: { list?: Project[]; compact?: boolean }) {
  const order = (p: Project) => (p.category === 'demo' ? 0 : p.category === 'client' ? 1 : 2)
  const items = list ?? [...showcase].sort((a, b) => order(a) - order(b))
  const featured = compact ? [] : items
  const rest = compact ? items : []
  // With an odd count the first wide card spans the full row.
  const spanFirst = featured.length % 2 === 1
  return (
    <section aria-label="Projects" className={`px-4 sm:px-8 ${compact ? 'pt-2 pb-16' : 'pt-4 pb-24'}`}>
      <div className="mx-auto max-w-[1120px]">
        <ul className="grid gap-3 md:grid-cols-2 xl:gap-4">
          {featured.map((p, i) => (
            <li key={p.slug} className={spanFirst && i === 0 ? 'md:col-span-2' : undefined}>
              <Card p={p} wide />
            </li>
          ))}
        </ul>
        <ul className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4 ${featured.length ? 'mt-3 xl:mt-4' : ''}`}>
          {rest.map((p) => (
            <li key={p.slug}>
              <Card p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* True on touch screens, where nothing can be hovered. */
const noHover = typeof window !== 'undefined' ? window.matchMedia('(hover: none)') : null
function useTouch() {
  return useSyncExternalStore(
    (cb) => {
      noHover?.addEventListener('change', cb)
      return () => noHover?.removeEventListener('change', cb)
    },
    () => noHover?.matches ?? false,
    () => false,
  )
}

function Card({ p, wide = false }: { p: Project; wide?: boolean }) {
  // On touch screens the files fan out when the card reaches the middle of the screen.
  const folderRef = useRef<HTMLDivElement>(null)
  const touch = useTouch()
  const centred = useInView(folderRef, { margin: '-35% 0px -35% 0px' })
  const bg = p.dark ? '#33332f' : shade(p.paper, 0.42)
  const style = { background: bg, color: p.dark ? '#ecebe6' : 'var(--color-ink)' } as CSSProperties
  return (
    <Link
      to={projectHref(p)}
      style={style}
      className={`group relative flex h-full rounded-[14px] p-5 hover:z-10 focus-visible:z-10 sm:p-6 ${
        wide ? 'flex-col gap-6 sm:flex-row sm:items-stretch' : 'flex-col'
      }`}
    >
      <div
        ref={folderRef}
        className={`shrink-0 ${wide ? 'w-[44%] max-w-[190px] sm:mt-16 sm:w-[36%]' : 'w-[50%] max-w-[180px]'}`}
      >
        <Folder project={p} fan={wide ? 'up' : 'right'} open={touch && centred} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className={`flex items-baseline justify-between gap-3 ${wide ? 'sm:mt-1' : 'mt-6'}`}>
          <h3 className={`leading-tight font-semibold tracking-[-0.02em] ${wide ? 'text-[26px]' : 'text-[21px]'}`}>{p.title}</h3>
          <span className="mono text-[11px] opacity-60">{p.year}</span>
        </div>
        {wide && <p className="mt-2 text-[15px] leading-snug opacity-80">{p.oneLiner}</p>}
        <ul className="mt-3 space-y-1.5 text-[14px] leading-snug">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2 opacity-80">
              <span aria-hidden="true" className="opacity-60">
                +
              </span>
              {pt}
            </li>
          ))}
        </ul>
        <p
          className="mono mt-5 w-max max-w-full rounded-full px-2.5 py-1 text-[11px]"
          style={{ background: p.dark ? 'rgb(255 255 255 / 0.1)' : 'rgb(255 255 255 / 0.55)' }}
        >
          {p.chip.join('  ·  ')}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[14px] font-medium">
          <span>Open</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
