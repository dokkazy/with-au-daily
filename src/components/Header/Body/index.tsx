import { motion } from 'motion/react';
import styles from './Body.module.scss';
import type { JSX } from 'react';

const blur = {
    initial: {
        filter: 'blur(0px)',
        opacity: 1,
    },

    open: {
        filter: 'blur(4px)',
        opacity: 0.6,
        transition: { duration: 0.3 },
    },

    closed: {
        filter: 'blur(0px)',
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

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

type BodyProps = {
    links: {
        title: string;
        href: string;
        src: string;
    }[];
    selectedLink: { isActive: boolean; index: number };
    setSelectedLink: (link: { isActive: boolean; index: number }) => void;
    setIsActive: (isActive: boolean) => void;
};

export default function Body({ links, selectedLink, setSelectedLink, setIsActive }: BodyProps) {
    const getChars = (word: string) => {
        const chars: JSX.Element[] = [];
        word.split('').forEach((char, i) => {
            chars.push(
                <motion.span
                    custom={[i * 0.02, (word.length - i) * 0.01]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key={char + i}
                >
                    {char}
                </motion.span>
            );
        });
        return chars;
    };

    return (
        <div className={styles.body}>
            {links.map((link, index) => {
                const { title, href } = link;
                return (
                    <a key={`l_${index}`} href={href} onClick={() => setIsActive(false)}>
                        <motion.p
                            onMouseOver={() => {
                                setSelectedLink({ isActive: true, index });
                            }}
                            onMouseLeave={() => {
                                setSelectedLink({ isActive: false, index });
                            }}
                            variants={blur}
                            animate={
                                selectedLink.isActive && selectedLink.index != index
                                    ? 'open'
                                    : 'closed'
                            }
                        >
                            {getChars(title)}
                        </motion.p>
                    </a>
                );
            })}
        </div>
    );
}
