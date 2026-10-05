import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

/** A quiet contour map behind the headline: base camp, drawn once and redrawn on resize. */
export function Topo() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let timer = 0
    const draw = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(2, devicePixelRatio || 1)
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      const g = canvas.getContext('2d')
      if (!g) return
      g.scale(dpr, dpr)
      const cx = r.width * 0.5
      const cy = r.height * 1.08
      for (let i = 0; i < 18; i++) {
        const base = 140 + i * 58
        g.beginPath()
        for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 90) {
          const k = base * (1 + 0.06 * Math.sin(a * 3 + i * 0.7) + 0.04 * Math.sin(a * 5 - i * 0.4) + 0.025 * Math.sin(a * 9 + i))
          const x = cx + Math.cos(a) * k * 1.45
          const y = cy + Math.sin(a) * k * 0.9
          if (a === 0) g.moveTo(x, y)
          else g.lineTo(x, y)
        }
        // every fourth line is an index contour, a touch darker, like a real map
        g.strokeStyle = `rgba(23, 33, 31, ${i % 4 === 0 ? 0.085 : 0.045})`
        g.lineWidth = i % 4 === 0 ? 1.2 : 1
        g.stroke()
      }
    }
    const onResize = () => {
      clearTimeout(timer)
      timer = window.setTimeout(draw, 150)
    }
    draw()
    addEventListener('resize', onResize)
    return () => {
      removeEventListener('resize', onResize)
      clearTimeout(timer)
    }
  }, [])

  return <canvas ref={ref} className={styles.topo} aria-hidden="true" />
}
