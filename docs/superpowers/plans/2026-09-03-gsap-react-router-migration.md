# GSAP + React Router Framework Mode Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the entire SPA from `motion` to GSAP, adopt React Router Framework mode (file-based routing, SPA), and make Lenis smooth scrolling global via the root layout.

**Architecture:** React Router v7 Framework mode with `ssr: false` and `appDirectory: "src"`. `root.tsx` wraps `<Outlet/>` in a global `<SmoothScroll>` (Lenis driven by the GSAP ticker). The current single-page composition moves to route `/CreateYourDream` (components under `src/components/pages/CreateYourDream/`); `/` is a placeholder reserved for new code. All `motion/react` usage is rewritten with GSAP core + ScrollTrigger + Flip + `useGSAP`.

**Tech Stack:** React 19, Vite 7, TypeScript, React Router v7 (framework mode), GSAP 3 + `@gsap/react` + ScrollTrigger + Flip, Lenis (`lenis/react`), Tailwind CSS 4, SCSS modules.

**Spec:** `docs/superpowers/specs/2026-09-03-gsap-react-router-migration-design.md`

## Global Constraints

- **NO COMMITS.** The user explicitly forbade committing. All changes stay in the working directory. There are no "Commit" steps in this plan — every task ends with a verification step instead.
- No test framework exists in this repo. Verification = `npm run build` (tsc + vite), targeted `grep`, and `npm run dev` manual checks.
- Preserve all existing Vietnamese/French UI copy and visual behavior as closely as possible; noted simplifications are explicit.
- Keep the `@/*` → `src/*` path alias everywhere.
- Keep en dashes (–) not em dashes (—) in any copy.
- Never import from `motion/react` after Task 9 completes; `motion` must be uninstalled.
- GSAP plugins must be registered before use: `gsap.registerPlugin(ScrollTrigger)` / `gsap.registerPlugin(Flip, useGSAP)` at module top of each file that uses them.

---

### Task 1: React Router Framework mode setup

**Files:**

- Create: `react-router.config.ts`
- Modify: `vite.config.ts`
- Create: `src/root.tsx`
- Create: `src/routes.ts`
- Create: `src/routes/_index.tsx`
- Create: `src/routes/create-your-dream.tsx`
- Delete: `src/main.tsx`, `index.html`, `src/App.tsx`

**Interfaces:**

- Consumes: existing components at their current paths (`@/components/Header`, `@/components/Hero`, `@/components/Showcase`, `@/components/Feedback`, `@/components/Contact`, `@/components/Footer`, `@/components/Preloader`, `@/components/ui/scroll-progress`), `@/store/loading-store`, `@/components/common/SmoothScroll`.
- Produces: route `/` → `src/routes/_index.tsx` (placeholder); route `/CreateYourDream` → `src/routes/create-your-dream.tsx` (current app). Later tasks rewrite imports inside `create-your-dream.tsx`.

- [ ] **Step 1: Install dependencies**

```bash
npm install react-router
npm install -D @react-router/dev
```

- [ ] **Step 2: Create `react-router.config.ts`**

```ts
import type { Config } from '@react-router/dev/config';

export default {
    ssr: false,
    appDirectory: 'src',
} satisfies Config;
```

- [ ] **Step 3: Update `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRouter from '@react-router/dev/vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [reactRouter(), react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

- [ ] **Step 4: Create `src/root.tsx`** (replaces `main.tsx`; framework mode needs the full document shell here — `index.html` is no longer used)

```tsx
import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import SmoothScroll from '@/components/common/SmoothScroll';
import './index.css';

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function Root() {
    return (
        <SmoothScroll>
            <Outlet />
        </SmoothScroll>
    );
}
```

- [ ] **Step 5: Create `src/routes.ts`**

```ts
import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
    route('/', 'routes/_index.tsx'),
    route('/CreateYourDream', 'routes/create-your-dream.tsx'),
] satisfies RouteConfig;
```

- [ ] **Step 6: Create `src/routes/_index.tsx`** (placeholder reserved for future code)

```tsx
export default function Index() {
    return (
        <div className="grid min-h-dvh place-items-center">
            <h1 className="font-bodoni text-4xl font-semibold">Home 𝜗ৎ</h1>
        </div>
    );
}
```

- [ ] **Step 7: Create `src/routes/create-your-dream.tsx`** — the current `App.tsx` composition with the manual Lenis block **removed** (root `SmoothScroll` now owns Lenis). Note: `useSmoothScroll` falls back to native smooth scroll until Task 2 rewrites it. Keep `motion` code as-is for now (Hero/Showcase still take `scrollYProgress`).

```tsx
import { AnimatePresence, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import { useLoadingStore } from '@/store/loading-store';
import Preloader from '@/components/Preloader';
import Contact from '@/components/Contact';
import Feedback from '@/components/Feedback';
import { cn } from '@/lib/utils';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import Footer from '@/components/Footer';

export default function CreateYourDream() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const container = useRef<HTMLDivElement>(null);
    const { isLoading, setLoading } = useLoadingStore();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [setLoading]);

    return (
        <main>
            <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
            <ScrollProgress className="top-0" />
            <Header />
            <div
                ref={container}
                className={cn('relative', isDesktop ? 'h-[200dvh]' : 'min-h-[200dvh]')}
            >
                <Hero scrollYProgress={scrollYProgress} />
                <Showcase scrollYProgress={scrollYProgress} />
            </div>
            <Feedback />
            <Contact />
            <Footer />
        </main>
    );
}
```

- [ ] **Step 8: Delete old entry files**

```bash
rm src/main.tsx index.html src/App.tsx
```

(`src/App.css` is currently imported by nothing — delete it too.)

- [ ] **Step 9: Verify**

Run: `npm run build` — expected: passes (tsc + vite).
Run: `npm run dev` — expected: `/` shows the placeholder; `/CreateYourDream` renders the full page with preloader and scrolling works (smooth scroll comes from root `SmoothScroll`).

---

### Task 2: SmoothScroll + GSAP ticker bridge + rewrite `use-lenis.ts`

**Files:**

- Modify: `src/components/common/SmoothScroll.tsx`
- Rewrite: `src/hooks/use-lenis.ts`

**Interfaces:**

- Produces: `<SmoothScroll>` (already mounted in `root.tsx`) — Lenis instance driven by GSAP ticker with `autoRaf: false`. `useSmoothScroll(target: string)` returns a click handler `(e: React.MouseEvent<HTMLAnchorElement>) => void` (same signature as before — `Body` and page `Footer` keep working unchanged).

- [ ] **Step 1: Rewrite `src/components/common/SmoothScroll.tsx`**

```tsx
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function LenisGsapBridge() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        lenis.on('scroll', ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000); // gsap.ticker time is seconds; lenis.raf expects ms
        };
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500);
            lenis.off('scroll', ScrollTrigger.update);
        };
    }, [lenis]);

    return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, autoRaf: false }}>
            <LenisGsapBridge />
            {children}
        </ReactLenis>
    );
}
```

- [ ] **Step 2: Rewrite `src/hooks/use-lenis.ts`** (module-level instance state goes away; delete `setLenisInstance`/`useLenis` exports — nothing else imports them after Task 1 removed the App usage)

```ts
import { useLenis } from 'lenis/react';

