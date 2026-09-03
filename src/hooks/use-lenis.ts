import { useLenis } from 'lenis/react';

export function useSmoothScroll(target: string) {
    const lenis = useLenis();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (lenis) {
            // Use Lenis scrollTo method for smooth scroll
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            // Fallback to native smooth scroll
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return handleClick;
}
