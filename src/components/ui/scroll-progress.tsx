import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type ScrollProgressProps = React.HTMLAttributes<HTMLElement>;

export function ScrollProgress({ className, ...props }: ScrollProgressProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const trigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => gsap.set(ref.current, { scaleX: self.progress }),
        });
        return () => trigger.kill();
    });

    return (
        <div
            ref={ref}
            className={cn(
                'fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]',
                className
            )}
            style={{ transform: 'scaleX(0)' }}
            {...props}
        />
    );
}
