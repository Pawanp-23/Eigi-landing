import { useCallback, useState } from 'react'
import { hoursTaken } from '../features/week/week.ts'
import type { Brief } from './amit.ts'

/**
 * What the visitor tells us as they scroll: what they typed in the hero and the pains they tapped.
 * The page carries it down so later sections (the job runner, the final brief) can answer them.
 */
export function useBrief() {
  const [task, setTask] = useState('')
  const [pains, setPains] = useState<string[]>([])
  const togglePain = useCallback(
    (area: string) => setPains((p) => (p.includes(area) ? p.filter((a) => a !== area) : [...p, area])),
    [],
  )
  const brief: Brief = { task, pains, hours: hoursTaken(pains) }
  return { brief, setTask, togglePain }
}
