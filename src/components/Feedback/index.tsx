import './Feedback.module.scss';
import feedbackImg from '@/assets/template.jpg';
import paperClip from '@/assets/paper-clip.png';
import { Highlighter } from '@/components/ui/highlighter';

export default function Feedback() {
    return (
        <section className="min-h-dvh w-full bg-[#ffd6e3]">
            <div className="lg:max-7xl px-4 xl:max-w-8xl container mx-auto space-y-6 md:px-16">
                <div className="flex justify-center pt-12 font-semibold">
                    <h2 className="font-red-rose mb-10 text-6xl tracking-tight uppercase">
                        From a friend
                    </h2>
                </div>
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div className="flex flex-col items-center justify-center space-y-2 text-black sm:space-y-6">
                        <h2 className="font-bodoni flex scroll-m-20 flex-col items-start text-5xl font-semibold tracking-tight first:mt-0 sm:text-7xl">
                            <span>STUDY</span>
                            <span>AND BEAUTY 𝜗ৎ</span>
                        </h2>
                        <p className="font-red-rose max-w-lg text-left text-lg sm:text-xl">
                            Không gian nhỏ để bạn{' '}
                            <strong className="italic">get ready with your life</strong> 𝜗ৎ nơi mỗi
                            buổi sáng bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc bằng
                            việc tiến gần hơn đến ước mơ.
                        </p>
                    </div>
                        <div className="relative max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 transform  h-full max-w-90 [1170px]:max-w-105 xl:max-w-120">
                            <div className="absolute max-lg:left-[-25%] rotate-[5deg]">
                                <img className="w-full h-120" src={feedbackImg} alt="" />
                                <div className="absolute -top-8 left-0">
                                    <img
                                        className="h-12 w-12"
                                        src={paperClip}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="absolute top-[10%] right-[-25%] z-10 h-120 w-85 xl:w-95 rotate-[-5deg] bg-white px-12 py-12 xl:py-24 leading-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
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
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}
