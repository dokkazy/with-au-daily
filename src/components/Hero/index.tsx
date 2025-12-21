import { motion, MotionValue, useTransform } from 'motion/react';
import { ShinyButton } from '@/components/ui/shiny-button';
import auImg from '@/assets/au-img.jpg';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive';

export default function Hero({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -1]);

    return (
        <motion.div
            id="home"
            style={isDesktop ? { scale, rotate } : {}}
            className={cn("w-full", isDesktop ? " sticky top-0 h-dvh" : "min-h-dvh mb-24")}
        >
            <div className="xl:max-w-8xl container mx-auto px-4 pt-24 sm:px-8 md:px-16 lg:max-w-7xl">
                <div className="grid h-full w-full place-items-center gap-12 lg:grid-cols-2 lg:gap-6">
                    {/* Content - Left Column */}
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
                        <ShinyButton className="font-red-rose border-2 bg-white text-black">
                            Mindset vibes
                        </ShinyButton>
                    </div>

                    {/* Image - Right Column */}
                    <div className="flex items-center justify-center overflow-hidden lg:h-150 lg:w-100 xl:w-120">
                        <img
                            className="h-full w-full rounded-2xl object-cover"
                            src={auImg}
                            alt="Hero"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
