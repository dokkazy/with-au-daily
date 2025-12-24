import { Highlighter } from '@/components/ui/highlighter';
import RoudedButton from '../ui/RoudedButton';
import quiteImg from '@/assets/quite.jpg';

export default function Contact() {
    return (
        <section id="quiet-becoming-better" className="mb-24 min-h-dvh w-full bg-white lg:mb-0">
            {/* <div className="absolute h-full w-full overflow-hidden">
                <div className="absolute top-1/2 left-1/2 flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-4 px-4 text-black sm:max-w-150 sm:space-y-6 sm:px-0">
                    <h2 className="font-bodoni scroll-m-20 pb-2 text-center text-4xl font-semibold tracking-tight uppercase first:mt-0 sm:text-5xl lg:text-7xl">
                        Quiet Becoming Better 𝜗ৎ
                    </h2>
                    <p className="font-red-rose text-center max-[322px]:text-sm text-base leading-relaxed xl:text-xl">
                        Giữa những ồn ào của thế giới và sự tĩnh lặng nội tâm, tôi khao khát chia sẻ
                        hành trình học tập của mình và sáng tạo{' '}
                        <Highlighter action="highlight" color="var(--red-inferno)">
                            <span className='text-white'>My Template</span>
                        </Highlighter>{' '}
                        như một không gian kết nối những ý tưởng về vẻ đẹp và học tập. Tôi biết
                        nhiều người đang cần sự hướng dẫn, và tôi đã có đủ can đảm cùng sự tập trung
                        để kiên định với con đường mình chọn và truyền cảm hứng cho người khác.
                    </p>
                    <RoudedButton backgroundColor="var(--red-inferno)">
                        <a
                            href="https://www.notion.so/study-and-beauty-29f206edeb2b81929807de791857ba71"
                            target="_blank"
                        >
                            <p>My Template</p>
                        </a>
                    </RoudedButton>
                </div>
            </div> */}
            <div className="xl:max-w-8xl relative container mx-auto px-4 pt-24 sm:px-8 md:px-16 lg:max-w-7xl">
                <div className="grid h-full w-full grid-cols-1 place-items-center gap-12 lg:grid-cols-2 lg:gap-6">
                    <div className="order-last flex items-center justify-center overflow-hidden lg:order-first lg:h-150 lg:w-100 xl:w-120">
                        <img
                            className="h-full w-full rounded-2xl object-cover"
                            src={quiteImg}
                            alt="Hero"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-6 text-black">
                        <h2 className="font-bodoni flex scroll-m-20 flex-col items-start text-3xl font-semibold tracking-tight uppercase first:mt-0 sm:text-4xl lg:text-5xl">
                            <span>Quiet</span>
                            <span>Becoming Better 𝜗ৎ</span>
                        </h2>
                        <p className="font-red-rose max-w-lg text-center text-base md:text-lg">
                            Giữa những ồn ào của thế giới và sự tĩnh lặng nội tâm, tôi khao khát
                            chia sẻ hành trình học tập của mình và sáng tạo{' '}
                            <Highlighter action="highlight" color="var(--red-inferno)">
                                <span className="text-white">My Template</span>
                            </Highlighter>{' '}
                            như một không gian kết nối những ý tưởng về vẻ đẹp và học tập. Tôi biết
                            nhiều người đang cần sự hướng dẫn, và tôi đã có đủ can đảm cùng sự tập
                            trung để kiên định với con đường mình chọn và truyền cảm hứng cho người
                            khác.
                        </p>
                        <RoudedButton backgroundColor="var(--red-inferno)">
                            <a
                                href="https://www.notion.so/study-and-beauty-29f206edeb2b81929807de791857ba71"
                                target="_blank"
                            >
                                <p>My Template</p>
                            </a>
                        </RoudedButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
