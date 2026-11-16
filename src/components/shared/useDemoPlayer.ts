import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/*
  Playback for the demo animations. Scenes advance on their own while the
  animation is on screen. Reduced-motion users get a still frame until they
  press Play; pressing Play is a clear choice to watch, so it always plays.
*/
export function useDemoPlayer(scenes: { ms: number }[]) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const reduced = useReducedMotion() ?? false
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)
  const [chosen, setChosen] = useState(false)

  const still = reduced && !chosen
  const playing = inView && !paused && !still

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setScene((s) => (s + 1) % scenes.length), scenes[scene].ms)
    return () => window.clearTimeout(id)
  }, [playing, scene, scenes])

  const toggle = () => {
    if (playing) {
      setPaused(true)
      return
    }
    setPaused(false)
    setChosen(true)
  }

  return { ref, scene, setScene, playing, still, toggle }
}
