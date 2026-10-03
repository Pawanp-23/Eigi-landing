import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { easeOut } from '../../../styles/motion.ts'
import { cx } from '../../../utils/cx.ts'
import { AMIT_DISPLAY, messageFor, whatsappLink } from '../utils/amit.ts'
import { useLoad } from '../state/useLoad.ts'
import { readAltitude, readStage } from '../utils/climb.ts'
import { loadLine, type Load } from '../utils/loads.ts'
import styles from './Radio.module.css'

type Call = { message: string; link: string }

/** Dispatch this on window (e.g. from the FAQ) to open the radio from anywhere on the page. */
export const OPEN_RADIO = 'eigi:open-radio'

const newCall = (load: Load | null): Call => {
  const message = messageFor(readStage(), readAltitude(), loadLine(load))
  return { message, link: whatsappLink(message) }
}

/**
 * "Radio base camp": the way to reach Amit, Eigi's AI onboarding agent on WhatsApp.
 * Opening it reads where you are on the climb and pre-writes your first message from that.
 * Desktop gets a QR code (WhatsApp lives on the phone); phones get a straight button.
 */
export function Radio() {
  const [call, setCall] = useState<Call | null>(null)
  const [qr, setQr] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardId = useId()
  const open = call !== null

  const { load } = useLoad()
  const toggle = () => setCall(open ? null : newCall(load))

  useEffect(() => {
    const onOpen = () => setCall((c) => c ?? newCall(load))
    addEventListener(OPEN_RADIO, onOpen)
    return () => removeEventListener(OPEN_RADIO, onOpen)
  }, [load])

  // the QR library only loads once someone actually opens the radio
  useEffect(() => {
    if (!call) return
    let live = true
    import('qrcode')
      .then(({ toString }) => toString(call.link, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#000', light: '#fff' } }))
      .then((svg) => { if (live) setQr(svg) })
      .catch(() => { if (live) setQr('') })
    return () => { live = false }
  }, [call])

  // Escape or a click elsewhere closes it
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setCall(null)
      buttonRef.current?.focus()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!cardRef.current?.contains(t) && !buttonRef.current?.contains(t)) setCall(null)
    }
    addEventListener('keydown', onKey)
    addEventListener('pointerdown', onDown)
    return () => { removeEventListener('keydown', onKey); removeEventListener('pointerdown', onDown) }
  }, [open])

  return (
    <div className={styles.radio}>
      <AnimatePresence>
        {call && (
          <motion.div
            ref={cardRef}
            id={cardId}
            className={styles.card}
            role="dialog"
            aria-label="Talk to Amit on WhatsApp"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <p className={cx(styles.kicker, 'mono')}><span className={styles.live} /> Radio base camp</p>
            <h3>Amit is on the line.</h3>
            <p className={styles.who}>
              Eigi’s AI onboarding agent on WhatsApp. He takes your details and ropes in a human sherpa.
            </p>

            <figure className={styles.bubble}>
              <figcaption className="mono">Your first message, ready to send</figcaption>
              <p>{call.message.split('\n\nref:')[0]}</p>
            </figure>

            <div className={styles.scan}>
              <div className={styles.qr} aria-hidden={!qr} dangerouslySetInnerHTML={{ __html: qr }} />
              <p className="mono">Scan with your phone<br />to radio Amit</p>
            </div>

            <a className={cx('btn', styles.go)} href={call.link} target="_blank" rel="noopener noreferrer">
              Open WhatsApp <span aria-hidden="true">→</span>
            </a>
            <p className={cx(styles.number, 'mono')}>{AMIT_DISPLAY}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        className={cx(styles.badge, open && styles.on)}
        aria-expanded={open}
        aria-controls={open ? cardId : undefined}
        onClick={toggle}
      >
        <svg className={styles.signal} viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="13" r="1.6" />
          <path d="M6.6 9.6a4.8 4.8 0 0 1 6.8 0" />
          <path d="M4 7a8.5 8.5 0 0 1 12 0" />
        </svg>
        <span className={styles.badgeText}>
          <span className="mono">Radio base camp</span>
          <span><i className={styles.live} /> Amit online</span>
        </span>
      </button>
    </div>
  )
}
