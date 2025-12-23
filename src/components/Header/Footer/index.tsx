import styles from './Footer.module.scss';
import { motion } from 'motion/react';

const translate = {
    initial: {
        y: '100%',

        opacity: 0,
    },

    enter: (i: number[]) => ({
        y: 0,

        opacity: 1,

        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const, delay: i[0] },
    }),

    exit: (i: number[]) => ({
        y: '100%',

        opacity: 0,

        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: i[1] },
    }),
};

export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <span>Made by:</span> <a href="https://www.instagram.com/hv.kon/" target="_blank">hv.kon</a>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <span>Typography:</span> Google Fonts
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <span>Images:</span> Pinterest
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    Privacy Policy
                </motion.li>
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    Terms & Conditions
                </motion.li>
            </ul>
        </div>
    );
}
