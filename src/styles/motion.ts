import type { MotionProps } from 'motion/react'

/** Spread onto any motion element to fade it up once it scrolls into view. */
export const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: [0.2, 0.7, 0.2, 1] },
} satisfies MotionProps