export function useSmoothScroll(target: string) {
    const lenis = useLenis();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (lenis) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return handleClick;
}
```

- [ ] **Step 3: Verify**

Run: `grep -rn "setLenisInstance\|lenisInstance" src/` — expected: no matches.
Run: `npm run build` — expected: passes.
Run: `npm run dev` — expected: `/CreateYourDream` smooth scroll still works; footer/menu anchor links scroll smoothly to sections; no double-speed or janky scrolling (confirms only one Lenis instance is running).

---

### Task 3: Move page components into `src/components/pages/CreateYourDream/`

**Files:**

- Move: `src/components/Header` → `src/components/pages/CreateYourDream/Header`
- Move: `src/components/Hero` → `src/components/pages/CreateYourDream/Hero`
- Move: `src/components/Showcase` → `src/components/pages/CreateYourDream/Showcase`
- Move: `src/components/Preloader` → `src/components/pages/CreateYourDream/Preloader`
- Move: `src/components/Contact` → `src/components/pages/CreateYourDream/Contact`
- Move: `src/components/Feedback` → `src/components/pages/CreateYourDream/Feedback`
- Move: `src/components/Footer` → `src/components/pages/CreateYourDream/Footer`
- Modify: `src/components/pages/CreateYourDream/Header/Nav/index.tsx` (Footer import path)
- Modify: `src/components/pages/CreateYourDream/Contact/index.tsx` (RoudedButton import path)
- Modify: `src/routes/create-your-dream.tsx` (component import paths)

(`Header/Body`, `Header/Footer`, `Header/Image`, `Header/Nav` folders already exist empty inside `pages/CreateYourDream/Header/` — the `mv` fills them. `components/ui/*` stays where it is: those are shared primitives.)

**Interfaces:**

- Produces: page components importable from `@/components/pages/CreateYourDream/<Name>`; `@/components/Header`, `@/components/Hero`, etc. no longer exist.

- [ ] **Step 1: Move directories (plain `mv`, do NOT `git mv` — no staging)**

```bash
cd src/components
mv Header pages/CreateYourDream/Header
mv Hero pages/CreateYourDream/Hero
mv Showcase pages/CreateYourDream/Showcase
mv Preloader pages/CreateYourDream/Preloader
mv Contact pages/CreateYourDream/Contact
mv Feedback pages/CreateYourDream/Feedback
mv Footer pages/CreateYourDream/Footer
```

- [ ] **Step 2: Fix `Header/Nav/index.tsx` import**

Change:

```ts
import Footer from '@/components/Header/Footer';
```

to:

```ts
import Footer from '../Footer';
```

- [ ] **Step 3: Fix `Contact/index.tsx` import**

Change:

```ts
import RoudedButton from '../ui/RoudedButton';
```

to:

```ts
import RoudedButton from '@/components/ui/RoudedButton';
```

- [ ] **Step 4: Update `src/routes/create-your-dream.tsx` imports**

```ts
import Header from '@/components/pages/CreateYourDream/Header';
import Hero from '@/components/pages/CreateYourDream/Hero';
import Showcase from '@/components/pages/CreateYourDream/Showcase';
import Preloader from '@/components/pages/CreateYourDream/Preloader';
import Contact from '@/components/pages/CreateYourDream/Contact';
import Feedback from '@/components/pages/CreateYourDream/Feedback';
import Footer from '@/components/pages/CreateYourDream/Footer';
```

- [ ] **Step 5: Verify**

Run: `grep -rn "@/components/Header\|@/components/Hero\|@/components/Showcase\|@/components/Preloader\|@/components/Contact\|@/components/Feedback\|@/components/Footer\b" src/` — expected: no matches.
Run: `npm run build` — expected: passes.
Run: `npm run dev` — expected: `/CreateYourDream` renders identically.

---

### Task 4: Convert Preloader to GSAP

**Files:**

- Rewrite: `src/components/pages/CreateYourDream/Preloader/index.tsx`
- Modify: `src/routes/create-your-dream.tsx` (mount/unmount contract)

**Interfaces:**

- Consumes: `@/store/loading-store` (`isLoading`, `setLoading`).
- Produces: `<Preloader onExitComplete={() => void} />` — the component plays its own enter + exit timeline and calls `onExitComplete` when done; the route then unmounts it via the store. No `AnimatePresence` anywhere.

- [ ] **Step 1: Rewrite `Preloader/index.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Preloader.module.scss';

gsap.registerPlugin(useGSAP);

const words = [
    'Xin chào',
    'Hello',
    'Bonjour',
    'Ciao',
    'Olà',
    'やあ',
    'Hallå',
    'Guten tag',
    'Hallo',
];

export default function Preloader({ onExitComplete }: { onExitComplete: () => void }) {
    const [index, setIndex] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLParagraphElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const [dimension] = useState(() => {
        if (typeof window !== 'undefined') {
            return { width: window.innerWidth, height: window.innerHeight };
        }
        return { width: 0, height: 0 };
    });

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(
            () => {
                setIndex(index + 1);
            },
            index == 0 ? 1000 : 150
        );
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    useGSAP(
        () => {
            if (dimension.width === 0) return;

            // enter: fade the word in
            gsap.fromTo(
                wordRef.current,
                { opacity: 0 },
                { opacity: 0.75, duration: 1, delay: 0.2 }
            );

            // exit: morph the curve, slide the whole overlay up, then report done
            const tl = gsap.timeline({ delay: 2 });
            tl.to(pathRef.current, {
                attr: { d: targetPath },
                duration: 0.7,
                ease: 'power3.inOut',
            })
                .to(rootRef.current, { top: '-100vh', duration: 0.8, ease: 'power3.inOut' }, 0.3)
                .call(onExitComplete);
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className={styles.introduction}>
            {dimension.width > 0 && (
                <>
                    <p ref={wordRef}>
                        <span></span>
                        {words[index]}
                    </p>
                    <svg>
                        <path ref={pathRef} d={initialPath}></path>
                    </svg>
                </>
            )}
        </div>
    );
}
```

Notes: `top` is animated positionally — verify `Preloader.module.scss` positions `.introduction` with `position: fixed/absolute; top: 0` (it already does; if it uses `inset` shorthand, add an explicit `top: 0`). The `attr: { d }` tween morphs the SVG path exactly like the old variants.

- [ ] **Step 2: Update `src/routes/create-your-dream.tsx`** — replace the `AnimatePresence` block and drop the motion import:

Remove `import { AnimatePresence, useScroll } from 'motion/react';` and replace the render of the preloader:

```tsx
{
    isLoading && <Preloader onExitComplete={() => setLoading(false)} />;
}
```

Keep the rest of the route untouched in this task (the `useScroll` block stays until Task 6).

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: passes.
Run: `npm run dev`, open `/CreateYourDream` — expected: words cycle as before; at ~2s the bottom curve morphs flat and the overlay slides up; the page is interactive afterwards; navigating away and back replays the preloader.

---

### Task 5: Convert Header menu (Header, Nav, Body, Image, Header/Footer) to GSAP

**Files:**

- Rewrite: `src/components/pages/CreateYourDream/Header/index.tsx`
- Rewrite: `src/components/pages/CreateYourDream/Header/Nav/index.tsx`
- Rewrite: `src/components/pages/CreateYourDream/Header/Body/index.tsx`
- Rewrite: `src/components/pages/CreateYourDream/Header/Image/index.tsx`
- Rewrite: `src/components/pages/CreateYourDream/Header/Footer/index.tsx`

**Interfaces:**

- Consumes: `useSmoothScroll` from `@/hooks/use-lenis` (unchanged signature).
- Produces: `<Nav isActive={boolean} onClosed={() => void} />` — two-phase close: Header flips `isActive` to `false`, Nav plays its exit timeline, then calls `onClosed` so Header unmounts it. `Header` no longer uses `AnimatePresence`.

- [ ] **Step 1: Rewrite `Header/index.tsx`**

```tsx
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Header.module.scss';
import Nav from './Nav';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
    const [isActive, setIsActive] = useState(false); // animation target
    const [navMounted, setNavMounted] = useState(false); // Nav in DOM
    const [hidden, setHidden] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const menuLabelRef = useRef<HTMLParagraphElement>(null);
    const closeLabelRef = useRef<HTMLParagraphElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // hide/show on scroll (replaces useScroll + useMotionValueEvent)
    useGSAP(() => {
        ScrollTrigger.create({
            start: 1,
            end: 'max',
            onEnter: () => setHidden(true),
            onLeaveBack: () => setHidden(false),
        });
    });

    useGSAP(
        () => {
            gsap.to(headerRef.current, {
                y: hidden && !isActive ? '-100%' : '0%',
                duration: 0.35,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [hidden, isActive] }
    );

    // Menu / Close label crossfade (replaces the `opacity` variants)
    useGSAP(
        () => {
            gsap.to(menuLabelRef.current, {
                opacity: isActive ? 0 : 1,
                y: isActive ? '-100%' : '0%',
                duration: 1,
                ease: 'power3.inOut',
            });
            gsap.to(closeLabelRef.current, {
                opacity: isActive ? 1 : 0,
                y: isActive ? '0%' : '-100%',
                duration: 1,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [isActive] }
    );

    // background curtain (replaces the `background` variants)
    useGSAP(
        () => {
            gsap.to(backgroundRef.current, {
                height: isActive ? '100vh' : 0,
                duration: 1,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [isActive] }
    );

    const openMenu = () => {
        setNavMounted(true);
        setIsActive(true);
    };

    const closeMenu = () => {
        setIsActive(false); // Nav plays its exit, then calls handleNavClosed
    };

    const handleNavClosed = () => {
        setNavMounted(false);
    };

    return (
        <div ref={headerRef} className={styles.header}>
            <div ref={barRef} className={styles.bar}>
                <a href="/">With Au Daily</a>

                <div
                    onClick={() => {
                        isActive ? closeMenu() : openMenu();
                    }}
                    className={styles.el}
                >
                    <div
                        className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
                    ></div>

                    <div className={styles.label}>
                        <p ref={menuLabelRef}>Menu</p>
                        <p ref={closeLabelRef}>Close</p>
                    </div>
                </div>
            </div>
            {navMounted && <Nav isActive={isActive} onClosed={handleNavClosed} />}
            <div ref={backgroundRef} className={styles.background}></div>
        </div>
    );
}
```

Note: the two `<p>` labels previously overlapped via motion variants — check `Header.module.scss`; if the labels were stacked by motion (absolute/flex overlap), ensure the same stacking exists in CSS so they crossfade in place.

- [ ] **Step 2: Rewrite `Header/Nav/index.tsx`** (two-phase enter/exit; replaces the `height` variants and `AnimatePresence` in the old Header)

```tsx
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Nav.module.scss';
import Body from '../Body';
import Image from '../Image';
import Footer from '../Footer';
import menu1Img from '@/assets/images/menu1.jpg';
import menu2Img from '@/assets/images/menu2.jpg';
import menu3Img from '@/assets/images/menu3.jpg';
import menu4Img from '@/assets/images/menu4.jpg';

gsap.registerPlugin(useGSAP);

const links = [
    {
        title: 'Study and beauty',
        href: '#study-and-beauty',
        src: menu1Img,
    },
    {
        title: 'Art study',
        href: '#art-study',
        src: menu2Img,
    },
    {
        title: 'From a friend',
        href: '#from-a-friend',
        src: menu3Img,
    },
    {
        title: 'Quiet becoming better',
        href: '#quiet-becoming-better',
        src: menu4Img,
    },
];

export default function Nav({ isActive, onClosed }: { isActive: boolean; onClosed: () => void }) {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const hasOpened = useRef(false);

    useGSAP(
        () => {
            if (isActive) {
                hasOpened.current = true;
                gsap.fromTo(
                    navRef.current,
                    { height: 0 },
                    { height: 'auto', duration: 1, ease: 'power3.inOut' }
                );
            } else if (hasOpened.current) {
                gsap.to(navRef.current, {
                    height: 0,
                    duration: 1,
                    ease: 'power3.inOut',
                    onComplete: onClosed,
                });
            }
        },
        { dependencies: [isActive] }
    );

    return (
        <div ref={navRef} className={styles.nav} style={{ height: 0, overflow: 'hidden' }}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body
                        links={links}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                    />
                    <Footer />
                </div>
                <Image src={links[selectedLink.index].src} selectedLink={selectedLink} />
            </div>
        </div>
    );
}
```

Note: `Nav.module.scss` may already set `overflow: hidden`; the inline style is a safe explicit default. Remove the inline `height: 0` if the module stylesheet conflicts.

- [ ] **Step 3: Rewrite `Header/Body/index.tsx`** (char stagger on mount; blur on unselected links; `setIsActive` prop removed — menu close is owned by Header)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Body.module.scss';
import type { JSX } from 'react';
import { useSmoothScroll } from '@/hooks/use-lenis';

gsap.registerPlugin(useGSAP);

type BodyProps = {
    links: {
        title: string;
        href: string;
        src: string;
    }[];
    selectedLink: { isActive: boolean; index: number };
    setSelectedLink: (link: { isActive: boolean; index: number }) => void;
};

export default function Body({ links, selectedLink, setSelectedLink }: BodyProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    // char stagger on mount (replaces the `translate` variants with custom delays)
    useGSAP(
        () => {
            gsap.fromTo(
                `.${styles.body} p span`,
                { y: '100%', opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.inOut',
                    stagger: (i: number, el: HTMLElement, list: HTMLElement[]) => {
                        const wordIndex = Math.floor(Array.from(list).indexOf(el) / 2);
                        return wordIndex * 0.1;
                    },
                }
            );
        },
        { scope: rootRef }
    );

    // blur non-selected links on hover (replaces the `blur` variants)
    useGSAP(
        () => {
            const paragraphs = rootRef.current?.querySelectorAll(`.${styles.body} > a > p`);
            if (!paragraphs) return;
            paragraphs.forEach((p, index) => {
                gsap.to(p, {
                    filter:
                        selectedLink.isActive && selectedLink.index != index
                            ? 'blur(4px)'
                            : 'blur(0px)',
                    opacity: selectedLink.isActive && selectedLink.index != index ? 0.6 : 1,
                    duration: 0.3,
                });
            });
        },
        { dependencies: [selectedLink], scope: rootRef }
    );

    const scrollHandlers = [
        useSmoothScroll(links[0].href),
        useSmoothScroll(links[1].href),
        useSmoothScroll(links[2].href),
        useSmoothScroll(links[3].href),
    ];

    const getChars = (word: string) => {
        const chars: JSX.Element[] = [];
        word.split('').forEach((char, i) => {
            chars.push(<span key={char + i}>{char}</span>);
        });
        return chars;
    };

    return (
        <div ref={rootRef} className={styles.body}>
            {links.map((link, index) => {
                const { title, href } = link;

                return (
                    <a
                        key={`l_${index}`}
                        href={href}
                        onClick={(e) => {
                            scrollHandlers[index](e);
                        }}
                    >
                        <p
                            onMouseOver={() => {
                                setSelectedLink({ isActive: true, index });
                            }}
                            onMouseLeave={() => {
                                setSelectedLink({ isActive: false, index });
                            }}
                        >
                            {getChars(title)}
                        </p>
                    </a>
                );
            })}
        </div>
    );
}
```

- [ ] **Step 4: Rewrite `Header/Image/index.tsx`**

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Image.module.scss';

gsap.registerPlugin(useGSAP);

export default function Image({
    src,
    selectedLink,
}: {
    src: string;
    selectedLink: { isActive: boolean };
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.to(containerRef.current, {
                opacity: selectedLink.isActive ? 1 : 0,
                duration: 0.35,
            });
        },
        { dependencies: [selectedLink.isActive], scope: containerRef }
    );

    return (
        <div ref={containerRef} className={styles.imageContainer} style={{ opacity: 0 }}>
            <img src={src} alt="image" />
        </div>
    );
}
```

- [ ] **Step 5: Rewrite `Header/Footer/index.tsx`** (menu footer — slide-in on mount)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Footer.module.scss';

gsap.registerPlugin(useGSAP);

export default function Footer() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                `.${styles.footer} li`,
                { y: '100%', opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.inOut' }
            );
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className={styles.footer}>
            <ul>
                <li>
                    <span>Creative Director:</span> Âu Vân
                </li>
            </ul>
            <ul>
                <li>
                    <span>Creative Developer:</span>{' '}
                    <a
                        href="https://github.com/dokkazy/with-au-daily"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Công Huy
                    </a>
                </li>
            </ul>
        </div>
    );
}
```

- [ ] **Step 6: Verify**

Run: `npm run build` — expected: passes.
Run: `grep -rn "motion/react" src/components/pages/CreateYourDream/Header/` — expected: no matches.
Run: `npm run dev` — expected: header hides after scrolling down and returns at top; burger opens the menu with height animation + char stagger; hovering a menu link blurs the others and swaps the preview image; closing the menu animates the height back to 0 and unmounts; scroll-to-section links work.

---

### Task 6: Convert Hero + Showcase scroll-linked animation to ScrollTrigger

**Files:**

- Rewrite: `src/components/pages/CreateYourDream/Hero/index.tsx`
- Rewrite: `src/components/pages/CreateYourDream/Showcase/index.tsx` (outer animation only — the dialog inside is Task 7)
- Modify: `src/routes/create-your-dream.tsx` (add `id="page-scroll"` to the container, drop `useScroll`, drop props)

**Interfaces:**

- Consumes: the route's scroll container marked with `id="page-scroll"` (200dvh) — both components attach their ScrollTrigger to that selector so the animation progress matches the old single `scrollYProgress` across the whole container (`offset ['start start', 'end end']`).
- Produces: `<Hero />` and `<Showcase />` take **no props**.

- [ ] **Step 1: Rewrite `Hero/index.tsx`**

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import { ShinyButton } from '@/components/ui/shiny-button';
import auImg from '@/assets/images/au-img.jpg';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isDesktop) return;
            gsap.fromTo(
                stickyRef.current,
                { scale: 1, rotate: 0 },
                {
                    scale: 0.8,
                    rotate: -5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#page-scroll',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                    },
                }
            );
        },
        { dependencies: [isDesktop], scope: sectionRef }
    );

    return (
        <section id="study-and-beauty" ref={sectionRef}>
            <div className={cn('w-full', isDesktop ? 'sticky top-0 h-dvh' : 'mb-24 min-h-dvh')}>
                <div className="xl:max-w-8xl relative container mx-auto px-4 pt-24 sm:px-8 md:px-16 lg:max-w-7xl">
                    <div className="grid h-full w-full place-items-center gap-12 lg:grid-cols-2 lg:gap-6">
                        {/* Content - Left Column */}
                        <div className="flex flex-col items-center justify-center space-y-4 text-black sm:space-y-6">
                            <h2 className="font-bodoni flex scroll-m-20 flex-col items-start text-4xl font-semibold tracking-tight first:mt-0 sm:text-5xl lg:text-7xl">
                                <span>STUDY</span>
                                <span>AND BEAUTY 𝜗ৎ</span>
                            </h2>
                            <p className="font-red-rose max-w-lg text-left text-base sm:text-lg md:text-xl">
                                Không gian nhỏ để bạn{' '}
                                <strong className="italic">get ready with your life</strong> 𝜗ৎ nơi
                                mỗi buổi sáng bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc
                                bằng việc tiến gần hơn đến ước mơ.
                            </p>
                            <ShinyButton className="font-red-rose rounded-4xl border-2 bg-white text-black">
                                Mindset vibes
                            </ShinyButton>
                        </div>

                        {/* Image - Right Column */}
                        <div className="flex items-center justify-center overflow-hidden lg:h-150 lg:w-100 xl:w-120">
                            <img
                                className="h-full w-full rounded-2xl object-cover"
                                src={auImg}
                                alt="Hero"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Rewrite the outer part of `Showcase/index.tsx`**

