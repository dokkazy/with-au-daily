import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Nav.module.scss';
import Body from '../Body';
import Image from '../Image';
import Footer from '../Footer';
import menu1Img from '@/assets/images/menu1.jpg';
import menu2Img from '@/assets/images/menu2.jpg';
import menu3Img from '@/assets/images/menu3.jpg';
import menu4Img from '@/assets/images/menu4.jpg';

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

export default function Nav({
    isActive,
    onClosed,
    onClose,
}: {
    isActive: boolean;
    onClosed: () => void;
    onClose: () => void;
}) {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const hasOpened = useRef(false);

    useGSAP(
        () => {
            if (isActive) {
                hasOpened.current = true;
                gsap.fromTo(
                    navRef.current,
                    { height: 0 },
                    { height: 'auto', duration: 1, ease: 'power3.inOut' }
                );
            } else if (hasOpened.current) {
                gsap.to(navRef.current, {
                    height: 0,
                    duration: 1,
                    ease: 'power3.inOut',
                    onComplete: onClosed,
                });
            }
        },
        { dependencies: [isActive] }
    );

    return (
        <div ref={navRef} className={styles.nav} style={{ height: 0, overflow: 'hidden' }}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body
                        links={links}
                        selectedLink={selectedLink}
                        setSelectedLink={setSelectedLink}
                        onLinkClick={onClose}
                    />
                    <Footer />
                </div>
                <Image src={links[selectedLink.index].src} selectedLink={selectedLink} />
            </div>
        </div>
    );
}
