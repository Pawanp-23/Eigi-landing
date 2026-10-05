import { describe, expect, it } from 'vitest'
import { SCENES } from '../../content/computer.ts'
import { approveAt, finishedThread, keepAt } from './thread.ts'

const sales = SCENES.find((s) => s.id === 'sales')!

describe('slack demo thread', () => {
  it('every scene starts with you or the sherpa, and every ask has a reply', () => {
    for (const scene of SCENES) {
      expect(['you', 'sherpa']).toContain(scene.messages[0].from)
      for (const m of scene.messages) if (m.ask) expect(m.ask.done.length).toBeGreaterThan(0)
    }
  })

  it('shows a finished thread with every step ticked and asks waiting', () => {
    const thread = finishedThread(sales)
    expect(thread).toHaveLength(sales.messages.length)
    expect(thread[1].stepsDone).toBe(sales.messages[1].work!.steps.length)
    expect(thread[2].ask).toBe('waiting')
    expect(thread.every((m) => !m.live)).toBe(true)
  })

  it('approving marks the ask and adds the teammate’s reply once', () => {
    const once = approveAt(finishedThread(sales), 2)
    expect(once[2].ask).toBe('approved')
    expect(once.at(-1)!.message.text).toBe(sales.messages[2].ask!.done)
    expect(approveAt(once, 2)).toBe(once)
  })

  it('keeping it as a draft sends nothing', () => {
    const kept = keepAt(finishedThread(sales), 2)
    expect(kept[2].ask).toBe('kept')
    expect(kept).toHaveLength(sales.messages.length)
    expect(approveAt(kept, 2)).toBe(kept)
  })
})
