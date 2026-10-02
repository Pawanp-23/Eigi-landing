import { useEffect, type RefObject } from 'react'

/**
 * Pins `followerRef` beside the mouse with no lag, and draws `ropeRef` as a short slack rope
 * between the two. Updates at most once per frame. Stays hidden (opacity 0) until the first
 * mouse move, so touch never starts it.
 */
export function useCursorFollower(
  followerRef: RefObject<HTMLElement | null>,
  ropeRef: RefObject<SVGPathElement | null>,
) {
  useEffect(() => {
    const follower = followerRef.current!
    const rope = ropeRef.current!
    let mx = 0, my = 0, raf = 0

    const place = () => {
      raf = 0
      const sx = mx - 40
      const sy = my + 20
      follower.style.transform = `translate(${sx}px,${sy}px)`
      rope.setAttribute('d', `M${mx} ${my} Q${(sx + mx) / 2} ${Math.max(sy, my) + 30} ${sx + 9} ${sy + 12}`)
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      follower.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(place)
    }

    addEventListener('mousemove', onMove, { passive: true })
    return () => {
      removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [followerRef, ropeRef])
}
