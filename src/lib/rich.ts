/** A run of chat text: plain, **bold**, or an @mention of a teammate. */
export type Run = { kind: 'text' | 'bold' | 'mention'; text: string }

const MENTION = /^@(Chief of (?:Staff|Sales|Marketing|Operations))/

/** Splits "**bold**" and "@Chief of X" out of a message. Anything else stays plain text. */
export function parseRich(input: string): Run[] {
  const runs: Run[] = []
  let plain = ''
  const flush = () => {
    if (plain) runs.push({ kind: 'text', text: plain })
    plain = ''
  }
  for (let i = 0; i < input.length; ) {
    if (input.startsWith('**', i)) {
      const end = input.indexOf('**', i + 2)
      if (end > i + 2) {
        flush()
        runs.push({ kind: 'bold', text: input.slice(i + 2, end) })
        i = end + 2
        continue
      }
    }
    const mention = input[i] === '@' ? MENTION.exec(input.slice(i)) : null
    if (mention) {
      flush()
      runs.push({ kind: 'mention', text: mention[0] })
      i += mention[0].length
      continue
    }
    plain += input[i]
    i += 1
  }
  flush()
  return runs
}
