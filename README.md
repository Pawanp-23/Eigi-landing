# Eigi landing

Marketing site for [eigi.ai](https://eigi.ai), built with React 19, Vite 8 and TypeScript.

The page is **The Ascent**: one scroll from base camp (0 m) to the summit (8,848 m). Along the way it shows why AI adoption stalls, where Eigi stands against the alternatives, and the four camps of an Eigi engagement.

## Run it locally

You need **Node.js 20.19+ or 22.12+** (Vite 8's minimum).

```sh
npm install
npm run dev
```

Then open <http://localhost:5173/>. Edits hot-reload.

## Scripts

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                                 |
| `npm run build`   | Type-check, then build the site into `dist/`                         |
| `npm run preview` | Serve the built `dist/` locally to check the production build        |
| `npm test`        | Run the unit tests (Vitest)                                          |
| `npm run lint`    | Lint with oxlint                                                     |

Run `npm run lint && npm test && npm run build` before opening a PR.

## Deploy

`npm run build` writes a fully static site to `dist/`. Any static host works (Vercel, Netlify, S3 + CloudFront, GitHub Pages) and needs no server or rewrites.

## Project layout

The code follows the Eigi frontend standards: a thin page composes feature components, and shared pieces live outside the feature.

```text
index.html                   entry HTML → src/main.tsx
public/favicon.jpg           favicon, served as-is
src/
  main.tsx                   mounts the app; app-wide providers (MotionConfig: respect reduced motion)
  pages/HomePage.tsx         "/": lays out the sections, no logic of its own
  features/landing/          everything specific to The Ascent
    index.ts                 the feature's public surface (what pages may import)
    components/              one component per section, each with a scoped *.module.css
    hooks/                   browser work: crowd canvas + animation loop, cursor-following sherpa
    utils/                   pure logic: crowd simulation (unit-tested), sprite-sheet helpers
  components/layout/Nav.tsx  shared nav: logo + CTA
  styles/global.css          design tokens, reset, type scale, shared classes (.eyebrow, .lead, .btn, .mono)
  styles/motion.ts           motion presets (the scroll-reveal fade-up)
  utils/                     framework-free helpers (clamp/lerp/colour mix, contour paths, cx)
  assets/                    logo and the Open Peeps sprite, bundled by Vite
```

Page colours are CSS variables (`--bg`, `--fg`, `--muted`, `--line`, `--accent`) defined in `src/styles/global.css`. As you scroll, `Atmosphere.tsx` changes them, flipping the page from white to black near the summit. Anything coloured with them, including the nav logo, follows along.

Scroll-driven effects use [`motion`](https://motion.dev) (`useScroll`, `useTransform`, `whileInView`).

### Where new code goes

- **A new section** goes in `features/landing/components/`. Export it from `features/landing/index.ts` and place it in `pages/HomePage.tsx`.
- **Listeners, timers, canvas or `requestAnimationFrame`** go in a hook under `features/landing/hooks/`, with cleanup, never inline in a component.
- **Pure logic** goes in `utils/`, with a colocated `*.test.ts`.
- **Something a second feature needs** moves up to `src/components/` (UI) or `src/utils/` (logic).

## Credits

The base-camp crowd is adapted from Skiper UI "Skiper 39", which requires attribution on the free tier. That was itself inspired by [codepen.io/zadvorsky/pen/xxwbBQV](https://codepen.io/zadvorsky/pen/xxwbBQV). Illustrations are from [Open Peeps](https://openpeeps.com) (CC0).
