import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

function LenisGsapBridge() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        lenis.on('scroll', ScrollTrigger.update);

        // gsap.ticker time is in seconds; lenis.raf expects milliseconds
        const update = (time: number) => {
            lenis.raf(time * 1000);
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
