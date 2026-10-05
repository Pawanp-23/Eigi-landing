/*
 * Google Analytics 4, switched on only when VITE_GA_ID is set (e.g. G-XXXXXXX in a .env file).
 * Without it, nothing loads and track() is a no-op, so local play sends no data anywhere.
 *
 * GA already counts page views, scrolls and outbound clicks on its own. We add the moments
 * that say whether the story works: a job handed over, a draft approved, the plate cleared,
 * and above all, who opens a chat with Buddy (and from which section).
 */

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

const ID = import.meta.env.VITE_GA_ID as string | undefined

export type EventName =
  | 'hand_over_job' | 'approve_draft' | 'why_question' | 'trap_slider'
  | 'computer_app' | 'plate_cleared' | 'gateway_opened' | 'climb_summit' | 'talk_to_buddy'

export function track(name: EventName, params: Record<string, string | number> = {}) {
  window.gtag?.('event', name, params)
}

/** Load gtag once, and report every WhatsApp click with the section it came from. */
export function initAnalytics() {
  if (!ID || window.gtag) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID)}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag() { window.dataLayer!.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', ID)

  // Every Buddy link carries "ref: <section>" in its prefilled text; send just that tag, never the message.
  document.addEventListener('click', e => {
    const a = (e.target as Element).closest?.('a[href^="https://wa.me/"]') as HTMLAnchorElement | null
    if (!a) return
    const ref = /ref: ([\w-]+)/.exec(decodeURIComponent(new URL(a.href).searchParams.get('text') ?? ''))?.[1] ?? 'unknown'
    track('talk_to_buddy', { ref })
  })
}
