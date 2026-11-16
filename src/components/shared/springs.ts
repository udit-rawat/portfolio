import type { Transition } from 'motion/react'

/*
  Spring settings adapted from EasyUI's motion tokens (MIT, github.com/Surajmaurya1/easyui):
  near-critical damping, so motion feels physical but never bouncy.
*/
export const springs = {
  gentle: { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 } as Transition,
  smooth: { type: 'spring', stiffness: 200, damping: 28, mass: 0.85 } as Transition,
  snappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.5 } as Transition,
}

/* Ease used for content that should lead the spring by a hair. */
export const leadEase = [0.16, 1, 0.3, 1] as const
