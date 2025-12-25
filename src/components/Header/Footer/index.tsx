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
                    <span>Creative Director:</span> Âu Vân
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
                    <span>Creative Developer:</span>{' '}
                    <a href="https://github.com/dokkazy/with-au-daily" target="_blank" rel="noopener noreferrer">
                        Công Huy
                    </a>
                </motion.li>
            </ul>
        </div>
    );
}
