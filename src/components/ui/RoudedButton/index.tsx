import React from 'react';
import { useState, useRef } from 'react';
import styles from './Rouded.module.scss';
import { motion } from 'motion/react';
import Magnetic from '@/components/ui/magnetic';

export default function RoudedButton({
    children,
    backgroundColor = '#455CE9',
    ...attributes
}: {
    children: React.ReactNode;
    backgroundColor?: string;
}) {
    const [isHovering, setIsHovering] = useState(false);
    const [animationState, setAnimationState] = useState<'initial' | 'enter' | 'exit' | 'complete'>(
        'initial'
    );
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const manageMouseEnter = () => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
        }
        setIsHovering(true);
        setAnimationState('enter');

        // Automatically transition to exit after enter completes
        animationTimeoutRef.current = setTimeout(() => {
            if (isHovering || animationState === 'enter') {
                setAnimationState('exit');
            }
        }, 400); // Duration of enter animation
    };

    const manageMouseLeave = () => {
        setIsHovering(false);
        timeoutIdRef.current = setTimeout(() => {
            setAnimationState('complete');
        }, 300);
    };

    // Define animation variants for the circle
    const circleVariants = {
        initial: {
            top: '100%',
            width: '100%',
        },
        enter: {
            top: '-25%',
            width: '150%',
            transition: {
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1] as const, // power3.in equivalent
            },
        },
        exit: {
            top: '-150%',
            width: '125%',
            transition: {
                duration: 0.25,
                ease: 'easeOut' as const,
            },
        },
        complete: {
            top: '100%',
            width: '100%',
            transition: {
                duration: 0.3,
                ease: 'easeInOut' as const,
            },
        },
    } as const;

    return (
        <Magnetic>
            <div
                className={styles.roundedButton}
                style={{ overflow: 'hidden' }}
                onMouseEnter={() => {
                    manageMouseEnter();
                }}
                onMouseLeave={() => {
                    manageMouseLeave();
                }}
                {...attributes}
            >
                {children}
                <motion.div
                    style={{ backgroundColor }}
                    className={styles.circle}
                    variants={circleVariants}
                    initial="initial"
                    animate={animationState}
                />
            </div>
        </Magnetic>
    );
}
