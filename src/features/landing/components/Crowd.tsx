import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { cx } from '../../../utils/cx.ts'
import { useCrowd } from '../hooks/useCrowd.ts'
import styles from './Crowd.module.css'

function hintFor(chosen: number) {
  if (chosen === 0) return '↓ Tap anyone in the crowd to give them a sherpa'
  if (chosen === 1) return '✓ They have a sherpa now. Watch them climb ↓'
  return `✓ ${chosen} on the route. Keep going`
}

/** Base-camp crowd canvas. Tap (or press Enter on) a wandering peep to give them a sherpa. */
export function Crowd() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { status, choose } = useCrowd(canvasRef)
  const [chosen, setChosen] = useState(0)

  // decorative: if the sprite fails there is nobody to tap, so drop the crowd and its hint
  if (status === 'error') return null

  const onClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    if (choose({ x: e.clientX - r.left, y: e.clientY - r.top })) setChosen((n) => n + 1)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    if (choose()) setChosen((n) => n + 1)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.crowd}
        role="button"
        tabIndex={0}
        aria-label="A crowd of people wandering at base camp. Press to give one of them a sherpa."
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
      <div className={cx(styles.hint, chosen > 0 && styles.on, 'mono')} aria-live="polite">
        {hintFor(chosen)}
      </div>
    </>
  )
}
