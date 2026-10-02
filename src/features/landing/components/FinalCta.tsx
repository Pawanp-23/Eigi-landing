import { motion } from 'motion/react'
import { reveal } from '../../../styles/motion.ts'

export function FinalCta() {
  return (
    <section>
      <motion.h2 {...reveal}>Ready to start your ascent?</motion.h2>
      <motion.p className="lead" {...reveal}>Book a call. We’ll bring the ropes.</motion.p>
      {/* TODO: point at the real booking link */}
      <motion.a className="btn" href="#" {...reveal}>Talk to a sherpa →</motion.a>
    </section>
  )
}
