import type { ReactNode } from 'react'
import { cx } from '../../lib/cx.ts'

interface HeadingProps {
  eyebrow: ReactNode
  /** red dot before the eyebrow */
  dot?: boolean
  title: string
  /** the words set in the italic serif, after the title */
  serif?: string
  id?: string
  className?: string
  center?: boolean
}

/** A section's label and headline. The serif words are the ones the headline leans on. */
export function Heading({ eyebrow, dot = true, title, serif, id, className, center }: HeadingProps) {
  return (
    <div className={className} style={center ? { textAlign: 'center' } : undefined}>
      <div className={cx('eyebrow', dot && 'dot')} style={center ? { justifyContent: 'center' } : undefined}>{eyebrow}</div>
      <h2 id={id} style={{ marginTop: 18 }}>
        {title}
        {serif && <> <span className="serif">{serif}</span></>}
      </h2>
    </div>
  )
}