Keep the entire JSX body identical except: remove the `motion` import, the `scrollYProgress` prop and the two `useTransform` calls; change the outer `motion.div` to a plain `div`; add the ScrollTrigger below. (The `MorphingDialog*` imports and all showcase data stay as-is until Task 7.)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PlusIcon } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
// ... MorphingDialog imports unchanged ...
// ... image imports + showcaseData unchanged ...
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Showcase() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isDesktop) return;
            // original mapped rotate 1 -> 0 across the same container progress
            gsap.fromTo(
                rootRef.current,
                { rotate: 1 },
                {
                    rotate: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#page-scroll',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                    },
                }
            );
        },
        { dependencies: [isDesktop], scope: rootRef }
    );

    return (
        <div
            ref={rootRef}
            id="art-study"
            className={cn('relative min-h-dvh w-full bg-white', isDesktop ? '' : 'mb-24')}
        >
            {/* ...inner JSX unchanged... */}
        </div>
    );
}
```

- [ ] **Step 3: Update `src/routes/create-your-dream.tsx`**

Remove the `motion` import, the `useScroll` block, the `container` ref, and the props; add the id:

```tsx
<div id="page-scroll" className={cn('relative', isDesktop ? 'h-[200dvh]' : 'min-h-[200dvh]')}>
    <Hero />
    <Showcase />
