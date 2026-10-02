import { useEffect } from 'react'

/**
 * While mounted, holds the page still behind a full-screen overlay: no scrolling, `main`, the footer and other page sections (`data-page`) are inert,
 * and in-page links jump instead of smooth-scrolling (the overlay hides the jump). Escape calls `onEscape`.
 */
export function usePageLock(onEscape: () => void) {
  useEffect(() => {
    const html = document.documentElement.style
    const behind = document.querySelectorAll('main, footer, [data-page]')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }

    html.overflow = 'hidden'
    html.scrollBehavior = 'auto'
    behind.forEach((el) => el.toggleAttribute('inert', true))
    addEventListener('keydown', onKey)
    return () => {
      html.overflow = ''
      html.scrollBehavior = ''
      behind.forEach((el) => el.toggleAttribute('inert', false))
      removeEventListener('keydown', onKey)
    }
  }, [onEscape])
}
