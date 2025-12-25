import feedbackImg from '@/assets/images/template.jpg';
import paperClip from '@/assets/images/paper-clip.png';
import kiss from '@/assets/images/kiss.png';
import { Highlighter } from '@/components/ui/highlighter';

export default function Feedback() {
    return (
        <section id="from-a-friend" className="bg-red-inferno min-h-[120dvh] w-full lg:min-h-dvh">
            <div className="lg:max-7xl xl:max-w-8xl container mx-auto px-4 pb-24 sm:space-y-6 md:px-16 lg:space-y-12">
                <div className="flex justify-center pt-12 font-semibold">
                    <h2 className="font-bodoni mb-10 text-4xl tracking-tight text-white uppercase sm:text-5xl lg:text-7xl">
                        From a friend 𝜗ৎ
                    </h2>
                </div>
                <div className="grid grid-cols-1 items-center gap-16 lg:h-120 lg:grid-cols-2">
                    <div className="flex flex-col items-center justify-center gap-2 sm:gap-6 lg:h-1/2 lg:items-start">
                        <h3 className="font-red-rose text-3xl font-semibold text-[#F4F0EA] italic sm:text-4xl lg:text-5xl">
                            Brighter Future
                        </h3>
                        <div className="space-y-4 [452px]:w-105">
                            <p className="font-red-rose max-w-lg text-base text-[#F4F0EA] before:mr-2 before:text-2xl before:text-[#999] before:content-['★'] sm:text-lg md:text-xl lg:text-left">
                                Tôi tin rằng ngay cả một <strong className="italic">Mr./Ms</strong>{' '}
                                cũng không thể xem thường một pháp sư tài năng như tôi.
                            </p>
                            <p className="font-red-rose max-w-lg text-base text-[#F4F0EA] sm:text-lg md:text-xl lg:text-left">
                                Nói nhỏ với nhau nhé, <strong className="italic">Mr./Ms.</strong>{' '}
                                Phép thuật của tôi biến giấc mơ thành hiện thực.
                            </p>
                        </div>
                    </div>
                    <div className="hidden max-sm:flex max-sm:justify-center">
                        <div className="relative">
                            <img className="h-110 w-fit sm:h-120" src={feedbackImg} alt="" />
                            <div className="absolute -top-8 left-0">
                                <img className="h-12 w-12" src={paperClip} alt="" />
                            </div>
                            <div className="absolute -top-8 right-0 rotate-300">
                                <img className="h-12 w-12" src={paperClip} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full max-w-90 transform max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-sm:hidden xl:max-w-120 [1170px]:max-w-105">
                        <div className="absolute rotate-[5deg] max-lg:left-[-20%] max-sm:left-[-5%]">
                            <img className="h-110 w-full sm:h-120" src={feedbackImg} alt="" />
                            <div className="absolute -top-8 left-0">
                                <img className="h-12 w-12" src={paperClip} alt="" />
                            </div>
                        </div>
                        <div className="absolute right-[-5%] z-10 w-85 rotate-[-5deg] bg-white px-12 py-12 text-sm leading-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)] sm:right-[-20%] sm:text-base lg:h-120 xl:right-[-20%] xl:w-95 xl:py-24">
                            <p className="font-red-rose">
                                I would love to say that so glaaaad to know about this{' '}
                                <Highlighter action="underline" color="#ffd1dc">
                                    lovely template
                                </Highlighter>
                                . It’s charming but not giving any border of imagination to
                                satisfied our big bright future. I love the red colored tone that
                                you choose for the notion, makes me readily go abt doing the goal.
                            </p>
                            <div>
                                <img
                                    className="absolute -top-8 right-0 h-12 w-12"
                                    src={paperClip}
                                    alt=""
                                />
                            </div>
                            <div>
                                {' '}
                                <img
                                    className="absolute -bottom-24 left-[-10%] h-60 w-40 rotate-12"
                                    src={kiss}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
