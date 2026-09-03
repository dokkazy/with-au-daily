import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Footer.module.scss';

export default function Footer() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                `.${styles.footer} li`,
                { y: '100%', opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.inOut' }
            );
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className={styles.footer}>
            <ul>
                <li>
                    <span>Creative Director:</span> Âu Vân
                </li>
            </ul>
            <ul>
                <li>
                    <span>Creative Developer:</span>{' '}
                    <a
                        href="https://github.com/dokkazy/with-au-daily"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Công Huy
                    </a>
                </li>
            </ul>
        </div>
    );
}
