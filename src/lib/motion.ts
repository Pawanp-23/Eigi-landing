import type { MotionProps, Transition } from 'motion/react'

/** A calm spring for UI that settles without fuss. */
export const calm: Transition = { type: 'spring', bounce: 0.2, visualDuration: 0.6 }

/** A livelier spring for small things that pop into place (a tick, a box). */
export const pop: Transition = { type: 'spring', bounce: 0.45, visualDuration: 0.45 }

/**
 * Rise into place once in view. Only moves, never hides: the content is readable
 * before any animation runs, which keeps it safe for previews and slow devices.
 */
export const rise = {
  initial: { y: 26 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: calm,
} satisfies MotionProps
