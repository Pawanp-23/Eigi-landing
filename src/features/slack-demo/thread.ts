import type { Scene, SceneMessage } from '../../content/computer.ts'

/** A message as it currently sits in the channel. */
export interface Shown {
  key: string
  message: SceneMessage
  /** how many work steps have ticked off */
  stepsDone: number
  /** null when the message asks nothing */
  ask: 'waiting' | 'approved' | 'kept' | null
  /** appeared while the visitor watched, so it animates in */
  live: boolean
}

export const show = (message: SceneMessage, key: string, live: boolean, stepsDone = 0): Shown => ({
  key, message, stepsDone, live, ask: message.ask ? 'waiting' : null,
})

/** The whole thread, already finished: what the window shows before (or instead of) playing it. */
export const finishedThread = (scene: Scene): Shown[] =>
  scene.messages.map((m, i) => show(m, `${scene.id}-${i}`, false, m.work?.steps.length ?? 0))

/** Approve the ask on message `index`: mark it, and the teammate replies underneath. */
export function approveAt(thread: Shown[], index: number): Shown[] {
  const target = thread[index]
  if (!target?.message.ask || target.ask !== 'waiting') return thread
  const reply: SceneMessage = { from: target.message.from, time: target.message.time, text: target.message.ask.done }
  return [
    ...thread.slice(0, index), { ...target, ask: 'approved' }, ...thread.slice(index + 1),
    show(reply, `${target.key}-reply`, true),
  ]
}

/** Decline on message `index`: it stays a draft and nothing is sent. */
export function keepAt(thread: Shown[], index: number): Shown[] {
  const target = thread[index]
  if (target?.ask !== 'waiting') return thread
  return thread.map((m, i) => (i === index ? { ...m, ask: 'kept' } : m))
}
