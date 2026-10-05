import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { STORIES } from '../content/stories.ts'
import { StoriesPage } from './StoriesPage.tsx'

const html = renderToStaticMarkup(<StoriesPage />)
const text = html.replace(/<[^>]+>/g, ' ')

it('shows the real stories, and only those', () => {
  expect(STORIES).toHaveLength(2)
  for (const s of STORIES) expect(text).toContain(s.title)
  expect(html.match(/data-kind="story"/g)).toHaveLength(STORIES.length)
  expect(text).not.toMatch(/use case/i)
})

it('has one headline, marks itself in the menu, and links home sections back to the landing page', () => {
  expect(html.match(/<h1\b/g)).toHaveLength(1)
  expect(html).toMatch(/href="\/stories\/" aria-current="page"/)
  expect(html).toContain('href="/#why"')
  for (const [tag] of html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) expect(tag).toContain('noopener')
})
