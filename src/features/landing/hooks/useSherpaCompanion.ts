import { useEffect, type RefObject } from 'react'

/**
 * Keeps the sherpa a step beside the mouse with no lag, roped to it, updating at most once per frame.
 * Real mice only: touch and pens never start it. The system cursor itself is left alone.
 */
export function useSherpaCompanion(sherpaRef: RefObject<HTMLElement | null>, ropeRef: RefObject<SVGPathElement | null>) {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const sherpa = sherpaRef.current!
    const rope = ropeRef.current!
    let mx = 0, my = 0, raf = 0

    const place = () => {
      raf = 0
      const sx = mx - 46
      const sy = my + 22
      sherpa.style.transform = `translate(${sx}px,${sy}px)`
      rope.setAttribute('d', `M${mx} ${my} Q${(sx + mx) / 2} ${Math.max(sy, my) + 26} ${sx + 9} ${sy + 12}`)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(place)
    }

    addEventListener('pointermove', onMove, { passive: true })
    return () => {
      removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [sherpaRef, ropeRef])
}
