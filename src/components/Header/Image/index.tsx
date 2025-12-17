import { motion } from 'motion/react';
import styles from './Image.module.scss';

const opacity = {
    initial: {
        opacity: 0,
    },

    open: {
        opacity: 1,
        transition: { duration: 0.35 },
    },

    closed: {
        opacity: 0,
        transition: { duration: 0.35 },
    },
};
export default function Image({
    src,
    selectedLink,
}: {
    src: string;
    selectedLink: { isActive: boolean };
}) {
    return (
        <motion.div
            variants={opacity}
            initial="initial"
            animate={selectedLink.isActive ? 'open' : 'closed'}
            className={styles.imageContainer}
        >
            <img src={src} alt="image" />
        </motion.div>
    );
}
