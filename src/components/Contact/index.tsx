import { Highlighter } from '@/components/ui/highlighter';
import RoudedButton from '../ui/RoudedButton';
import { LightRays } from '@/components/ui/light-rays';

export default function Contact() {
    return (
        <section id="quiet-becoming-better" className="h-dvh w-full bg-white">
            <div className="absolute h-full w-full overflow-hidden">
                <LightRays />
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
            </div>
        </section>
    );
}
