import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Image.module.scss';

export default function Image({
    src,
    selectedLink,
}: {
    src: string;
    selectedLink: { isActive: boolean };
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.to(containerRef.current, {
                opacity: selectedLink.isActive ? 1 : 0,
                duration: 0.35,
            });
        },
        { dependencies: [selectedLink.isActive], scope: containerRef }
    );

    return (
        <div ref={containerRef} className={styles.imageContainer} style={{ opacity: 0 }}>
            <img src={src} alt="image" />
        </div>
    );
}
