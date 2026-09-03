import { useMediaQuery } from 'react-responsive';

import Header from '@/components/pages/CreateYourDream/Header';
import Hero from '@/components/pages/CreateYourDream/Hero';
import Showcase from '@/components/pages/CreateYourDream/Showcase';
import { useLoadingStore } from '@/store/loading-store';
import Preloader from '@/components/pages/CreateYourDream/Preloader';
import Contact from '@/components/pages/CreateYourDream/Contact';
import Feedback from '@/components/pages/CreateYourDream/Feedback';
import { cn } from '@/lib/utils';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import Footer from '@/components/pages/CreateYourDream/Footer';

export default function CreateYourDream() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const { isLoading, setLoading } = useLoadingStore();

    return (
        <main>
            {isLoading && (
                <Preloader
                    onExitComplete={() => {
                        setLoading(false);
                        document.body.style.cursor = 'default';
                        window.scrollTo(0, 0);
                    }}
                />
            )}
            <ScrollProgress className="top-0" />
            <Header />
            <div
                id="page-scroll"
                className={cn('relative', isDesktop ? 'h-[200dvh]' : 'min-h-[200dvh]')}
            >
                <Hero />
                <Showcase />
            </div>
            <Feedback />
            <Contact />
            <Footer />
        </main>
    );
}