</div>
```

- [ ] **Step 4: Verify**

Run: `npm run build` — expected: passes.
Run: `grep -rn "useScroll\|useTransform\|MotionValue" src/` — expected: only `morphing-dialog.tsx` may still reference motion internals (removed in Task 7).
Run: `npm run dev` — expected: on desktop the hero scales/rotates while scrolling through the 200dvh container; showcase section settles to rotate 0; mobile unaffected.

---

### Task 7: Convert morphing-dialog to GSAP Flip

**Files:**

- Rewrite: `src/components/pages/CreateYourDream/Showcase/morphing-dialog.tsx`
- Modify: `src/components/pages/CreateYourDream/Showcase/index.tsx` (drop the `transition` prop)

**Interfaces:**

- Consumes: `useClickOutside` from `@/hooks/useClickOutside` (unchanged).
- Produces: same exported component names: `MorphingDialog`, `MorphingDialogTrigger`, `MorphingDialogContainer`, `MorphingDialogContent`, `MorphingDialogClose`, `MorphingDialogTitle`, `MorphingDialogSubtitle`, `MorphingDialogDescription`, `MorphingDialogImage`. `MorphingDialog` no longer accepts a `transition` prop (GSAP durations are internal).

**Deliberate simplification vs motion:** the old `layoutId` shared-layout animation morphed the trigger's inner image/title into the dialog's inner image/title. With Flip, the morph is applied at the **container level** (trigger button → dialog content and back); inner elements enter/exit with a quick opacity/scale/y tween instead. This is the approved design decision (GSAP Flip + manual mount/unmount state).

- [ ] **Step 1: Rewrite `morphing-dialog.tsx`**

```tsx
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

