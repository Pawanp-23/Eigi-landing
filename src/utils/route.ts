/** The rope up the mountain in the Sherpas section, in SVG units, and where along it things sit. */
export const W = 800
export const H = 420
/** The route up, as vertices. Camps sit on vertices 1, 3, 5 and 7; the summit is the last one. */
export const ROUTE: [number, number][] = [[30, 400], [150, 352], [235, 372], [335, 282], [405, 300], [505, 200], [565, 222], [655, 112], [722, 46]]
export const CAMP_AT = [1, 3, 5, 7]

const SEG = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]))
const LEN = SEG.reduce((a, b) => a + b, 0)
/** How far along the route (0 to 100) each vertex sits. */
export const AT = ROUTE.map((_, i) => (SEG.slice(0, i).reduce((a, b) => a + b, 0) / LEN) * 100)

export function pointAt(v: number): [number, number] {
  let d = (v / 100) * LEN
  for (let i = 0; i < SEG.length; i++) {
    if (d <= SEG[i] || i === SEG.length - 1) {
      const t = Math.min(1, d / SEG[i])
      return [ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * t, ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * t]
    }
    d -= SEG[i]
  }
  return ROUTE[ROUTE.length - 1]
}

export const line = ROUTE.map(p => p.join(',')).join(' ')
