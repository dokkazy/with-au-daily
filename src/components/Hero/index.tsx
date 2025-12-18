import styles from './Hero.module.scss';
import heroImg from '@/assets/cat.png';
import { ShinyButton } from '@/components/ui/shiny-button';
import CircularText from './CircularText';
import { motion, MotionValue, useTransform } from 'motion/react';

export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const rotate = useTransform(scrollYProgress, [0, 1], [0, -1]);
    return (
        <motion.div id="home" style={{ scale, rotate }} className={styles.main}>
            <div className="container">
                <img className="absolute h-full w-full object-cover" src={heroImg} alt="Hero" />

                <div className="absolute top-1/2 left-1/2 flex max-w-150 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-6 text-white">
                    <h2 className="font-bodoni flex scroll-m-20 flex-col justify-center pb-2 text-left text-5xl font-semibold tracking-tight first:mt-0 2xl:text-7xl">
                        <span>STUDY</span> <span>AND BEAUTY 𝜗ৎ</span>
                    </h2>
                    <p className="font-red-rose flex flex-col text-center text-lg 2xl:text-xl">
                        <span>
                            Không gian nhỏ để bạn{' '}
                            <strong className="italic">get ready with your life</strong> 𝜗ৎ nơi mỗi
                            buổi sáng bắt đầu bằng sự chăm sóc bản thân, và mỗi tối kết thúc bằng
                            việc tiến gần hơn đến ước mơ.
                        </span>
                    </p>
                    <ShinyButton className="font-red-rose rounded-none bg-white text-black">
                        Mindset vibes
                    </ShinyButton>
                    <CircularText
                        text="WITH*AU*DAILY*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="custom-class"
                    />
                </div>
            </div>
        </motion.div>
    );
}
