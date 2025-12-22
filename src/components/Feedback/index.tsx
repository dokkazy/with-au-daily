import feedbackImg from '@/assets/template.jpg';
import paperClip from '@/assets/paper-clip.png';
import kiss from '@/assets/kiss.png';
import { Highlighter } from '@/components/ui/highlighter';

export default function Feedback() {
    return (
        <section className="min-h-[120dvh] w-full bg-[#ffd6e3] lg:min-h-dvh">
            <div className="lg:max-7xl xl:max-w-8xl container mx-auto space-y-6 px-4 md:px-16 lg:space-y-12">
                <div className="flex justify-center pt-12 font-semibold">
                    <h2 className="font-bodoni mb-10 text-5xl tracking-tight uppercase sm:text-7xl">
                        Brighter Future
                    </h2>
                </div>
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div className="flex h-120 flex-col items-center justify-center">
                        <p className="font-red-rose max-w-lg text-left text-lg text-black before:mr-2 before:text-2xl before:text-[#999] before:content-['★'] sm:text-xl">
                            Tôi tin rằng ngay cả một quý ông/bà cũng không thể xem thường một pháp
                            sư tài năng như tôi. Nói nhỏ với nhau nhé, quý ông/bà —Phép thuật của
                            tôi biến giấc mơ thành hiện thực.
                        </p>
                    </div>
                    <div className="relative h-full max-w-90 transform max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 xl:max-w-120 [1170px]:max-w-105">
                        <div className="absolute rotate-[5deg] max-lg:left-[-20%]">
                            <img className="h-120 w-full" src={feedbackImg} alt="" />
                            <div className="absolute -top-8 left-0">
                                <img className="h-12 w-12" src={paperClip} alt="" />
                            </div>
                        </div>
                        <div className="absolute top-[10%] right-[-20%] z-10 w-85 rotate-[-5deg] bg-white px-12 py-12 leading-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)] lg:h-120 xl:right-[-20%] xl:w-95 xl:py-24">
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
                                    className="absolute right-[-20%] -bottom-32 h-80 rotate-12"
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
