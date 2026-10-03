import { drawSherpie, type Pose } from './draw.ts'

/** The soft-vinyl shading every Sherpie on the page shares. Render once, near the top of the page. */
export function SherpieDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <radialGradient id="sherpie-vinyl" cx=".36" cy=".3" r=".85">
          <stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#f6f6f5" /><stop offset=".85" stopColor="#e4e4e2" /><stop offset="1" stopColor="#d6d6d3" />
        </radialGradient>
        <radialGradient id="sherpie-head" cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f5f5f4" /><stop offset="1" stopColor="#dcdcd9" />
        </radialGradient>
        <linearGradient id="sherpie-knit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" /><stop offset="1" stopColor="#0b0b0b" />
        </linearGradient>
      </defs>
    </svg>
  )
}

type SherpieProps = Pose & {
  className?: string
  /** crop: the whole figure, or just the head (avatars, peeking) */
  crop?: 'full' | 'head'
  title?: string
}

const VIEW = { full: '-8 -16 256 316', head: '66 16 108 112' }

/** Sherpie in one pose. Decorative unless given a `title`. */
export function Sherpie({ className, crop = 'full', title, ...pose }: SherpieProps) {
  return (
    <svg
      className={className}
      viewBox={VIEW[crop]}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      // markup is generated from our own constants in draw.ts (no user input reaches it)
      dangerouslySetInnerHTML={{ __html: drawSherpie(pose) }}
    />
  )
}
