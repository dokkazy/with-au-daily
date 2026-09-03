import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

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
