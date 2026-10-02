import { lerp } from '../../../utils/math.ts'
import { cellRect, PEEP_COUNT, type Rect } from './peeps.ts'

/** Seconds a walker takes to cross the stage at speed 1. */
const CROSSING_S = 10
/** One up-and-down step of the walking bob. */
const STEP_S = 0.5
const BOB_PX = 8
const DIM = 'grayscale(1) contrast(.55) brightness(1.18)'

type Walker = {
  rect: Rect
  w: number
  h: number
  dir: 1 | -1
  from: number
  to: number
  baseY: number
  speed: number
  t: number
  x: number
  y: number
  /** Tapped: has a sherpa now, drawn in full colour. */
  chosen: boolean
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

/**
 * The base-camp crowd: peeps wander left and right across a canvas, each one replaced by a
 * fresh random peep when they walk off. Pure state + a draw call, so it can be tested headless.
 */
export function createCrowd(sprite: HTMLImageElement) {
  const cells = Array.from({ length: PEEP_COUNT }, (_, i) => cellRect(sprite, i))
  let idle: Rect[] = []
  let walkers: Walker[] = []
  let width = 0
  let height = 0
  let scale = 1

  function place(wk: Walker) {
    wk.x = lerp(wk.from, wk.to, wk.t / CROSSING_S)
    wk.y = wk.baseY - BOB_PX * scale * Math.abs(Math.sin((Math.PI * wk.t) / STEP_S))
  }

  function spawn() {
    const [rect] = idle.splice(Math.floor(Math.random() * idle.length), 1)
    const dir = Math.random() > 0.5 ? 1 : -1
    const w = rect[2] * scale
    const h = rect[3] * scale
    // cubic bias: most people walk near the front edge, a few further back
    const baseY = height - h + (60 - 180 * Math.random() ** 3) * scale
    const wk: Walker = {
      rect, w, h, dir, baseY,
      from: dir === 1 ? -w : width + w,
      to: dir === 1 ? width + w : -w,
      speed: rand(0.5, 1.4),
      t: 0, x: 0, y: 0, chosen: false,
    }
    walkers.push(wk)
    walkers.sort((a, b) => a.baseY - b.baseY) // back to front
    return wk
  }

  return {
    get walkers(): readonly Walker[] {
      return walkers
    },

    /** Re-populate for a new stage size; fewer people on small screens. */
    resize(w: number, h: number) {
      width = w
      height = h
      scale = Math.min(1, (height * 0.62) / cells[0][3])
      idle = [...cells]
      walkers = []
      const n = Math.min(cells.length, Math.round(width / 30))
      for (let i = 0; i < n; i++) {
        const wk = spawn()
        wk.t = Math.random() * CROSSING_S // start mid-walk, not all at the edges
        place(wk)
      }
    },

    tick(dt: number) {
      for (const wk of [...walkers]) {
        wk.t += dt * wk.speed
        if (wk.t < CROSSING_S) {
          place(wk)
          continue
        }
        walkers.splice(walkers.indexOf(wk), 1)
        idle.push(wk.rect)
        place(spawn())
      }
    },

    /** Gives the walker under (x, y) a sherpa. True if someone new was chosen. */
    pickAt(x: number, y: number) {
      // front-most first; only the middle 60% of a cell is body, the rest is padding
      const wk = walkers.findLast((p) => {
        const left = p.dir > 0 ? p.x : p.x - p.w
        return x > left + p.w * 0.2 && x < left + p.w * 0.8 && y > p.y && y < p.y + p.h
      })
      if (!wk || wk.chosen) return false
      wk.chosen = true
      return true
    },

    /** Keyboard alternative to pickAt: chooses a random on-screen walker. */
    pickAny() {
      const onStage = walkers.filter((p) => !p.chosen && p.x > p.w && p.x < width - p.w)
      if (!onStage.length) return false
      onStage[Math.floor(Math.random() * onStage.length)].chosen = true
      return true
    },

    draw(ctx: CanvasRenderingContext2D, dpr: number) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      for (const p of walkers) {
        ctx.setTransform(dpr * p.dir, 0, 0, dpr, dpr * p.x, dpr * p.y)
        ctx.filter = p.chosen ? 'none' : DIM
        ctx.drawImage(sprite, ...p.rect, 0, 0, p.w, p.h)
      }
      ctx.filter = 'none'
    },
  }
}

export type Crowd = ReturnType<typeof createCrowd>
