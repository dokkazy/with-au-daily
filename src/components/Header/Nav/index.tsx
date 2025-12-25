'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './Nav.module.scss';
import Body from '../Body';
import Image from '../Image';
import menu1Img from '@/assets/images/menu1.jpg';
import menu2Img from '@/assets/images/menu2.jpg';
import menu3Img from '@/assets/images/menu3.jpg';
import menu4Img from '@/assets/images/menu4.jpg';
import Footer from '@/components/Header/Footer';
const links = [
    {
        title: 'Study and beauty',
        href: '#study-and-beauty',
        src: menu1Img,
    },
    {
        title: 'Art study',
        href: '#art-study',
        src: menu2Img,
    },
    {
        title: 'From a friend',
        href: '#from-a-friend',
        src: menu3Img,
    },
    {
        title: 'Quiet becoming better',
        href: '#quiet-becoming-better',
        src: menu4Img,
    },
];

const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] as const };

const height = {
    initial: {
        height: 0,
    },

    enter: {
        height: 'auto',

        transition,
    },

    exit: {
        height: 0,

        transition,
    },
};

export default function Nav({ setIsActive }: { setIsActive: (isActive: boolean) => void }) {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

    return (
        <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.nav}
        >
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body
                        links={links}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                        setIsActive={setIsActive}
                    />
                    <Footer />
                </div>
                <Image src={links[selectedLink.index].src} selectedLink={selectedLink} />
            </div>
        </motion.div>
    );
}