gsap.registerPlugin(Flip);

export type MorphingDialogContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    uniqueId: string;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    backdropRef: React.RefObject<HTMLDivElement | null>;
};

const MorphingDialogContext = React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
    const context = useContext(MorphingDialogContext);
    if (!context) {
        throw new Error('useMorphingDialog must be used within a MorphingDialogProvider');
    }
    return context;
}

function MorphingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const isClosing = useRef(false);

    const open = useCallback(() => {
        isClosing.current = false;
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        const content = contentRef.current;
        const trigger = triggerRef.current;
        if (!content || !trigger || isClosing.current) {
            setIsOpen(false);
            return;
        }
        isClosing.current = true;

        // morph the content back into the trigger's bounds, then unmount
        const triggerState = Flip.getState(trigger);
        if (backdropRef.current) {
            gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' });
        }
        Flip.to(triggerState, {
            target: content,
            scale: true,
            duration: 0.25,
            ease: 'power1.in',
            onComplete: () => {
                isClosing.current = false;
                setIsOpen(false);
            },
        });
    }, []);

    const contextValue = useMemo(
        () => ({ isOpen, open, close, uniqueId, triggerRef, contentRef, backdropRef }),
        [isOpen, open, close, uniqueId]
    );

    return (
        <MorphingDialogContext.Provider value={contextValue}>
            {children}
        </MorphingDialogContext.Provider>
    );
}

