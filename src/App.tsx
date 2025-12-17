import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { useMediaQuery } from 'react-responsive';

function App() {
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    return (
        <>
            {isDesktop ? (
                <>
                    <Header />
                    <Hero />
                </>
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
