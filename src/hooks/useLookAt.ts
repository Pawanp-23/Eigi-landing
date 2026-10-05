import { useEffect } from 'react'

/**
 * Every Sherpie on the page watches the pointer. Mount once (in LandingPage): one listener, one frame
 * per move, and it nudges each `[data-eyes]` group a few pixels toward the pointer.
 */
export function useLookAt() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = innerWidth / 2
    let y = innerHeight / 2
    let frame = 0

    const look = () => {
      frame = 0
      for (const eyes of document.querySelectorAll<SVGGElement>('[data-eyes]')) {
        const box = eyes.ownerSVGElement?.getBoundingClientRect()
        if (!box || box.bottom < 0 || box.top > innerHeight) continue
        const dx = x - (box.left + box.width / 2)
        const dy = y - (box.top + box.height * 0.68)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 300)
        eyes.style.transform = `translate(${((dx / d) * 4.5 * k).toFixed(2)}px, ${((dy / d) * 3.5 * k).toFixed(2)}px)`
      }
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(look)
    }

    addEventListener('pointermove', onMove, { passive: true })
    return () => {
      removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
}
