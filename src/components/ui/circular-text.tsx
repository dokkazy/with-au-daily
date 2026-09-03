import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface CircularTextProps {
    text: string;
    spinDuration?: number;
    onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
    className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
    text,
    spinDuration = 20,
    onHover = 'speedUp',
    className = '',
}) => {
    const letters = Array.from(text);
    const rootRef = useRef<HTMLDivElement>(null);
    const spinTween = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            spinTween.current?.kill();
            spinTween.current = gsap.to(rootRef.current, {
                rotation: '+=360',
                duration: spinDuration,
                ease: 'none',
                repeat: -1,
            });
        },
        { dependencies: [spinDuration, text] }
    );

    const setTimeScale = (value: number) => {
        if (spinTween.current) {
            gsap.to(spinTween.current, { timeScale: value, duration: 0.3 });
        }
    };

    const handleHoverStart = () => {
        switch (onHover) {
            case 'slowDown':
                setTimeScale(0.5);
                break;
            case 'speedUp':
                setTimeScale(4);
                break;
            case 'pause':
                setTimeScale(0);
                break;
            case 'goBonkers':
                setTimeScale(20);
                gsap.to(rootRef.current, { scale: 0.8, duration: 0.3 });
                break;
        }
    };

    const handleHoverEnd = () => {
        setTimeScale(1);
        gsap.to(rootRef.current, { scale: 1, duration: 0.3 });
    };

    return (
        <div
            ref={rootRef}
            className={cn(
                'font-red-rose relative m-0 mx-auto h-50 w-50 origin-center cursor-pointer rounded-full text-center font-bold text-black lg:h-60 lg:w-60',
                className
            )}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i;
                const factor = Math.PI / letters.length;
                const x = factor * i;
                const y = factor * i;
                const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                return (
                    <span
                        key={i}
                        className="absolute inset-0 inline-block text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                        style={{ transform, WebkitTransform: transform }}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
};

export default CircularText;
