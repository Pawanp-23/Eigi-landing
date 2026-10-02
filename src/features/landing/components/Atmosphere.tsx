import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { clamp, contourPath, mixRgb } from '../../../utils/math.ts'
import styles from './Atmosphere.module.css'

const TOPO = [[300, 350], [900, 700], [500, 1150]].flatMap(([cx, cy], ci) => {
  const rings = []
  for (let r = 40; r < 520; r += 28) {
    rings.push(contourPath(cx, cy, r, 0.8, 8, (rad) => Math.sin(rad * 3 + ci + r * 0.02) * r * 0.12 + Math.cos(rad * 5 - ci) * r * 0.06))
  }
  return rings
})

/** Page-progress window where the sky flips white → black: a quick switch entering the sherpas section, no muddy greys. */
const FLIP: [number, number] = [0.745, 0.795]

function paintSky(progress: number) {
  const t = clamp((progress - FLIP[0]) / (FLIP[1] - FLIP[0]))
  const root = document.documentElement.style
  root.setProperty('--bg', mixRgb([255, 255, 255], [0, 0, 0], t))
  root.setProperty('--fg', mixRgb([0, 0, 0], [255, 255, 255], t))
  root.setProperty('--muted', mixRgb([107, 107, 107], [150, 150, 150], t))
  root.setProperty('--line', t > 0.5 ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.14)')
}

/** Fixed backdrop: drifting topo lines and low fog. The sky darkens as you near the summit. */
export function Atmosphere() {
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fog = useTransform(scrollYProgress, FLIP, [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', paintSky)
  useEffect(() => paintSky(scrollYProgress.get()), [scrollYProgress])

  return (
    <>
      <motion.svg className={styles.topo} viewBox="0 0 1200 1400" preserveAspectRatio="xMidYMid slice" style={{ y: drift }} aria-hidden="true">
        {TOPO.map((d) => <path key={d} d={d} />)}
      </motion.svg>
      <motion.div className={styles.fog} style={{ opacity: fog }} />
    </>
  )
}
