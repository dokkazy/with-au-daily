import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Lenis from 'lenis';
import { useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

function App() {
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    const container = useRef<HTMLDivElement>(null);

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
    }, []);
    return (
        <>
            {isDesktop ? (
                <main ref={container} className="relative h-[200vh]">
                    <Header />
                    <Hero scrollYProgress={scrollYProgress} />
                    <Showcase scrollYProgress={scrollYProgress} />
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
