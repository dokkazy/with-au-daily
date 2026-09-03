import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ShinyButtonProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
    ({ children, className, ...props }, forwardedRef) => {
        const innerRef = useRef<HTMLButtonElement>(null);

        useGSAP(
            () => {
                // sweeping shine (replaces the `--x` CSS var animation)
                gsap.fromTo(
                    innerRef.current,
                    { '--x': '100%' },
                    {
                        '--x': '-100%',
                        duration: 2,
                        ease: 'none',
                        repeat: -1,
                        repeatDelay: 1,
                    }
                );
                // intro scale (replaces the initial spring)
                gsap.fromTo(
                    innerRef.current,
                    { scale: 0.8 },
                    { scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
                );
            },
            { scope: innerRef }
        );

        const handleDown = () => gsap.to(innerRef.current, { scale: 0.95, duration: 0.15 });
        const handleUp = () => gsap.to(innerRef.current, { scale: 1, duration: 0.2 });

        return (
            <button
                ref={(node) => {
                    innerRef.current = node;
                    if (typeof forwardedRef === 'function') forwardedRef(node);
                    else if (forwardedRef) forwardedRef.current = node;
                }}
                className={cn(
                    'relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]',
                    className
                )}
                onPointerDown={handleDown}
                onPointerUp={handleUp}
                onPointerLeave={handleUp}
                {...props}
            >
                <span
                    className="relative block size-full text-2xl tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    style={{
                        maskImage:
                            'linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))',
                    }}
                >
                    {children}
                </span>
                <span
                    style={{
                        mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
                        WebkitMask:
                            'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
                        backgroundImage:
                            'linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))',
                    }}
                    className="absolute inset-0 z-10 block rounded-[inherit] p-px"
                />
            </button>
        );
    }
);

ShinyButton.displayName = 'ShinyButton';
