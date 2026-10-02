import { useEffect, type RefObject } from 'react'
import { lerp } from '../../../utils/math.ts'

/**
 * Makes `followerRef` trail the mouse with an easing lag, and draws `ropeRef` as a slack
 * rope between the two. Stays hidden (opacity 0) until the first mouse move, so touch never starts it.
 */
export function useCursorFollower(
  followerRef: RefObject<HTMLElement | null>,
  ropeRef: RefObject<SVGPathElement | null>,
) {
  useEffect(() => {
    const follower = followerRef.current!
    const rope = ropeRef.current!
    let mx = innerWidth / 2, my = innerHeight / 2, sx = mx, sy = my, raf = 0

    const follow = () => {
      sx = lerp(sx, mx - 40, 0.06)
      sy = lerp(sy, my + 20, 0.06)
      follower.style.transform = `translate(${sx}px,${sy}px)`
      rope.setAttribute('d', `M${mx} ${my} Q${(sx + mx) / 2} ${Math.max(sy, my) + 30} ${sx + 9} ${sy + 12}`)
      raf = requestAnimationFrame(follow)
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (raf) return
      follower.style.opacity = '1'
      raf = requestAnimationFrame(follow)
    }

    addEventListener('mousemove', onMove)
    return () => {
      removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [followerRef, ropeRef])
}
