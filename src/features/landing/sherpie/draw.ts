/*
 * Sherpie, Eigi's mascot (character sheet v0.3, design/sherpie-sheet.html): a soft white vinyl companion
 * with a round head (the logo's circle), a black knit beanie and the Eigi badge on its chest.
 * `drawSherpie` returns SVG markup for one pose in a 0 0 240 300 box; <SherpieDefs> supplies the shading.
 * Everything drawn comes from constants here (pack tags come from LOADS), never from user input.
 */

export type Eyes = 'open' | 'big' | 'up' | 'happy' | 'closed' | 'soft' | 'wink'
export type Arms = 'rest' | 'wave' | 'cheer' | 'hug' | 'swingA' | 'swingB' | 'flag' | 'shrug'
export type Legs = 'stand' | 'walkA' | 'walkB' | 'tuck' | 'sit'

export type Pose = {
  eyes?: Eyes
  brows?: 'none' | 'worried' | 'think'
  mouth?: 'smile' | 'small' | 'open' | 'flat' | 'o'
  arms?: Arms
  legs?: Legs
  tilt?: number
  back?: boolean
  blush?: boolean
  /** carries a pack with this tag on its back */
  pack?: string
  /** holds a pack out in front, with this tag */
  give?: string
  headset?: boolean
  flag?: boolean
  heart?: boolean
  think?: boolean
  sparks?: boolean
  zz?: boolean
  lift?: number
  /** on a dark section: props drawn in white, softer edge */
  dark?: boolean
  shadow?: boolean
}

const EDGE = '#c9c9c6'
const INK = '#141414'

