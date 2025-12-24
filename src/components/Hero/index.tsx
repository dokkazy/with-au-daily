import { motion, MotionValue, useTransform } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import { ShinyButton } from '@/components/ui/shiny-button';
import auImg from '@/assets/au-img.jpg';
import { cn } from '@/lib/utils';
// const charVariants = {
//     hidden: { y: '100%', opacity: 0 },
//     visible: {
//         y: 0,
//         opacity: 1,
//         transition: {
//             duration: 1.8,
//             ease: easeOut,
//             delay: 2, // 2000ms delay
//         },
//     },
// };

export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
       <section id="study-and-beauty">
            <motion.div
                style={isDesktop ? { scale, rotate } : {}}
                className={cn('w-full', isDesktop ? 'sticky top-0 h-dvh' : 'mb-24 min-h-dvh')}
            >
                <div className="xl:max-w-8xl relative container mx-auto px-4 pt-24 sm:px-8 md:px-16 lg:max-w-7xl">
                    <div className="grid h-full w-full place-items-center gap-12 lg:grid-cols-2 lg:gap-6">
                        {/* Content - Left Column */}
                        <div className="flex flex-col items-center justify-center space-y-4 text-black sm:space-y-6">
                            <h2 className="font-bodoni flex scroll-m-20 flex-col items-start text-4xl font-semibold tracking-tight first:mt-0 sm:text-5xl lg:text-7xl">
                                <span>STUDY</span>
                                <span>AND BEAUTY 𝜗ৎ</span>
                            </h2>
                            <p className="font-red-rose max-w-lg text-left text-base sm:text-lg md:text-xl">
                                Không gian nhỏ để bạn{' '}
                                <strong className="italic">get ready with your life</strong> 𝜗ৎ nơi mỗi
                                buổi sáng bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc bằng
                                việc tiến gần hơn đến ước mơ.
                            </p>
                            <ShinyButton className="font-red-rose border-2 rounded-4xl bg-white text-black">
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
       </section>
    );
}
