import RoudedButton from '../RoudedButton';
import contactImg from '@/assets/contact.png';
export default function Contact() {
    return (
        <section id="contact" className="h-dvh w-full bg-[#ffd6e3]">
            <div className="absolute h-full w-full">
                 <img className="h-full w-full object-cover" src={contactImg} alt="Learn More Img" />
                <div className="absolute top-1/2 left-1/2 flex max-w-150 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-6 text-black">
                    <h2 className="font-bodoni flex scroll-m-20 flex-col justify-center pb-2 text-left text-5xl 2xl:text-7xl font-semibold tracking-tight uppercase first:mt-0">
                        Quiet Becoming Better 𝜗ৎ
                    </h2>
                    <p className="font-red-rose flex flex-col text-center text-lg 2xl:text-xl">
                        Giữa những ồn ào của thế giới và sự tĩnh lặng nội tâm, tôi khao khát chia sẻ hành trình học tập của mình và tạo ra Mẫu thiết kế sáng tạo với những ý tưởng về Vẻ đẹp và Học tập. Tôi biết nhiều người cần sự hướng dẫn, và tôi đã có đủ can đảm và sự tập trung để kiên định với con đường của mình và truyền cảm hứng cho người khác.
                    </p>
                    <RoudedButton backgroundColor="#fd6494">
                        <a href='https://www.notion.so/study-and-beauty-29f206edeb2b81929807de791857ba71' target="_blank"><p>Mindset vibes</p></a>
                    </RoudedButton>
                </div>
            </div>
        </section>
    );
}
