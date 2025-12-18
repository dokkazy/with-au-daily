import aboutImg from '@/assets/about.jpg';
import { SparklesText } from '../ui/sparkle';
import RoudedButton from '../RoudedButton';

export default function About() {
    return (
        <section id="about" className="relative h-dvh w-full">
            <div className="container h-full min-w-full">
                <div className="absolute grid h-full w-full grid-cols-12">
                    <div className="relative col-span-6 h-full bg-gray-200">
                        <div className="absolute top-1/2 left-1/2 flex max-w-150 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-6 text-black">
                            <SparklesText className="font-bodoni flex scroll-m-20 flex-col justify-center pb-2 text-left text-7xl font-medium tracking-tight first:mt-0">
                                <span>STUDY</span> <span>AND BEAUTY 𝜗ৎ</span>
                            </SparklesText>
                            <p className="font-red-rose flex flex-col text-center text-xl">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
                                deleniti maiores facilis, quas dignissimos animi! Odit aspernatur
                                totam at maiores, quisquam dolore aliquid accusantium illo debitis,
                                veniam ullam tempore consequuntur.
                            </p>
                            <RoudedButton backgroundColor='#A41A30'>
                                <p>Mindset vibes</p>
                            </RoudedButton>
                        </div>
                    </div>
                    <div className="col-span-6 h-full">
                        <img src={aboutImg} className="h-full w-full object-cover" alt="Cat" />
                    </div>
                </div>
            </div>
        </section>
    );
}