export type MorphingDialogTriggerProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogTrigger({ children, className, style }: MorphingDialogTriggerProps) {
    const { open, isOpen, triggerRef, uniqueId } = useMorphingDialog();

    const handleClick = useCallback(() => open(), [open]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        },
        [open]
    );

    return (
        <button
            ref={triggerRef}
            className={cn('relative cursor-pointer', className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={style}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
            aria-label={`Open dialog ${uniqueId}`}
        >
            {children}
        </button>
    );
}

export type MorphingDialogContentProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogContent({ children, className, style }: MorphingDialogContentProps) {
    const { close, isOpen, triggerRef, contentRef, uniqueId } = useMorphingDialog();
    const containerRef = contentRef;
    const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(null);
    const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(null);

    // flip in from the trigger on mount
    useEffect(() => {
        const content = containerRef.current;
        const trigger = triggerRef.current;
        if (!content || !trigger) return;
        const state = Flip.getState(trigger);
        Flip.from(state, {
            target: content,
            scale: true,
            duration: 0.25,
            ease: 'power1.out',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
            if (event.key === 'Tab') {
                if (!firstFocusableElement || !lastFocusableElement) return;

                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close, firstFocusableElement, lastFocusableElement]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
            const focusableElements = containerRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFirstFocusableElement(focusableElements[0] as HTMLElement);
                setLastFocusableElement(
                    focusableElements[focusableElements.length - 1] as HTMLElement
                );
                (focusableElements[0] as HTMLElement).focus();
            }
        } else {
            document.body.classList.remove('overflow-hidden');
            triggerRef.current?.focus();
        }
    }, [isOpen, containerRef, triggerRef]);

    useClickOutside(containerRef, () => {
        if (isOpen) {
            close();
        }
    });

    return (
        <div
            ref={containerRef}
            className={cn('overflow-hidden', className)}
            style={style}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
            aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
        >
            {children}
        </div>
    );
}

export type MorphingDialogContainerProps = {
    children: React.ReactNode;
};

function MorphingDialogContainer({ children }: MorphingDialogContainerProps) {
    const { isOpen, backdropRef } = useMorphingDialog();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // backdrop fade-in
    useEffect(() => {
        if (isOpen && backdropRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.25, ease: 'power1.out' }
            );
        }
    }, [isOpen, backdropRef]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <>
            <div
                ref={backdropRef}
                className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur-xs dark:bg-black/40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">{children}</div>
        </>,
        document.body
    );
}

