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
| Stack | React 19 + Vite 8 + TypeScript, CSS Modules, CSS animations (no animation library), Vitest, oxlint |
| Run | `npm install` then `npm run dev`, open http://localhost:5173 |
| Checks | `npm run check` (lint, tests, build); GitHub Actions runs the same on every push and PR |
| Docker | Matches Agent360: `node:20-alpine` on `linux/amd64`, `npm install`, then `nginx` serving `dist/` on port 82. Standalone: `docker build --platform linux/amd64 -t eigi-landing .`; `docker run --rm -p 3000:82 eigi-landing`. Analytics is read from the build-time `.env` file. See README. |
| Compose / integration | `docker-compose-lp.yml` and `docker-compose-lp-qa.yml` match Agent360's root files: context `./frontend/landing_page`, `vaani-lp` service/container, `3000:82`, `cliniq360/vaani-lp:${IMAGE_TAG}` or `cliniq360/vaani-lp-qa:${IMAGE_TAG}`, existing environment variables/volume and `on-failure` restart. Move the frontend into Agent360's `frontend/landing_page/` and keep Compose files at the Agent360 root. |
| Layout | Follows Agent360's `frontend/landing_page`: `App.tsx`, `main.tsx` and `index.css` at the `src/` root; `pages/LandingPage/` owns `Header/`, `Footer/`, `sections/*Section/` and `content/`; shared code lives in `components/common/`, `hooks/`, `utils/`, `assets/Images/` and `theme/`. Component folders use `index.tsx` with CSS Modules beside them. See README for the full tree. |

## 3. The design: Eigi Play (final, approved 5 Oct 2026)

**Rashmin's story, our Summit look, and every section something you can play with.** It was built in a separate playground and replaced the Summit page on `feature/eigi-play`.

| # | Section | What the visitor does |
|---|---|---|
| 1 | Hero, "Everyone sold you AI. Nobody showed you how." | Types or picks a job; watches the Eigi go through Ask, Computer, Memory, Approval; approves or edits the draft |
| 2 | Why Eigi, "Sound familiar?" | Taps the founder's five questions; each flips to how Eigi takes it |
| 3 | The trap, "Growing by hiring? So is everyone else." | Slides customers 10 to 40: hiring grows the team, Eigi adds 1 Eigi per 10 customers; then the promise ("You build the company. Eigi runs it.") |
| 4 | Eigi computer, "A computer that works anywhere, everywhere. The platform to build / ship / sell / work / scale." | Watches an Eigi drive 8 apps (Browser, Sheets, Mail, Slack, WhatsApp, Voice, CRM, Files); taps one to take over |
| 5 | Your plate, "Before you hire for it, hand it to an Eigi." | Drags 12 first jobs to the right Eigi |
| 6 | Gateway, "Your gateway to singularity." | Switches on You, Sherpas, Eigis to open the portal |
| 7 | Sherpas, "Meet your AI sherpas." | Drags Sherpie up through Camp I to IV |
| 8 | Field notes | Two real stories: a financial learning founder, and Amit in Gondia |
| 9 | Founders | Aman Khandelwal and Mrunmay Chichkhede |

- **Look and feel**: soft paper ground, ink text, Bricolage Grotesque headlines with one Instrument Serif italic phrase, Geist body, Geist Mono labels. Each section is about one screen tall on desktop; the hero fills the first screen and is centred.
- **Colour means role**: green Operations, blue Support, red Sales, yellow Finance & admin.
- **Sherpie** peeks over the hero card and the footer; its eyes follow the pointer; poke it for a line.
- **Honesty**: every demo is labelled illustrative; nothing pretends to be a live agent. No "100x" claim until we can back one.
- **House rules**: no em dashes (a test enforces it); respect reduced motion; no horizontal scrolling.
- **Analytics**: Google Analytics 4, off until `VITE_GA_ID` is set. Events: `talk_to_amit` (key event, tagged with the section), `hand_over_job`, `approve_draft`, `why_question`, `trap_slider`, `computer_app`, `plate_cleared`, `gateway_opened`, `climb_summit`. Nothing a visitor types is sent.

## 4. Repository history

- 5 Oct 2026: the repo was rebuilt from scratch on `feature/summit`. Every component of the old designs was removed.
- 5 Oct 2026: Eigi Play became the final site on `feature/eigi-play`; the Summit page was archived as `archive/summit`.
- 5 Oct 2026: reorganised the source to follow Agent360's landing-page folder conventions, preserving the TypeScript/CSS Modules stack, page content and behaviour.
- Old designs are archived as tags, not branches: `archive/ascent` (old `main`, "The Ascent"), `archive/eigi-computer`, `archive/sherpie`, `archive/summit`. Check one out with `git checkout archive/summit` if you ever need it.

## 5. Key facts and links

| | |
|---|---|
| Documentation | https://docs.eigi.ai/ |
| Studio | https://studio.eigi.ai/ (**confirm**) |
| Contact | buddy@eigi.ai |
| Amit (AI onboarding agent on WhatsApp) | +91 92252 99611 |
| Content source | https://eigi-landing.vercel.app |

## 6. Open items before launch

- [ ] Review and merge `feature/eigi-play` into `main`, then deploy.
- [ ] Create the GA4 property under a company Google account and set `VITE_GA_ID` in the host.
- [ ] Prerender the page at build time so search engines and link previews see content without JavaScript.
- [ ] A proper social sharing image (1200×630) instead of the favicon.
- [ ] Real customer stories beyond the two field notes; the Slack and job examples are illustrative.
- [ ] Exact report URLs for the Census and MIT statistics.
- [ ] Confirm the Studio URL; test every Amit WhatsApp link from a real phone.
- [ ] Privacy, Terms and Data deletion pages (footer links point to the top for now).
- [ ] An accessibility pass and a Lighthouse check.
