import CircularText from '@/components/ui/circular-text';
import auImg from '@/assets/au-img2.jpg';
import { useSmoothScroll } from '@/hooks/use-lenis';

export default function Footer() {
    const scrollToHome = useSmoothScroll('#study-and-beauty');
    const scrollToShowcase = useSmoothScroll('#art-study');
    const scrollToFeedback = useSmoothScroll('#from-a-friend');
    const scrollToContact = useSmoothScroll('#quiet-becoming-better');

    return (
        <footer
            className="relative h-150"
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className="fixed bottom-0 h-150 w-full">
                <div className="flex h-full w-full flex-col justify-between bg-[#F4F0EA] px-4 py-12 sm:px-12 sm:py-8">
                    <div className="flex flex-col items-center gap-8 pt-12 md:flex-row md:justify-around md:gap-0 md:pt-28">
                        <div className="relative">
                            <img
                                src={auImg}
                                className="h-24 w-24 overflow-hidden rounded-full object-cover md:h-36 md:w-36 lg:h-46 lg:w-46"
                                alt=""
                            />
                            <CircularText
                                text="WITH*AU*DAILY*"
                                onHover="speedUp"
                                spinDuration={20}
                                // className="custom-class absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                className="custom-class absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                        <div className="flex w-full justify-evenly md:w-auto md:justify-center md:gap-12 lg:gap-28 xl:gap-72">
                            <div className="font-red-rose space-y-4 text-base sm:text-lg md:text-xl">
                                <h4 className="font-bold">Navigation</h4>
                                <div className="flex flex-col gap-4 md:px-4">
                                    <a
                                        href="#study-and-beauty"
                                        onClick={scrollToHome}
                                        className="cursor-pointer transition-opacity hover:opacity-70"
                                    >
                                        Study and Beauty 𝜗ৎ
                                    </a>
                                    <a
                                        href="#art-study"
                                        onClick={scrollToShowcase}
                                        className="cursor-pointer transition-opacity hover:opacity-70"
                                    >
                                        Art Study 𝜗ৎ
                                    </a>
                                    <a
                                        href="#from-a-friend"
                                        onClick={scrollToFeedback}
                                        className="cursor-pointer transition-opacity hover:opacity-70"
                                    >
                                        From a friend 𝜗ৎ
                                    </a>
                                    <a
                                        href="#quiet-becoming-better"
                                        onClick={scrollToContact}
                                        className="cursor-pointer transition-opacity hover:opacity-70"
                                    >
                                        Quiet Becoming Better 𝜗ৎ
                                    </a>
                                </div>
                            </div>
                            <div className="font-red-rose space-y-4 text-base sm:text-lg md:text-xl">
                                <h4 className="font-bold">Social</h4>
                                <div className="flex flex-col gap-4 md:px-4">
                                    <a href="">Tiktok</a>
                                    <a href="">Instagram</a>
                                    <a href="">Facebook</a>
                                    <a href="https://beacons.ai/withaaudaily" target='_blank'>Behance</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-red-rose flex flex-col-reverse gap-6 lg:gap-0 lg:flex-row items-center lg:justify-around">
                        <p className="text-sm md:text-base">
                            {new Date().toDateString()} ©Edition
                        </p>
                        <h1 className="leading-[0.8] italic text-3xl md:text-5xl lg:text-7xl">
                            Let's work together
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    );
}
