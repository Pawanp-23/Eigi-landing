import { describe, expect, it } from 'vitest'
import { ORG } from '../../content/eigi.ts'
import { asItem, listOf, ruleSentence } from './rules.ts'

describe('rules in plain words', () => {
  it('joins lists the way people write them', () => {
    expect(listOf(['a'], 'and')).toBe('a')
    expect(listOf(['a', 'b'], 'or')).toBe('a or b')
    expect(listOf(['a', 'b', 'c'], 'and')).toBe('a, b and c')
  })

  it('says what runs alone and what waits for you', () => {
    expect(ruleSentence('Chief of Sales', ORG.sales.rules)).toBe(
      'Chief of Sales will log calls in the CRM on its own. It asks you first to reply to a new lead or send a quote.',
    )
  })

  it('handles all-alone and all-ask', () => {
    const all = ORG.mkt.rules.map((r) => ({ ...r, allowed: true }))
    expect(ruleSentence('Chief of Marketing', all)).toBe('Chief of Marketing will write drafts, schedule a post and email your customer list on its own.')
    const none = ORG.mkt.rules.map((r) => ({ ...r, allowed: false }))
    expect(ruleSentence('Chief of Marketing', none)).toMatch(/^Chief of Marketing asks you first to write drafts, schedule a post or email your customer list\. Nothing happens/)
  })

  it('capitalises list items', () => {
    expect(asItem('log calls in the CRM')).toBe('Log calls in the CRM')
  })
})
