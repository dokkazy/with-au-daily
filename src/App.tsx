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

        // Christmas themed console.log
        console.log(
            '%c       🌟\n' +
                '%c      /|\\\n' +
                '%c     /*|O\\\n' +
                '%c    /*/|\\*\\\n' +
                '%c   /O/\\|/*\\\n' +
                '%c  /*/O\\|/\\*\\\n' +
                '%c /O/*\\|/O\\*\\\n' +
                '%c/*/O\\*/\\*\\O\\\n' +
                '%c      |||\n' +
                '%c      |||\n' +
                '%c━━━━━━━━━━━━━━\n' +
                '%c✨ with au daily ✨\n' +
                '%c━━━━━━━━━━━━━━\n' +
                '%cMerry Christmas! 🎄🎅🎁',
            'color: #FFD700; font-size: 20px; font-weight: bold;', // Star
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree top
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree
            'color: #228B22; font-size: 16px; font-weight: bold;', // Tree bottom
            'color: #8B4513; font-size: 16px; font-weight: bold;', // Trunk
            'color: #8B4513; font-size: 16px; font-weight: bold;', // Trunk
            'color: #DC143C; font-size: 14px; font-weight: bold;', // Border
            'color: #FF1493; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #FFD700;', // with au daily
            'color: #DC143C; font-size: 14px; font-weight: bold;', // Border
            'color: #32CD32; font-size: 14px; font-weight: bold;' // Greeting
        );

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
