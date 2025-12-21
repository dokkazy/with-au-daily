import { motion, MotionValue, useTransform } from 'motion/react';
import styles from './Hero.module.scss';
import { ShinyButton } from '@/components/ui/shiny-button';
// import CircularText from './CircularText';
import auImg from '@/assets/au-img.jpg';
// import heroImg from '@/assets/hero 2.jpg';
export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const rotate = useTransform(scrollYProgress, [0, 1], [0, -1]);
    return (
        <motion.div id="home" style={{ scale, rotate }} className={styles.main}>
            <div className="grid h-full w-full grid-cols-2 place-items-center gap-6 px-16">
                {/* Content - Left Column */}
                <div className="flex flex-col items-center justify-center space-y-6 text-black">
                    <h2 className="font-bodoni scroll-m-20 text-left text-5xl font-semibold tracking-tight first:mt-0 2xl:text-7xl">
                        <span>STUDY</span>
                        <br />
                        <span>AND BEAUTY 𝜗ৎ</span>
                    </h2>
                    <p className="font-red-rose max-w-lg text-left text-lg 2xl:text-xl">
                        Không gian nhỏ để bạn{' '}
                        <strong className="italic">get ready with your life</strong> 𝜗ৎ nơi mỗi buổi
                        sáng bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc bằng việc tiến
                        gần hơn đến ước mơ.
                    </p>
                    <ShinyButton className="font-red-rose border-2 bg-white text-black">
                        Mindset vibes
                    </ShinyButton>
                    {/* <div className="pt-4">
                        <CircularText
                            text="WITH*AU*DAILY*"
                            onHover="speedUp"
                            spinDuration={20}
                            className="custom-class"
                        />
                    </div> */}
                </div>

                {/* Image - Right Column */}
                <div className="flex h-150 w-120 items-center justify-center">
                    <img
                        className="h-full w-full max-w-full rounded-2xl object-cover shadow-2xl"
                        src={auImg}
                        alt="Hero"
                    />
                </div>
            </div>
        </motion.div>
    );
}
