# Design: GSAP + React Router Framework Mode Migration

- **Date:** 2026-09-03
- **Status:** Approved (no commit)
- **Scope:** Entire current SPA

## Context

Current state of the codebase:

- Animations use `motion` (framer-motion) in **15 files**: `App.tsx`, `Header` (+ Body/Image/Nav/Footer), `Hero`, `Preloader`, `Showcase` (+ morphing-dialog), and UI components (circular-text, highlighter, magnetic, RoundedButton, scroll-progress, shiny-button, sparkle).
- `gsap`, `@gsap/react`, and `lenis` are already in `package.json`. The `SmoothScroll.tsx` component (lenis/react + ScrollTrigger) exists but is unused.
- `App.tsx` manually initializes Lenis (raf loop + `setLenisInstance`), in parallel with the SmoothScroll component.
- No routing; all code lives in `App.tsx`.
- The `src/components/pages/CreateYourDream/` directory structure already exists (Header/Body, Header/Footer, Header/Image, Header/Nav, Hero, Contact, Feedback, Footer) — missing `Showcase` and `Preloader`.

## Approved design decisions

1. **Remove `motion` entirely**, migrating everything to GSAP; finish with `npm uninstall motion`.
2. **Morphing dialog** uses the **GSAP Flip** plugin + manually managed mount/unmount state.
3. **React Router Framework mode** (similar to Next.js App Router), SPA mode (`ssr: false`), `appDirectory: "src"`.
4. **SmoothScroll (Lenis) global** in the root layout, wrapping `<Outlet/>`.

## 1. Router setup

```text
project/
├── react-router.config.ts   # ssr: false, appDirectory: "src"
├── vite.config.ts           # add reactRouter() plugin
└── src/
    ├── routes.ts            # defineRoutes: "/" → _index.tsx, "/CreateYourDream" → create-your-dream.tsx
    ├── root.tsx             # replaces main.tsx: imports index.css, Layout + Outlet + ScrollRestoration
    ├── routes/
    │   ├── _index.tsx            → /  (placeholder, reserved for new code)
    │   └── create-your-dream.tsx → /CreateYourDream (current code, page composing components)
    └── components/pages/CreateYourDream/
        ├── Header/{Body,Footer,Image,Nav}   (folders already exist)
        ├── Hero, Contact, Feedback, Footer  (folders already exist)
        ├── Showcase/                         (create new)
        └── Preloader/                        (create new)
```

- The framework mode's default `src/entry.client.tsx` entry is used (client-only render since ssr:false); `main.tsx` is deleted.
- Preloader logic (setLoading after 2s, scroll to top) moves into the `create-your-dream.tsx` route.

## 2. SmoothScroll (Lenis global)

- `<SmoothScroll>` wraps `<Outlet/>` in `root.tsx`.
- `SmoothScroll.tsx` improvements:
    - `gsap.ticker.add((time) => lenis.raf(time * 1000))` — Lenis driven by the GSAP ticker
    - `lenis.on('scroll', ScrollTrigger.update)`
    - `gsap.ticker.lagSmoothing(0)`
- Remove all manual Lenis code from the old App (`setLenisInstance`, raf loop).
- The `useSmoothScroll` hook switches to `useLenis` from `lenis/react`; delete the old `use-lenis.ts` module state.

## 3. Motion → GSAP (15 files)

| Group               | Files                                                                                       | Conversion approach                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Scroll-linked       | Hero, Showcase                                                                              | `ScrollTrigger` + scrubbed timelines; scroll progress via ScrollTrigger instead of `useScroll`/`useTransform` |
| Enter/exit          | Preloader                                                                                   | GSAP timeline + `onComplete`; exit animation via a two-phase sequence replacing `AnimatePresence`             |
| Shared layout       | morphing-dialog                                                                             | GSAP Flip plugin + manually managed mount/unmount state                                                       |
| Show/hide on scroll | Header + Body/Image/Nav/Footer                                                              | ScrollTrigger + `gsap.quickTo` / timelines                                                                    |
| Micro-interactions  | magnetic, sparkle, circular-text, shiny-button, RoundedButton, highlighter, scroll-progress | `useGSAP` hook (`@gsap/react`); scroll-progress uses `ScrollTrigger.create({ onUpdate })`                     |

Finally: `npm uninstall motion`, register the `Flip` plugin.

## 4. Testing & verification

- `npm run build` (`tsc -b` + vite) passes; no `motion/` imports remain in `src/`.
- Manual checks: `/CreateYourDream` renders with preloader + scroll animations as before; `/` shows the placeholder; navigating between the two routes does not break ScrollTrigger (cleanup via `useGSAP` context).
- No commits per user request — all changes stay in the working directory.
