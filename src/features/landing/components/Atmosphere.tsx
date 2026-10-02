import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, type RefObject } from 'react'
import { clamp, contourPath, mixRgb } from '../../../utils/math.ts'
import styles from './Atmosphere.module.css'

const TOPO = [[300, 350], [900, 700], [500, 1150]].flatMap(([cx, cy], ci) => {
  const rings = []
  for (let r = 40; r < 520; r += 28) {
    rings.push(contourPath(cx, cy, r, 0.8, 8, (rad) => Math.sin(rad * 3 + ci + r * 0.02) * r * 0.12 + Math.cos(rad * 5 - ci) * r * 0.06))
  }
  return rings
})

/**
 * The sky flips white to black while the sherpas section's top travels from 53% to 3% of the viewport:
 * a quick switch with no muddy greys. Tied to the section, so adding sections above never moves it.
 */
const FLIP_OFFSET = ['start 0.53', 'start 0.03'] as const

function paintSky(progress: number) {
  const t = clamp(progress)
  const root = document.documentElement.style
  root.setProperty('--bg', mixRgb([255, 255, 255], [0, 0, 0], t))
  root.setProperty('--fg', mixRgb([0, 0, 0], [255, 255, 255], t))
  root.setProperty('--muted', mixRgb([107, 107, 107], [150, 150, 150], t))
  root.setProperty('--line', t > 0.5 ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.14)')
}

/** Fixed backdrop: drifting topo lines and low fog. The sky darkens as you near the summit. */
type AtmosphereProps = { climb: RefObject<HTMLElement | null>; flipAt: RefObject<HTMLElement | null> }

export function Atmosphere({ climb, flipAt }: AtmosphereProps) {
  const { scrollYProgress } = useScroll({ target: climb, offset: ['start start', 'end end'] })
  const { scrollYProgress: flip } = useScroll({ target: flipAt, offset: [...FLIP_OFFSET] })
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fog = useTransform(flip, [0, 1], [1, 0])

  useMotionValueEvent(flip, 'change', paintSky)
  useEffect(() => paintSky(flip.get()), [flip])

  return (
    <>
      <motion.svg className={styles.topo} viewBox="0 0 1200 1400" preserveAspectRatio="xMidYMid slice" style={{ y: drift }} aria-hidden="true">
        {TOPO.map((d) => <path key={d} d={d} />)}
      </motion.svg>
      <motion.div className={styles.fog} style={{ opacity: fog }} />
    </>
  )
}
