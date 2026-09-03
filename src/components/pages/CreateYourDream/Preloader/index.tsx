import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Preloader.module.scss';

const words = [
    'Xin chào',
    'Hello',
    'Bonjour',
    'Ciao',
    'Olà',
    'やあ',
    'Hallå',
    'Guten tag',
    'Hallo',
];

export default function Preloader({ onExitComplete }: { onExitComplete: () => void }) {
    const [index, setIndex] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLParagraphElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const [dimension] = useState(() => {
        if (typeof window !== 'undefined') {
            return { width: window.innerWidth, height: window.innerHeight };
        }
        return { width: 0, height: 0 };
    });

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(
            () => {
                setIndex(index + 1);
            },
            index == 0 ? 1000 : 150
        );
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    useGSAP(
        () => {
            if (dimension.width === 0) return;

            // enter: fade the word in
            gsap.fromTo(
                wordRef.current,
                { opacity: 0 },
                { opacity: 0.75, duration: 1, delay: 0.2 }
            );

            // exit: morph the curve, slide the whole overlay up, then report done
            const tl = gsap.timeline({ delay: 2 });
            tl.to(pathRef.current, {
                attr: { d: targetPath },
                duration: 0.7,
                ease: 'power3.inOut',
            })
                .to(rootRef.current, { top: '-100vh', duration: 0.8, ease: 'power3.inOut' }, 0.3)
                .call(onExitComplete);
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className={styles.introduction}>
            {dimension.width > 0 && (
                <>
                    <p ref={wordRef}>
                        <span></span>
                        {words[index]}
                    </p>
                    <svg>
                        <path ref={pathRef} d={initialPath}></path>
                    </svg>
                </>
            )}
        </div>
    );
}
