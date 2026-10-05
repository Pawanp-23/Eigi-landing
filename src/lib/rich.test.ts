import { describe, expect, it } from 'vitest'
import { parseRich } from './rich.ts'

describe('parseRich', () => {
  it('keeps plain text as one run', () => {
    expect(parseRich('On it.')).toEqual([{ kind: 'text', text: 'On it.' }])
  })

  it('splits bold and mentions', () => {
    expect(parseRich('@Chief of Sales ping **Sam** now')).toEqual([
      { kind: 'mention', text: '@Chief of Sales' },
      { kind: 'text', text: ' ping ' },
      { kind: 'bold', text: 'Sam' },
      { kind: 'text', text: ' now' },
    ])
  })

  it('leaves unmatched markers and unknown @names alone', () => {
    expect(parseRich('2 ** 3 @someone')).toEqual([{ kind: 'text', text: '2 ** 3 @someone' }])
  })
})
