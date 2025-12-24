import Lenis from 'lenis';
import { AnimatePresence, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import { useLoadingStore } from './store/loading-store';
import Preloader from './components/Preloader';
import Contact from './components/Contact';
import Feedback from '@/components/Feedback';
import { cn } from '@/lib/utils';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import Footer from '@/components/Footer';
import { setLenisInstance } from '@/hooks/use-lenis';

function App() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const container = useRef<HTMLDivElement>(null);
    const { isLoading, setLoading } = useLoadingStore();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;
        setLenisInstance(lenis);

        function raf(time: number) {
            lenis.raf(time);

            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        setTimeout(() => {
            setLoading(false);

            document.body.style.cursor = 'default';

            window.scrollTo(0, 0);
        }, 2000);

        return () => {
            lenis.destroy();
            setLenisInstance(null);
        };
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

export default App;
