import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Rouded.module.scss';
import Magnetic from '@/components/ui/magnetic';

export default function RoudedButton({
    children,
    backgroundColor = '#455CE9',
    ...attributes
}: {
    children: React.ReactNode;
    backgroundColor?: string;
}) {
    const circleRef = useRef<HTMLDivElement>(null);

    const manageMouseEnter = () => {
        gsap.timeline()
            .to(circleRef.current, {
                top: '-25%',
                width: '150%',
                duration: 0.4,
                ease: 'power3.in',
            })
            .to(circleRef.current, {
                top: '-150%',
                width: '125%',
                duration: 0.25,
                ease: 'power1.out',
            });
    };

    const manageMouseLeave = () => {
        gsap.to(circleRef.current, {
            top: '100%',
            width: '100%',
            duration: 0.3,
            ease: 'power1.inOut',
        });
    };

    return (
        <Magnetic>
            <div
                className={styles.roundedButton}
                style={{ overflow: 'hidden' }}
                onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
                {...attributes}
            >
                {children}
                <div ref={circleRef} style={{ backgroundColor }} className={styles.circle} />
            </div>
        </Magnetic>
    );
}
