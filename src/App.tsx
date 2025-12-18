import Lenis from 'lenis';
import { AnimatePresence, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import About from '@/components/About';
import { useLoadingStore } from './store/loading-store';
import Preloader from './components/Preloader';
import Contact from './components/Contact';

function App() {
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    const container = useRef<HTMLDivElement>(null);
    const { isLoading, setLoading } = useLoadingStore();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const lenis = new Lenis();

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
    }, []);

    return (
        <>
            {isDesktop ? (
                <main>
                    <AnimatePresence mode="wait">
                        {isLoading && (
                            // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                            //     <DynamicText />
                            // </div>
                            <Preloader />
                        )}
                    </AnimatePresence>
                    <Header />
                    <div ref={container} className="relative h-[200dvh]">
                        <Hero scrollYProgress={scrollYProgress} />
                        <Showcase scrollYProgress={scrollYProgress} />
                    </div>
                    <About />
                    <Contact />
                </main>
            ) : (
                <div className="text-center">
                    <h1 className="font-red-rose absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-bold">
                        Trang web hiện tại chỉ tương thích với Desktop
                    </h1>
                </div>
            )}
        </>
    );
}

export default App;
