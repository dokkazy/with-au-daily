import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
    return lenisInstance;
}

export function setLenisInstance(lenis: Lenis | null) {
    lenisInstance = lenis;
}

export function useSmoothScroll(target: string) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (lenisInstance) {
            // Use Lenis scrollTo method for smooth scroll
            lenisInstance.scrollTo(target, {
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
