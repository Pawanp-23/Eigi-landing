# Eigi landing page: project context

A running summary of what's decided and built, so any teammate (or a fresh AI session) can pick up without losing context.
_Last updated: 5 Oct 2026._

---

## 1. What we are building

A new marketing site for **eigi.ai**.

**The pitch.** Everyone sold you AI. Nobody showed you how. Eigi gives small businesses AI teammates that do real work (**Eigi Computer**, the main product) and a **sherpa**, a forward-deployed engineer, who sets them up and stays until it sticks.

**Ideal customer (ICP).**
- Early-stage, US-based founders, solo or with a team of fewer than 10, pre-seed to Series A, who want to stay lean.
- Strong signals: just raised or joined an accelerator, just launched, hiring their first ops, engineering or support people, talking openly about AI-native ways of working.
- Sweet spot: non-technical founders and service-heavy businesses.

## 2. Stack and how to run

| | |
|---|---|
| Repo | https://github.com/Pawanp-23/Eigi-landing- |
| Stack | React 19 + Vite 8 + TypeScript, CSS Modules, `motion` (animations), Vitest, oxlint |
| Run | `npm install` then `npm run dev`, open http://localhost:5173 |
| Checks | `npm run lint && npm test && npm run build` |
| Layout | See README: `sections/`, `features/`, `components/`, `content/` (all copy), `lib/`, `styles/` |

## 3. The design (final, approved 5 Oct 2026)

Called **Summit** while it was being designed. The approved static design is kept at `design/summit-reference.html`.

- **Story and copy** come from the live content on https://eigi-landing.vercel.app (Rashmin's site): hero, Sound familiar, the problem, the gateway, Meet your Eigi, Small team. Full C-suite, AI pace. Your call, Before you hire for it, Meet your AI sherpas, Field notes, Our people, FAQ, Your next chapter.
- **Eigi Computer leads**: right under the hero, a live Slack window where the AI team (Chief of Staff, Sales, Marketing, Operations) and your sherpa work, with a trust row underneath.
- **Look and feel**: calm and trustworthy. Soft paper ground, ink text, Bricolage Grotesque headlines with one Instrument Serif italic phrase, Geist body, Geist Mono labels.
- **Colour means role**: blue Chief of Staff, red Sales, yellow Marketing, green Operations, ink/white for the sherpa. (This replaced the old black-and-white-only rule.)
- **Sherpie** (white soft-toy mascot with a black beanie) peeks over the hero headline, climbs onto the Slack window and peeks up at the end. Its eyes follow the pointer.
- **House rules**: no em dashes anywhere (a test enforces it in `src/content/`); respect reduced motion; nothing hidden waiting on an animation; no horizontal scrolling.
- **Links**: Studio opens in the same tab; Documentation and WhatsApp open in a new tab.

## 4. Repository history

- 5 Oct 2026: the repo was rebuilt from scratch on `feature/summit`. Every component of the old designs was removed.
- Old designs are archived as tags, not branches: `archive/ascent` (old `main`, "The Ascent"), `archive/eigi-computer`, `archive/sherpie`. Check one out with `git checkout archive/sherpie` if you ever need it.

## 5. Key facts and links

| | |
|---|---|
| Documentation | https://docs.eigi.ai/ |
| Studio | https://studio.eigi.ai/ (**confirm**) |
| Contact | buddy@eigi.ai |
| Amit (AI onboarding agent on WhatsApp) | +91 92252 99611 |
| Content source | https://eigi-landing.vercel.app |

## 6. Open items before launch

- [ ] Merge `feature/summit` into `main` and deploy.
- [ ] Prerender the page at build time so search engines and link previews see content without JavaScript.
- [ ] A proper social sharing image (1200×630) instead of the favicon.
- [ ] Real customer stories beyond the two field notes; the Slack and job examples are illustrative.
- [ ] Exact report URLs for the Census and MIT statistics.
- [ ] Confirm the Studio URL; test every Amit WhatsApp link from a real phone.
- [ ] Privacy, Terms and Data deletion pages (footer links point to the top for now).
- [ ] Analytics, an accessibility pass, a Lighthouse check.