export type MorphingDialogTitleProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogTitle({ children, className, style }: MorphingDialogTitleProps) {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export type MorphingDialogSubtitleProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogSubtitle({ children, className, style }: MorphingDialogSubtitleProps) {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export type MorphingDialogDescriptionProps = {
    children: React.ReactNode;
    className?: string;
};

function MorphingDialogDescription({ children, className }: MorphingDialogDescriptionProps) {
    const ref = useRef<HTMLDivElement>(null);

    // enter animation (replaces the `variants` prop: initial/animate/exit)
    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(
            ref.current,
            { opacity: 0, scale: 0.8, y: 100 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power1.out' }
        );
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export type MorphingDialogImageProps = {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogImage({ src, alt, className, style }: MorphingDialogImageProps) {
    return <img src={src} alt={alt} className={cn(className)} style={style} />;
}

export type MorphingDialogCloseProps = {
    children?: React.ReactNode;
    className?: string;
};

function MorphingDialogClose({ children, className }: MorphingDialogCloseProps) {
    const { close } = useMorphingDialog();
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(
            ref.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out' }
        );
    }, []);

    return (
        <button
            ref={ref}
            onClick={close}
            type="button"
            aria-label="Close dialog"
            className={cn('absolute top-6 right-6', className)}
        >
            {children || <XIcon size={24} />}
        </button>
    );
}

export {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogTitle,
    MorphingDialogSubtitle,
    MorphingDialogDescription,
    MorphingDialogImage,
};
```

- [ ] **Step 2: Update `Showcase/index.tsx`** — remove the `transition={{ type: 'spring', bounce: 0.05, duration: 0.25 }}` prop from `<MorphingDialog>`:

```tsx
<MorphingDialog>
```

Also remove the now-invalid `disableLayoutAnimation` / `variants` props on `MorphingDialogDescription`:

```tsx
<MorphingDialogDescription>
```

- [ ] **Step 3: Verify**

Run: `npm run build` — expected: passes.
Run: `grep -rn "motion" src/components/pages/CreateYourDream/Showcase/` — expected: no matches.
Run: `npm run dev` — expected: clicking a card opens the dialog that visually grows out of the card; Escape/outside click/X closes it by shrinking back into the card; the page scrolls freely when closed and is locked while open; all three cards work independently.

---

### Task 8: Convert UI micro-interaction components to GSAP

**Files:**

- Rewrite: `src/components/ui/magnetic.tsx`
- Rewrite: `src/components/ui/RoudedButton/index.tsx`
- Rewrite: `src/components/ui/shiny-button.tsx`
- Rewrite: `src/components/ui/sparkle.tsx` (only the `Sparkle` sub-component's animation; state logic unchanged)
- Rewrite: `src/components/ui/circular-text.tsx`
- Rewrite: `src/components/ui/scroll-progress.tsx`
- Modify: `src/components/ui/highlighter.tsx` (replace `useInView` with IntersectionObserver — no GSAP needed)

**Interfaces:**

- Produces: identical component APIs except `ScrollProgress` loses its forwarded `ref` prop (nothing uses it — `App`/route render `<ScrollProgress className="top-0" />` only) and `SparklesText`'s `as` prop documentation stays as-is (unused).

- [ ] **Step 1: Rewrite `magnetic.tsx`**

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(
        () => {
            xTo.current = gsap.quickTo(ref.current, 'x', {
                duration: 0.4,
                ease: 'elastic.out(1, 0.4)',
            });
            yTo.current = gsap.quickTo(ref.current, 'y', {
                duration: 0.4,
                ease: 'elastic.out(1, 0.4)',
            });
        },
        { scope: ref }
    );

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || {};
        if (!height || !width || !left || !top) return;
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        xTo.current?.(middleX);
        yTo.current?.(middleY);
    };

    const reset = () => {
        xTo.current?.(0);
        yTo.current?.(0);
    };

    return (
        <div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </div>
    );
}
```

- [ ] **Step 2: Rewrite `RoudedButton/index.tsx`** (the enter→exit state machine becomes one timeline)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import styles from './Rouded.module.scss';
import Magnetic from '@/components/ui/magnetic';

export default function RoudedButton({
    children,
    backgroundColor = '#455CE9',
    ...attributes
}: {
    children: React.ReactNode;
    backgroundColor?: string;
}) {
    const circleRef = useRef<HTMLDivElement>(null);

    const manageMouseEnter = () => {
        gsap.timeline()
            .to(circleRef.current, {
                top: '-25%',
                width: '150%',
                duration: 0.4,
                ease: 'power3.in',
            })
            .to(circleRef.current, {
                top: '-150%',
                width: '125%',
                duration: 0.25,
                ease: 'power1.out',
            });
    };

    const manageMouseLeave = () => {
        gsap.to(circleRef.current, {
            top: '100%',
            width: '100%',
            duration: 0.3,
            ease: 'power1.inOut',
        });
    };

    return (
        <Magnetic>
            <div
                className={styles.roundedButton}
                style={{ overflow: 'hidden' }}
                onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
                {...attributes}
            >
                {children}
                <div ref={circleRef} style={{ backgroundColor }} className={styles.circle} />
            </div>
        </Magnetic>
    );
}
```

Note: verify `Rouded.module.scss` gives `.circle` `top: 100%; width: 100%` as its resting state (it must, since the old `initial` variant matched those values). If the resting values live only in the old JS variants, add them to the module CSS.

- [ ] **Step 3: Rewrite `shiny-button.tsx`**

```tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

interface ShinyButtonProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
    ({ children, className, ...props }, forwardedRef) => {
        const innerRef = useRef<HTMLButtonElement>(null);

        useGSAP(
            () => {
                // sweeping shine (replaces the `--x` CSS var animation)
                gsap.fromTo(
                    innerRef.current,
                    { '--x': '100%' },
                    { '--x': '-100%', duration: 2, ease: 'none', repeat: -1, repeatDelay: 1 }
                );
                // intro scale (replaces the initial spring)
                gsap.fromTo(
                    innerRef.current,
                    { scale: 0.8 },
                    { scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
                );
            },
            { scope: innerRef }
        );

        const handleDown = () => gsap.to(innerRef.current, { scale: 0.95, duration: 0.15 });
        const handleUp = () => gsap.to(innerRef.current, { scale: 1, duration: 0.2 });

        return (
            <button
                ref={(node) => {
                    innerRef.current = node;
                    if (typeof forwardedRef === 'function') forwardedRef(node);
                    else if (forwardedRef) forwardedRef.current = node;
                }}
                className={cn(
                    'relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]',
                    className
                )}
                onPointerDown={handleDown}
                onPointerUp={handleUp}
                onPointerLeave={handleUp}
                {...props}
            >
                <span
                    className="relative block size-full text-2xl tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    style={{
                        maskImage:
                            'linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))',
                    }}
                >
                    {children}
                </span>
                <span
                    style={{
                        mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
                        WebkitMask:
                            'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
                        backgroundImage:
                            'linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))',
                    }}
                    className="absolute inset-0 z-10 block rounded-[inherit] p-px"
                />
            </button>
        );
    }
);

ShinyButton.displayName = 'ShinyButton';
```

Note: GSAP tweens CSS custom properties (`--x`) natively; the mask gradients read the var so the shine sweeps. If TS complains about `'--x'` as a tween key, cast: `gsap.fromTo(innerRef.current, { '--x': '100%' } as gsap.TweenVars, ...)`.

- [ ] **Step 4: Rewrite the `Sparkle` sub-component in `sparkle.tsx`** (replace `motion.svg` with a plain `svg` + GSAP keyframes; everything else in the file stays)

Replace the `Sparkle` component:

```tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// ...existing type/style imports; remove `import { motion } from 'motion/react';`

gsap.registerPlugin(useGSAP);

const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
    const ref = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, left: x, top: y },
                {
                    keyframes: {
                        opacity: [0, 1, 0],
                        scale: [0, scale, 0],
                        rotate: [75, 120, 150],
                    },
                    duration: 0.8,
                    repeat: -1,
                    delay,
                    ease: 'none',
                }
            );
        },
        { dependencies: [x, y, scale, delay] }
    );

    return (
        <svg
            ref={ref}
            className="pointer-events-none absolute z-20"
            style={{ left: x, top: y }}
            width="21"
            height="21"
            viewBox="0 0 21 21"
        >
            <path
                d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
                fill={color}
            />
        </svg>
    );
};
```

Note: sparkles are regenerated with new ids by the parent's interval; the `key={sparkle.id}` remount triggers fresh `useGSAP` runs, so the looping twinkle continues. Remove the now-unused `lifespan`-related render concerns only if the compiler flags them — keep the parent logic untouched otherwise.

- [ ] **Step 5: Rewrite `circular-text.tsx`** (rotation loop + hover timeScale)

```tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

