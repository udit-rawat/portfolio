import { motion } from 'motion/react'

const GLOW = 'rgb(255 140 90)'

/* Step bars plus a round, glowing play/pause button. The glow pulses harder while stopped, to invite a press. */
export function DemoControls({
  scenes,
  scene,
  setScene,
  playing,
  onToggle,
}: {
  scenes: { title: string; ms: number }[]
  scene: number
  setScene: (i: number) => void
  playing: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2">
        {scenes.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Show step ${i + 1}: ${s.title}`}
            aria-current={i === scene}
            onClick={() => setScene(i)}
            className="flex h-7 flex-1 cursor-pointer items-center"
          >
            <span className="block h-2 w-full overflow-hidden rounded-full bg-rule">
              <span
                className={`block h-full rounded-full bg-ink transition-[width] ${i <= scene ? 'w-full' : 'w-0'}`}
                style={i === scene && playing ? { transitionDuration: `${s.ms}ms`, transitionTimingFunction: 'linear' } : { transitionDuration: '0ms' }}
              />
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Pause the animation' : 'Play the animation'}
        className="relative grid size-12 shrink-0 cursor-pointer place-items-center rounded-full"
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full blur-md"
          style={{ background: GLOW }}
          animate={playing ? { opacity: 0.35, scale: 1 } : { opacity: [0.45, 0.95, 0.45], scale: [0.95, 1.12, 0.95] }}
          transition={playing ? { duration: 0.4 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="relative grid size-12 place-items-center rounded-full bg-ink text-ground shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
              <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 4.8v14.4a1 1 0 0 0 1.52.85l11.4-7.2a1 1 0 0 0 0-1.7L9.52 3.95A1 1 0 0 0 8 4.8z" />
            </svg>
          )}
        </motion.span>
      </button>
    </div>
  )
}
