import type { Rule } from '../../content/eigi.ts'

/** "a, b and c" / "a, b or c" */
export function listOf(items: readonly string[], last: 'and' | 'or') {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} ${last} ${items.at(-1)}`
}

/** Capitalise a rule's verb phrase for a list: "log calls" → "Log calls". */
export const asItem = (action: string) => action.charAt(0).toUpperCase() + action.slice(1)

/** What a role's rules mean, in one plain sentence the founder can check at a glance. */
export function ruleSentence(name: string, rules: readonly Rule[]) {
  const alone = rules.filter((r) => r.allowed).map((r) => r.action)
  const ask = rules.filter((r) => !r.allowed).map((r) => r.action)
  if (alone.length && ask.length) return `${name} will ${listOf(alone, 'and')} on its own. It asks you first to ${listOf(ask, 'or')}.`
  if (alone.length) return `${name} will ${listOf(alone, 'and')} on its own.`
  return `${name} asks you first to ${listOf(ask, 'or')}. Nothing happens without your OK.`
}