export function drawSherpie(o: Pose = {}) {
  const dark = !!o.dark
  const edge = dark ? '#8a8a87' : EDGE
  const stroke = `stroke="${edge}" stroke-width="2"`
  const line = (d: string, w: number, c = INK) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
  const mark = dark ? '#fff' : INK

  // arms hang from behind the shoulders; poses rotate them around the shoulder
  const armL = `<path d="M80 134 C46 142 36 190 40 226 C41 238 50 244 57 238 C61 234 59 230 61 226 C66 204 72 176 86 150 Z" fill="url(#sherpie-vinyl)" ${stroke}/>`
    + line('M45 236 L44 244 M51 239 L51 247', 2.2, edge)
  const armR = `<path d="M160 134 C194 142 204 190 200 226 C199 238 190 244 183 238 C179 234 181 230 179 226 C174 204 168 176 154 150 Z" fill="url(#sherpie-vinyl)" ${stroke}/>`
    + line('M195 236 L196 244 M189 239 L189 247', 2.2, edge)
  const [rl, rr] = ({
    rest: [0, 0], wave: [0, -148], cheer: [150, -150], hug: [-34, 34], swingA: [16, 14], swingB: [-14, -16],
    flag: [0, -112], shrug: [26, -26],
  } as const)[o.arms ?? 'rest']
  const arm = (svg: string, r: number, sx: number) => `<g transform="rotate(${r} ${sx} 138)">${svg}</g>`

  const leg = (x: number, r: number) => `<g transform="rotate(${r} ${x + 15} 238)"><path d="M${x} 238 Q${x} 230 ${x + 8} 230 L${x + 22} 230 Q${x + 30} 230 ${x + 30} 238 L${x + 31} 276 Q${x + 31} 284 ${x + 22} 284 L${x + 8} 284 Q${x - 1} 284 ${x - 1} 276 Z" fill="url(#sherpie-vinyl)" ${stroke}/>${line(`M${x + 2} 274 H${x + 28}`, 1.6, edge)}</g>`
  const legs = ({
    stand: leg(86, 0) + leg(124, 0),
    walkA: leg(86, 12) + leg(124, -12),
    walkB: leg(86, -10) + leg(124, 10),
    tuck: leg(86, 16) + leg(124, -16),
    sit: `<g transform="translate(0 -14)"><path d="M88 262 h46 a14 14 0 0 1 0 28 h-46 a14 14 0 0 1 0 -28 Z" fill="url(#sherpie-vinyl)" ${stroke}/><path d="M112 266 h46 a14 14 0 0 1 0 28 h-46 a14 14 0 0 1 0 -28 Z" fill="url(#sherpie-vinyl)" ${stroke}/></g>`,
  })[o.legs ?? 'stand']

  const body = `<path d="M120 112 C70 112 58 150 58 196 C58 246 84 264 120 264 C156 264 182 246 182 196 C182 150 170 112 120 112 Z" fill="url(#sherpie-vinyl)" ${stroke}/>`
    + line('M64 214 Q120 230 176 214', 1.6, edge)
  const badge = `<circle cx="148" cy="152" r="11.5" fill="#fff" stroke="${edge}" stroke-width="1.6"/>`
    + `<path d="M141.5 145.5 L141.5 158.2 L156.4 158.2 Z" fill="${INK}"/><circle cx="149" cy="151.1" r="4.6" fill="${INK}"/>`
  const tagText = (x: number, y: number, t: string) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${t.length > 7 ? 5.6 : 7}" font-weight="600" fill="${INK}">${t}</text>`
  const pack = o.pack ? `<rect x="10" y="126" width="56" height="92" rx="14" fill="url(#sherpie-knit)"/><rect x="16" y="134" width="44" height="20" rx="6" fill="#2e2e2e"/><rect x="14" y="172" width="44" height="16" rx="4" fill="#fff"/>${tagText(36, 183, o.pack)}` : ''
  const straps = o.pack ? line('M92 122 Q86 170 90 214', 5) + line('M148 122 Q156 150 160 168', 5) : ''

  const fx = o.back ? -12 : 0
  const head = `<circle cx="120" cy="86" r="46" fill="url(#sherpie-head)" ${stroke}/>`
  // on a dark sky the black knit gets a faint edge so the beanie keeps its shape
  const knitEdge = dark ? ' stroke="#5c5c5a" stroke-width="1.6"' : ''
  const beanie = `<path d="M79 72 Q79 34 120 32 Q161 34 161 72 Z" fill="url(#sherpie-knit)"${knitEdge}/><rect x="75" y="62" width="90" height="16" rx="8" fill="#111"${knitEdge}/>`
    + [84, 93, 102, 111, 120, 129, 138, 147, 156].map((x) => line(`M${x} 66 V74`, 1.5, '#3c3c3c')).join('')
    + `<circle cx="120" cy="28" r="11" fill="url(#sherpie-knit)"${knitEdge}/><circle cx="116" cy="24" r="3" fill="#3a3a3a"/>`
  const headset = o.headset ? line('M74 92 Q72 22 120 20 Q168 22 166 92', 4.5)
    + `<rect x="160" y="84" width="14" height="24" rx="6" fill="${INK}"/>` + line('M168 106 Q168 124 144 126', 3) + `<circle cx="142" cy="126" r="3.6" fill="${INK}"/>` : ''

  const ey = 101, e1 = 104 + fx, e2 = 136 + fx
  const shine = (x: number, y: number) => `<circle cx="${x + 1.8}" cy="${y - 2.6}" r="1.8" fill="#fff"/>`
  const both = (f: (x: number) => string) => [e1, e2].map(f).join('')
  const eyes = ({
    open: both((x) => `<ellipse cx="${x}" cy="${ey}" rx="5.4" ry="7" fill="${INK}"/>${shine(x, ey)}`),
    big: both((x) => `<ellipse cx="${x}" cy="${ey}" rx="6.6" ry="8.4" fill="${INK}"/>${shine(x, ey)}<circle cx="${x - 2}" cy="${ey + 3}" r="1" fill="#fff"/>`),
    up: both((x) => `<ellipse cx="${x + 1}" cy="${ey - 2}" rx="5.4" ry="7" fill="${INK}"/>${shine(x + 1, ey - 3)}`),
    happy: both((x) => line(`M${x - 6} ${ey + 2} Q${x} ${ey - 6} ${x + 6} ${ey + 2}`, 3.4)),
    closed: both((x) => line(`M${x - 6} ${ey} Q${x} ${ey + 4} ${x + 6} ${ey}`, 3.2)),
    soft: both((x) => `<ellipse cx="${x}" cy="${ey + 1}" rx="5" ry="6" fill="${INK}"/>${shine(x, ey + 1)}`),
    wink: `<ellipse cx="${e1}" cy="${ey}" rx="5.4" ry="7" fill="${INK}"/>${shine(e1, ey)}` + line(`M${e2 - 6} ${ey + 2} Q${e2} ${ey - 5} ${e2 + 6} ${ey + 2}`, 3.4),
  })[o.eyes ?? 'open']
  const brows = ({
    none: '',
    worried: line(`M${e1 - 7} ${ey - 11} L${e1 + 5} ${ey - 15}`, 2.6) + line(`M${e2 - 5} ${ey - 15} L${e2 + 7} ${ey - 11}`, 2.6),
    think: line(`M${e1 - 6} ${ey - 15} Q${e1} ${ey - 19} ${e1 + 5} ${ey - 15}`, 2.6) + line(`M${e2 - 5} ${ey - 12} L${e2 + 6} ${ey - 12}`, 2.6),
  })[o.brows ?? 'none']
  const mx = 120 + fx
  const mouth = ({
    smile: line(`M${mx - 6} 115 Q${mx} 120 ${mx + 6} 115`, 2.6),
    small: line(`M${mx - 4} 116 Q${mx} 118.5 ${mx + 4} 116`, 2.4),
    open: `<path d="M${mx - 7} 113 Q${mx} 126 ${mx + 7} 113 Z" fill="${INK}"/>`,
    flat: line(`M${mx - 4} 117 H${mx + 4}`, 2.4),
    o: `<ellipse cx="${mx}" cy="117" rx="3" ry="3.8" fill="${INK}"/>`,
  })[o.mouth ?? 'smile']
  const blush = both((x) => `<ellipse cx="${x < 120 + fx ? x - 9 : x + 9}" cy="${ey + 11}" rx="6" ry="3" fill="#000" opacity="${o.blush ? .14 : .06}"/>`)

  const flag = o.flag ? line('M206 30 V284', 4.2, mark) + `<path d="M206 32 H240 L231 46 L240 60 H206 Z" fill="${mark}"/>`
    + `<path d="M213 38 L213 54 L231 54 Z" fill="${dark ? INK : '#fff'}"/><circle cx="222" cy="46" r="5.4" fill="${dark ? INK : '#fff'}"/>` : ''
  const given = o.give ? `<rect x="92" y="190" width="56" height="62" rx="14" fill="url(#sherpie-knit)"/><rect x="98" y="216" width="44" height="16" rx="4" fill="#fff"/>${tagText(120, 227, o.give)}` : ''
  const heart = o.heart ? `<path d="M186 52 C180 44 168 50 174 59 L186 70 L198 59 C204 50 192 44 186 52 Z" fill="${mark}"/>` : ''
  const thought = o.think ? `<circle cx="170" cy="44" r="3.5" fill="${mark}"/><circle cx="182" cy="30" r="5.5" fill="${mark}"/><circle cx="198" cy="10" r="8" fill="${mark}"/>` : ''
  const sparks = o.sparks ? line('M34 60 l-12 -8 M30 86 h-14 M44 38 l-6 -12', 3.2, mark) + line('M206 60 l12 -8 M210 86 h14 M196 38 l6 -12', 3.2, mark) : ''
  const zz = o.zz ? `<text x="168" y="40" font-family="JetBrains Mono, monospace" font-size="20" font-weight="600" fill="${mark}">z</text><text x="184" y="22" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600" fill="${mark}">z</text>` : ''

  const lift = o.lift ?? 0
  const shadow = o.shadow === false ? '' : `<ellipse cx="120" cy="288" rx="${lift ? 46 : 66}" ry="7" fill="${dark ? '#fff' : '#000'}" opacity=".1"/>`
  const tilt = o.tilt ? `rotate(${o.tilt} 120 120)` : ''
  // arms attach behind the shoulders like a soft toy's; only the hug brings them in front
  const arms = arm(armL, rl, 76) + arm(armR, rr, 164)
  const front = o.arms === 'hug'
  return shadow + `<g transform="translate(0 ${-lift + (o.legs === 'sit' ? 10 : 0)})">`
    + sparks + thought + heart + pack + legs + (front ? '' : arms) + body + badge + straps
    + `<g transform="${tilt}">${head}${beanie}${headset}${blush}${brows}${eyes}${mouth}</g>`
    + given + (front ? arms : '') + flag + zz + '</g>'
}
