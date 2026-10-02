import { AnimatePresence, motion, useMotionValueEvent, useScroll, type MotionStyle, type Variants } from 'motion/react'
import { useCallback, useId, useRef, useState } from 'react'
import { usePageLock } from '../../hooks/usePageLock.ts'
import { easeOut } from '../../styles/motion.ts'
import { cx } from '../../utils/cx.ts'
import { contourPath } from '../../utils/math.ts'
import styles from './Nav.module.css'

type NavLink = { href: `#${string}`; label: string }

type NavProps = {
  cta: string
  href: string
  /** In-page links for the menu, in page order. */
  links: readonly NavLink[]
  /** Labels each link with where it lands, given as page progress: 0 = top, 1 = bottom. */
  formatProgress: (progress: number) => string
}

/** The menu's curtain: mountain ranges, far to near, as 1000×200 silhouettes. */
const RANGES = [
  'M0 200V96L40 84L75 92L120 64L150 72L185 50L230 78L262 70L300 88L345 58L372 66L410 36L446 60L480 52L520 80L560 70L598 44L630 56L668 30L700 48L742 62L780 54L822 76L860 58L896 68L940 40L972 52L1000 46V200Z',
  'M0 200V120L50 104L92 118L140 76L170 90L214 58L250 84L290 98L336 70L362 82L404 108L450 86L494 112L540 74L566 84L610 48L650 78L690 94L736 66L770 80L816 104L860 88L902 110L948 80L1000 96V200Z',
  'M0 200V156L48 140L96 150L150 118L196 132L240 100L272 110L318 76L350 88L392 44L430 12L462 40L488 34L530 78L566 70L612 104L660 92L706 124L752 108L800 136L850 118L900 146L952 128L1000 140V200Z',
]

/** Contour rings round a peak, drawn in behind the links. */
const RINGS = Array.from({ length: 12 }, (_, i) => {
  const r = 40 + i * 42
  return contourPath(760, 640, r, 0.72, 10, (rad) => Math.sin(rad * 3 + i * 0.6) * r * 0.08)
})

/** Slow start, fast middle, soft landing: a mountain range has weight. */
const heave = [0.7, 0, 0.2, 1] as const

// 122% parks a range just below the screen, ridge and all (the ridge is 22vh tall)
const rangeMotion: Variants = {
  open: (i: number) => ({ y: 0, transition: { duration: 0.75, delay: i * 0.06, ease: heave } }),
  // the nearest range sinks first, so the paler ones behind it peel away after
  closed: (i: number) => ({ y: '122%', transition: { duration: 0.55, delay: 0.1 + (RANGES.length - 1 - i) * 0.05, ease: heave } }),
}
// Links take `custom` = climb order (bottom link 0): the curtain covers the screen bottom-up, so they
// climb in bottom-up behind it, each starting once the dark range has passed its row.
const labelMotion: Variants = {
  open: (climb: number) => ({ y: 0, transition: { duration: 0.8, delay: 0.4 + climb * 0.05, ease: easeOut } }),
  closed: { y: '110%', transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] } },
}
const fadeMotion: Variants = {
  open: (climb: number) => ({ opacity: 1, transition: { duration: 0.5, delay: 0.55 + climb * 0.05 } }),
  closed: { opacity: 0, transition: { duration: 0.2 } },
}
const ringMotion: Variants = {
  open: (i: number) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.8, delay: 0.35 + i * 0.05, ease: easeOut } }),
  closed: { pathLength: 0, opacity: 0, transition: { duration: 0.3 } },
}

/**
 * Fixed top bar (logo, CTA, menu toggle). It tucks away while you scroll down and drops back when you
 * scroll up. The menu is a full-screen route map that rises over the page as a mountain range.
 */
export function Nav({ cta, href, links, formatProgress }: NavProps) {
  const [open, setOpen] = useState(false)
  const [tucked, setTucked] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const dy = y - (scrollY.getPrevious() ?? y)
    // a jump (menu link, Home/End) isn't a scroll, so it leaves the bar in place
    setTucked(y > 120 && dy > 0 && dy < innerHeight)
  })

  // the bar and the fade behind it slide together
  const slide = {
    initial: { y: '-110%' },
    animate: { y: tucked && !open ? '-110%' : 0 },
    transition: { duration: 0.5, ease: easeOut },
  }
  const close = () => setOpen(false)
  const escape = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <>
      <motion.div className={styles.fade} aria-hidden="true" {...slide} />
      <motion.header className={styles.bar} {...slide} onFocus={() => setTucked(false)}>
        <a className={styles.logo} href="#top" aria-label="eigi.ai — back to top" onClick={close} />
        <a className={styles.cta} href={href} onClick={close}>{cta}</a>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.word} aria-hidden="true"><span>Menu</span><span>Close</span></span>
          <span className={styles.icon} aria-hidden="true" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && <Menu key="menu" id={menuId} links={links} formatProgress={formatProgress} onNavigate={close} onEscape={escape} />}
      </AnimatePresence>
    </>
  )
}

type MenuProps = Pick<NavProps, 'links' | 'formatProgress'> & {
  id: string
  onNavigate: () => void
  onEscape: () => void
}

/** Ranges rise far to near, contour rings draw in, then the links climb in one by one. */
function Menu({ id, links, formatProgress, onNavigate, onEscape }: MenuProps) {
  usePageLock(onEscape)

  // Read once, on open. The colours are frozen too: a menu jump can flip the sky (and --bg/--fg) behind
  // the curtain, and the curtain should keep the colour it rose in.
  const [{ progress, here, inverted }] = useState(() => {
    const max = document.documentElement.scrollHeight - innerHeight
    const tops = links.map(({ href }) => {
      const target = document.getElementById(href.slice(1))
      return target ? target.getBoundingClientRect().top + scrollY : 0
    })
    const page = getComputedStyle(document.documentElement)
    return {
      progress: tops.map((top) => Math.min(1, top / max)),
      here: tops.findLastIndex((top) => top <= scrollY + innerHeight / 2),
      inverted: { '--bg': page.getPropertyValue('--fg'), '--fg': page.getPropertyValue('--bg') } as MotionStyle,
    }
  })

  return (
    <motion.div className={styles.overlay} style={inverted} initial="closed" animate="open" exit="closed">
      <div aria-hidden="true">
        {RANGES.map((d, i) => (
          <motion.div key={d} className={styles.range} variants={rangeMotion} custom={i}>
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none"><path d={d} /></svg>
          </motion.div>
        ))}
        <svg className={styles.rings} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {RINGS.map((d, i) => <motion.path key={d} d={d} variants={ringMotion} custom={i} />)}
        </svg>
      </div>

      <nav id={id} className={styles.menu} aria-label="Sections">
        <ol className={styles.list}>
          {links.map(({ href, label }, i) => {
            const climb = links.length - 1 - i
            return (
              <li key={href}>
                <a href={href} aria-current={i === here ? 'location' : undefined} onClick={onNavigate}>
                  <motion.span className={cx(styles.meta, 'mono')} variants={fadeMotion} custom={climb}>
                    {formatProgress(progress[i])}
                  </motion.span>
                  <span className={styles.mask}>
                    <motion.span className={styles.label} variants={labelMotion} custom={climb}>{label}</motion.span>
                  </span>
                  {i === here && (
                    <motion.span className={cx(styles.here, 'mono')} variants={fadeMotion} custom={climb} aria-hidden="true">
                      You are here
                    </motion.span>
                  )}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </motion.div>
  )
}
