import { useInView, useReducedMotion, type MotionValue } from 'motion/react'
import { useEffect, type RefObject } from 'react'
import { HORIZON, ORBITS, createParticles, particleRadius, phase } from '../utils/singularity.ts'

/** How much faster everything spins once fully collapsed. */
const COLLAPSE_SPIN = 3

/**
 * Draws the gateway on a canvas: three orbits of particles spinning around an event horizon,
 * collapsing into it as `progress` (the pinned section's smoothed scroll) runs from 0 to 1.
 * Animates only while on screen; with reduced motion it paints still frames on scroll instead.
 */
export function useSingularity(canvasRef: RefObject<HTMLCanvasElement | null>, progress: MotionValue<number>) {
  const onScreen = useInView(canvasRef)
  const still = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const particles = createParticles()
    let w = 0
    let h = 0

    const fit = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
    }
    fit()
    const resize = new ResizeObserver(fit)
    resize.observe(canvas)

    /** Advance every particle by `dt` seconds. Velocity is integrated per frame, so speeding up never makes them jump. */
    const step = (dt: number) => {
      const boost = 1 + phase(progress.get()).collapse * COLLAPSE_SPIN
      for (const p of particles) p.angle += dt * p.speed * boost
    }

    const draw = (trails: boolean) => {
      const { reveal, collapse, open } = phase(progress.get())
      const unit = Math.min(w, h)
      const cx = w / 2
      const cy = h / 2
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      ctx.shadowBlur = 0
      // a translucent wipe instead of a clear leaves short light trails behind each particle
      ctx.globalAlpha = 1
      ctx.fillStyle = trails ? 'rgba(0,0,0,.2)' : '#000'
      ctx.fillRect(0, 0, w, h)

      // particles, one batched path per orbit: humans are dots, engineers are dashes, Eigi computer is pixels
      ctx.fillStyle = ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1
      ORBITS.forEach((o, orbit) => {
        const shown = reveal[orbit]
        const alpha = shown * (1 - open)
        if (alpha <= 0.002) return
        const settle = 0.9 + 0.1 * shown // a new orbit settles out to its ring as it fades up
        ctx.globalAlpha = alpha * 0.85
        ctx.beginPath()
        for (const p of particles) {
          if (p.orbit !== orbit) continue
          const r = particleRadius(p, collapse) * unit * settle
          const cos = Math.cos(p.angle)
          const sin = Math.sin(p.angle)
          const x = cx + cos * r
          const y = cy + sin * r * 0.62
          if (o.glyph === 'dot') {
            ctx.moveTo(x + 1.3, y); ctx.arc(x, y, 1.3, 0, Math.PI * 2)
          } else if (o.glyph === 'dash') {
            ctx.moveTo(x + sin * 4, y - cos * 2.5); ctx.lineTo(x - sin * 4, y + cos * 2.5)
          } else {
            ctx.rect(x - 1, y - 1, 2, 2)
          }
        }
        if (o.glyph === 'dash') ctx.stroke()
        else ctx.fill()
      })

      // orbit labels, each on its own side so they never stack: humans left, engineers right, Eigi computer on top
      ctx.font = `500 ${unit < 500 ? 9 : 11}px "JetBrains Mono", monospace`
      ORBITS.forEach((o, i) => {
        const alpha = reveal[i] * (1 - Math.min(1, collapse * 2.5))
        if (alpha <= 0.002 || w < 640) return // phones: no room at the sides; the equation and captions name the orbits
        const r = (o.radius + 0.03) * unit
        const [x0, y0, x1, y1, align] =
          i === 0 ? [cx - r, cy, cx - r - 18, cy, 'right'] as const
          : i === 1 ? [cx + r, cy, cx + r + 18, cy, 'left'] as const
          : [cx, cy - r * 0.62, cx, cy - r * 0.62 - 18, 'center'] as const
        ctx.globalAlpha = alpha * 0.7
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
        ctx.globalAlpha = alpha
        ctx.textAlign = align
        ctx.fillText(`${String(i + 1).padStart(2, '0')} · ${o.label.toUpperCase()}`, x1 + (align === 'right' ? -8 : align === 'left' ? 8 : 0), y1 + (align === 'center' ? -8 : 4))
      })

      // the event horizon: a black disc with a glowing photon ring that swells as the gateway opens,
      // until it is wide enough to hold the finale's headline inside it
      const closed = HORIZON * unit * (1 + collapse * 0.35)
      const horizon = closed + (Math.max(0.47 * unit, Math.min(w * 0.42, 300)) - closed) * open
      ctx.globalAlpha = 1
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 12 + collapse * 30 + open * 40
      ctx.lineWidth = 1.2 + collapse * 1.5
      ctx.beginPath(); ctx.ellipse(cx, cy, horizon, horizon * 0.98, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.shadowBlur = 0
      ctx.fillStyle = '#000'
      ctx.beginPath(); ctx.ellipse(cx, cy, horizon - 1, (horizon - 1) * 0.98, 0, 0, Math.PI * 2); ctx.fill()
    }

    if (still || !onScreen) {
      draw(false)
      const unsub = still ? progress.on('change', () => draw(false)) : undefined
      return () => { resize.disconnect(); unsub?.() }
    }

    let last = performance.now()
    let raf = requestAnimationFrame(function frame(now) {
      step(Math.min(1 / 30, (now - last) / 1000)) // cap the jump after a dropped frame or background tab
      last = now
      draw(true)
      raf = requestAnimationFrame(frame)
    })
    return () => { cancelAnimationFrame(raf); resize.disconnect() }
  }, [canvasRef, progress, onScreen, still])
}
