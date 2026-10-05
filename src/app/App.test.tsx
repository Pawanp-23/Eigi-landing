import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { App } from './App.tsx'

const html = renderToStaticMarkup(<App />)
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])

it('renders every section in story order', () => {
  const sections = [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1])
  expect(sections).toEqual(['try', 'why', 'trap', 'computer', 'plate', 'gateway', 'climb', 'people'])
  expect(html).toContain('<footer')
})

it('has one headline, unique ids, and menu links that all land somewhere', () => {
  expect(html.match(/<h1\b/g)).toHaveLength(1)
  expect(new Set(ids).size).toBe(ids.length)
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) expect(ids).toContain(anchor)
})

it('opens every outside link safely in a new tab', () => {
  for (const [tag] of html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) expect(tag).toContain('noopener')
})

it('shows the founders, and links to success stories instead of carrying them', () => {
  expect(html).toContain('Aman Khandelwal')
  expect(html).toContain('Mrunmay Chichkhede')
  expect(html).toContain('href="/stories/"')
  expect(html).not.toContain('Gondia')
})
