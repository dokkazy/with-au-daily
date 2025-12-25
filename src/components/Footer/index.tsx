import CircularText from '@/components/ui/circular-text';
import auImg from '@/assets/images/au-img2.jpg';
import { useSmoothScroll } from '@/hooks/use-lenis';
import { SparklesText } from '@/components/ui/sparkle';

export default function Footer() {
    const scrollToHome = useSmoothScroll('#study-and-beauty');
    const scrollToShowcase = useSmoothScroll('#art-study');
    const scrollToFeedback = useSmoothScroll('#from-a-friend');
    const scrollToContact = useSmoothScroll('#quiet-becoming-better');

    return (
        <footer
            className="relative h-dvh"
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className="fixed bottom-0 h-dvh w-full">
                <div className="flex h-full w-full flex-col justify-between bg-white px-4 py-6 sm:px-12 sm:py-8">
                    <div className="flex grow flex-col items-center justify-evenly md:flex-row md:justify-around md:gap-0">
                        <div className="relative">
                            <img
                                src={auImg}
                                className="h-36 w-36 overflow-hidden rounded-full object-cover lg:h-46 lg:w-46"
                                alt=""
                            />
                            <CircularText
                                text="WITH*AU*DAILY*"
                                onHover="speedUp"
                                spinDuration={20}
                                className="custom-class absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                        <div className="flex w-full justify-center gap-4 min-[500px]:justify-evenly min-[870px]:gap-12 md:w-auto md:justify-center md:gap-6 lg:gap-28 xl:gap-72">
                            <div className="font-red-rose space-y-4 text-sm min-[328px]:text-base sm:text-lg md:text-xl">
                                <h4 className="font-bold">My Creative Dream</h4>
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
                            <div className="font-red-rose space-y-4 text-sm min-[328px]:text-base sm:text-lg md:text-xl">
                                <h4 className="font-bold">My Creative World</h4>
                                <div className="flex flex-col gap-4 md:px-4">
                                    <a
                                        href="https://www.tiktok.com/@withaaudaily"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Tiktok
                                    </a>
                                    <a
                                        href="https://www.instagram.com/withaaudaily/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@justaauvan/shorts"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Youtube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-red-rose flex flex-col-reverse items-center gap-4 lg:flex-row lg:justify-around lg:gap-0">
                        <p className="text-sm md:text-base">{new Date().getFullYear()} ©Edition</p>
                        <h1 className="text-xl leading-[0.8] italic min-[328px]:text-3xl md:text-5xl lg:text-7xl">
                            Create Your{' '}
                            <SparklesText className="inline text-xl min-[328px]:text-3xl md:text-5xl lg:text-7xl">
                                Dream
                            </SparklesText>
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    );
}
