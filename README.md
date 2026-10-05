# Eigi landing

Marketing site for [eigi.ai](https://eigi.ai), built with React 19, Vite 8, TypeScript and [Motion](https://motion.dev).

The page tells one story for early-stage founders: **Everyone sold you AI. Nobody showed you how.** It leads with Eigi Computer (your AI team, shown working live in Slack), then walks from empathy (sound familiar, the problem) to what Eigi is, how your Eigi works, the hire you're putting off, the sherpas, field notes, the founders and the FAQ, and closes with Amit on WhatsApp.

## Run it locally

You need **Node.js 20.19+ or 22.12+** (Vite 8's minimum).

```sh
npm install
npm run dev
```

Then open <http://localhost:5173/>. Edits hot-reload.

## Scripts

| Command           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                          |
| `npm run build`   | Type-check, then build the site into `dist/`                  |
| `npm run preview` | Serve the built `dist/` locally to check the production build |
| `npm test`        | Run the unit tests (Vitest)                                   |
| `npm run lint`    | Lint with oxlint                                              |

Run `npm run lint && npm test && npm run build` before opening a PR.

## Project layout

```text
index.html                 entry HTML, SEO and social tags → src/app/main.tsx
public/favicon.jpg         Eigi app icon, served as-is
design/                    the approved design as a single static file, for reference
src/
  app/                     main.tsx mounts App; App.tsx holds app-wide setup (MotionConfig, pointer-following eyes)
  pages/HomePage.tsx       "/": the sections in order, no logic of its own
  sections/                one file per section, each with a scoped *.module.css
  features/
    slack-demo/            Eigi Computer in Slack: window UI, scene player hook, pure thread logic (tested)
    job-runner/            "Before you hire for it": roles, jobs and the four-stage runner (tested)
  components/
    brand/                 Logo, Sherpie, Mascot (the four AI roles and the sherpa)
    layout/                Nav, Footer
    ui/                    Heading, RichText
  content/                 ALL page copy, as typed data. Edit text here, never in components.
  lib/                     framework-free helpers: crew colours, Amit WhatsApp links, motion presets, rich text
  styles/                  tokens.css (colours, fonts, sizes) and global.css (reset, type, buttons)
  assets/                  logo and founder photos, bundled by Vite
```

### Where things go

- **Changing words** on the page: edit the matching file in `src/content/`. A test fails if copy contains an em dash, so keep to commas, colons and full stops.
- **A new section**: add `src/sections/Name.tsx` + `Name.module.css`, put its copy in `src/content/`, and place it in `pages/HomePage.tsx`.
- **Interactive logic** (players, state machines): a feature folder under `src/features/`, with the pure parts in a `.ts` file and a colocated `*.test.ts`.
- **Colours and fonts**: only through the tokens in `src/styles/tokens.css`. Crew colours mean "who is doing this job" (blue: Chief of Staff, red: Sales, yellow: Marketing, green: Operations).

### Motion

Animations use `motion/react` and respect the visitor's reduced-motion setting. Content is never hidden waiting for an animation: things rise into place, they don't fade in from nothing. Demos (Slack, job runner) auto-play once when they first scroll into view, then the visitor is in charge.

## Deploy

`npm run build` writes a fully static site to `dist/`. Any static host works (Vercel, Netlify) with no server or rewrites.
