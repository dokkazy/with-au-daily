import { useState } from 'react';
import styles from './Header.module.scss';
import { motion, AnimatePresence } from 'motion/react';
import Nav from './Nav'

const opacity = {
    open: {
        opacity: 1,
        y: 0,
    },
    closed: {
        opacity: 0,
        y: '-100%',
    },
};


const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] as const };

const background = {
    initial: {
        height: 0
    },
    open: {
        height: "100vh",
        transition
    },
    closed: {
        height: 0,
        transition
    }
}


export default function Header() {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={styles.header}>
            <div className={styles.bar}>
                <a href="/">With Au Daily</a>

                <div
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                    className={styles.el}
                >
                    <div
                        className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
                    ></div>

                    <div className={styles.label}>
                        <motion.p variants={opacity} animate={!isActive ? 'open' : 'closed'}>
                            Menu
                        </motion.p>

                        <motion.p variants={opacity} animate={isActive ? 'open' : 'closed'}>
                            Close
                        </motion.p>
                    </div>
                </div>
            </div>
             <AnimatePresence mode="wait">

                {isActive && <Nav/>}

            </AnimatePresence>
             <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
        </div>
    );
}
