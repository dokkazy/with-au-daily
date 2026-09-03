import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import styles from './Header.module.scss';
import Nav from './Nav';

export default function Header() {
    const [isActive, setIsActive] = useState(false); // animation target
    const [navMounted, setNavMounted] = useState(false); // Nav in DOM
    const [hidden, setHidden] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const menuLabelRef = useRef<HTMLParagraphElement>(null);
    const closeLabelRef = useRef<HTMLParagraphElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // hide/show on scroll (replaces useScroll + useMotionValueEvent)
    useGSAP(() => {
        ScrollTrigger.create({
            start: 1,
            end: 'max',
            onEnter: () => setHidden(true),
            onLeaveBack: () => setHidden(false),
        });
    });

    useGSAP(
        () => {
            gsap.to(headerRef.current, {
                y: hidden && !isActive ? '-100%' : '0%',
                duration: 0.35,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [hidden, isActive] }
    );

    // Menu / Close label crossfade (replaces the `opacity` variants)
    useGSAP(
        () => {
            gsap.to(menuLabelRef.current, {
                opacity: isActive ? 0 : 1,
                y: isActive ? '-100%' : '0%',
                duration: 1,
                ease: 'power3.inOut',
            });
            gsap.to(closeLabelRef.current, {
                opacity: isActive ? 1 : 0,
                y: isActive ? '0%' : '-100%',
                duration: 1,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [isActive] }
    );

    // background curtain (replaces the `background` variants)
    useGSAP(
        () => {
            gsap.to(backgroundRef.current, {
                height: isActive ? '100vh' : 0,
                duration: 1,
                ease: 'power3.inOut',
            });
        },
        { dependencies: [isActive] }
    );

    const openMenu = () => {
        setNavMounted(true);
        setIsActive(true);
    };

    const closeMenu = () => {
        setIsActive(false); // Nav plays its exit, then calls handleNavClosed
    };

    const handleNavClosed = () => {
        setNavMounted(false);
    };

    return (
        <div ref={headerRef} className={styles.header}>
            <div ref={barRef} className={styles.bar}>
                <a href="/">With Au Daily</a>

                <div
                    onClick={() => {
                        if (isActive) {
                            closeMenu();
                        } else {
                            openMenu();
                        }
                    }}
                    className={styles.el}
                >
                    <div
                        className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
                    ></div>

                    <div className={styles.label}>
                        <p ref={menuLabelRef}>Menu</p>
                        <p ref={closeLabelRef}>Close</p>
                    </div>
                </div>
            </div>
            {navMounted && (
                <Nav isActive={isActive} onClosed={handleNavClosed} onClose={closeMenu} />
            )}
            <div ref={backgroundRef} className={styles.background}></div>
        </div>
    );
}