interface CircularTextProps {
    text: string;
    spinDuration?: number;
    onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
    className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
    text,
    spinDuration = 20,
    onHover = 'speedUp',
    className = '',
}) => {
    const letters = Array.from(text);
    const rootRef = useRef<HTMLDivElement>(null);
    const spinTween = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            spinTween.current?.kill();
            spinTween.current = gsap.to(rootRef.current, {
                rotation: '+=360',
                duration: spinDuration,
                ease: 'none',
                repeat: -1,
            });
        },
        { dependencies: [spinDuration, text] }
    );

    const setTimeScale = (value: number) => {
        if (spinTween.current) {
            gsap.to(spinTween.current, { timeScale: value, duration: 0.3 });
        }
    };

    const handleHoverStart = () => {
        switch (onHover) {
            case 'slowDown':
                setTimeScale(0.5);
                break;
            case 'speedUp':
                setTimeScale(4);
                break;
            case 'pause':
                setTimeScale(0);
                break;
            case 'goBonkers':
                setTimeScale(20);
                gsap.to(rootRef.current, { scale: 0.8, duration: 0.3 });
                break;
        }
    };

    const handleHoverEnd = () => {
        setTimeScale(1);
        gsap.to(rootRef.current, { scale: 1, duration: 0.3 });
    };

    return (
        <div
            ref={rootRef}
            className={cn(
                'font-red-rose relative m-0 mx-auto h-50 w-50 origin-center cursor-pointer rounded-full text-center font-bold text-black lg:h-60 lg:w-60',
                className
            )}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i;
                const factor = Math.PI / letters.length;
                const x = factor * i;
                const y = factor * i;
                const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                return (
                    <span
                        key={i}
                        className="absolute inset-0 inline-block text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                        style={{ transform, WebkitTransform: transform }}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
};

export default CircularText;
```

- [ ] **Step 6: Rewrite `scroll-progress.tsx`**

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollProgressProps extends React.HTMLAttributes<HTMLElement> {}

export function ScrollProgress({ className, ...props }: ScrollProgressProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const trigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => gsap.set(ref.current, { scaleX: self.progress }),
        });
        return () => trigger.kill();
    });

    return (
        <div
            ref={ref}
            className={cn(
                'fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]',
                className
            )}
            style={{ scaleX: 0 }}
            {...props}
        />
    );
}
```

- [ ] **Step 7: Modify `highlighter.tsx`** — replace `useInView` from motion with an IntersectionObserver. Change the import block and add state:

```tsx
import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { annotate } from 'rough-notation';
import { type RoughAnnotation } from 'rough-notation/lib/model';
```

Inside the component (everything else stays identical):

```tsx
const [isInView, setIsInView] = useState(false);

useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        },
        { rootMargin: '-10%' }
    );
    observer.observe(element);
    return () => observer.disconnect();
}, []);
```

(`const isInView = useInView(elementRef, { once: true, margin: '-10%' })` is deleted; `shouldShow`, the annotate effect and JSX stay unchanged.)

- [ ] **Step 8: Verify**

Run: `npm run build` — expected: passes.
Run: `grep -rn "motion/react" src/` — expected: **no matches**.
Run: `npm run dev` — expected: magnetic hover pull works on the Contact button; the Contact button's circle fills on hover and drains on leave; the hero "Mindset vibes" shine sweeps repeatedly; footer circular text spins and speeds up on hover; the top progress bar tracks scroll; the highlighted words annotate when scrolled into view; footer "Dream" sparkles twinkle.

---

### Task 9: Remove motion and final verification

**Files:**

- Modify: `package.json` (via npm), `package-lock.json`
- Verify: whole repo

- [ ] **Step 1: Uninstall motion**

```bash
npm uninstall motion
```

- [ ] **Step 2: Confirm no leftover references**

Run: `grep -rn "motion" src/ --include="*.ts" --include="*.tsx" --include="*.scss"` — expected: no matches (the word "motion" must not appear even in comments; if a false positive appears in copy, leave the copy untouched but confirm no import remains).
Run: `grep -rn "AnimatePresence\|useScroll\|useTransform\|useMotionValueEvent\|layoutId" src/` — expected: no matches.

- [ ] **Step 3: Full build**

Run: `npm run build` — expected: `tsc -b` and vite build both pass with zero errors.

- [ ] **Step 4: Manual end-to-end check (`npm run dev`)**

- `/` shows the placeholder heading.
- `/CreateYourDream`: preloader plays (word cycle → curve morph → slide-up) once per visit; header hides/shows with scroll; menu opens/closes with height + char animations; hero and showcase scroll-linked transforms work on desktop; morphing dialogs open/close smoothly for all 3 cards; footer links smooth-scroll to sections; circular text + sparkles animate; the top progress bar tracks the page.
- Navigating `/` ↔ `/CreateYourDream` back and forth several times: no console errors, ScrollTrigger positions stay correct after each navigation (this validates `useGSAP` context cleanup).

- [ ] **Step 5: Verify nothing is committed**

Run: `git status` — expected: all changes present as unstaged/untracked; run `git log --oneline -1` — expected: HEAD is still `15bd27d attact github link into header footer`.
