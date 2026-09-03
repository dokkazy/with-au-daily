import React, {
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { gsap } from '@/lib/gsap';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

export type MorphingDialogContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    uniqueId: string;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    backdropRef: React.RefObject<HTMLDivElement | null>;
};

const MorphingDialogContext = React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
    const context = useContext(MorphingDialogContext);
    if (!context) {
        throw new Error('useMorphingDialog must be used within a MorphingDialogProvider');
    }
    return context;
}

function MorphingDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null!);
    const contentRef = useRef<HTMLDivElement>(null!);
    const backdropRef = useRef<HTMLDivElement>(null!);
    const isClosing = useRef(false);

    const open = useCallback(() => {
        isClosing.current = false;
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        const content = contentRef.current;
        const trigger = triggerRef.current;
        if (!content || !trigger || isClosing.current) {
            setIsOpen(false);
            return;
        }
        isClosing.current = true;

        // morph the content back into the trigger's bounds, then unmount
        const contentRect = content.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        const scale = triggerRect.width / contentRect.width;

        if (backdropRef.current) {
            gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' });
        }
        gsap.to(content, {
            x: triggerRect.left - contentRect.left,
            y: triggerRect.top - contentRect.top,
            scale,
            transformOrigin: '0 0',
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                isClosing.current = false;
                setIsOpen(false);
            },
        });
    }, []);

    const contextValue = useMemo(
        () => ({ isOpen, open, close, uniqueId, triggerRef, contentRef, backdropRef }),
        [isOpen, open, close, uniqueId]
    );

    return (
        <MorphingDialogContext.Provider value={contextValue}>
            {children}
        </MorphingDialogContext.Provider>
    );
}

export type MorphingDialogTriggerProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogTrigger({ children, className, style }: MorphingDialogTriggerProps) {
    const { open, isOpen, triggerRef, uniqueId } = useMorphingDialog();

    const handleClick = useCallback(() => open(), [open]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        },
        [open]
    );

    return (
        <button
            ref={triggerRef}
            className={cn('relative cursor-pointer', className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={style}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={`morphing-dialog-content-${uniqueId}`}
            aria-label={`Open dialog ${uniqueId}`}
        >
            {children}
        </button>
    );
}

export type MorphingDialogContentProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogContent({ children, className, style }: MorphingDialogContentProps) {
    const { close, isOpen, triggerRef, contentRef, uniqueId } = useMorphingDialog();
    const containerRef = contentRef;
    const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(null);
    const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(null);

    // morph (scale/translate) the freshly mounted dialog content from the
    // trigger card's bounds up to its natural centered size.
    useLayoutEffect(() => {
        const content = containerRef.current;
        const trigger = triggerRef.current;
        if (!content || !trigger) return;

        const contentRect = content.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();

        // 1) park the dialog exactly over the trigger card (same top-left
        //    corner + width ratio), invisible to layout but painted there
        gsap.set(content, {
            transformOrigin: '0 0',
            x: triggerRect.left - contentRect.left,
            y: triggerRect.top - contentRect.top,
            scale: triggerRect.width / contentRect.width,
        });

        // 2) animate back to its resting centered state => card "grows" open
        const tween = gsap.to(content, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power3.out',
        });

        return () => {
            tween.kill();
            gsap.set(content, { clearProps: 'transform,transformOrigin' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
            if (event.key === 'Tab') {
                if (!firstFocusableElement || !lastFocusableElement) return;

                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close, firstFocusableElement, lastFocusableElement]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
            const focusableElements = containerRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
                setFirstFocusableElement(focusableElements[0] as HTMLElement);
                setLastFocusableElement(
                    focusableElements[focusableElements.length - 1] as HTMLElement
                );
                (focusableElements[0] as HTMLElement).focus();
            }
        } else {
            document.body.classList.remove('overflow-hidden');
            triggerRef.current?.focus();
        }

        // Cleanup also runs when the dialog unmounts (container returns null on
        // close), so make sure the scroll lock is always released.
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen, containerRef, triggerRef]);

    useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => {
        if (isOpen) {
            close();
        }
    });

    return (
        <div
            ref={containerRef}
            className={cn('overflow-hidden', className)}
            style={style}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`morphing-dialog-title-${uniqueId}`}
            aria-describedby={`morphing-dialog-description-${uniqueId}`}
        >
            {children}
        </div>
    );
}

export type MorphingDialogContainerProps = {
    children: React.ReactNode;
};

function MorphingDialogContainer({ children }: MorphingDialogContainerProps) {
    const { isOpen, backdropRef } = useMorphingDialog();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // backdrop fade-in
    useEffect(() => {
        if (isOpen && backdropRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.25, ease: 'power1.out' }
            );
        }
    }, [isOpen, backdropRef]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <>
            <div
                ref={backdropRef}
                className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur-xs dark:bg-black/40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">{children}</div>
        </>,
        document.body
    );
}

export type MorphingDialogTitleProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogTitle({ children, className, style }: MorphingDialogTitleProps) {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export type MorphingDialogSubtitleProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogSubtitle({ children, className, style }: MorphingDialogSubtitleProps) {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export type MorphingDialogDescriptionProps = {
    children: React.ReactNode;
    className?: string;
};

function MorphingDialogDescription({ children, className }: MorphingDialogDescriptionProps) {
    const ref = useRef<HTMLDivElement>(null);

    // enter animation (slightly delayed so it reads after the container morph)
    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(
            ref.current,
            { opacity: 0, scale: 0.85, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, delay: 0.18, ease: 'power2.out' }
        );
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export type MorphingDialogImageProps = {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
};

function MorphingDialogImage({ src, alt, className, style }: MorphingDialogImageProps) {
    return <img src={src} alt={alt} className={cn(className)} style={style} />;
}

export type MorphingDialogCloseProps = {
    children?: React.ReactNode;
    className?: string;
};

function MorphingDialogClose({ children, className }: MorphingDialogCloseProps) {
    const { close } = useMorphingDialog();
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(
            ref.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.35, delay: 0.18, ease: 'power2.out' }
        );
    }, []);

    return (
        <button
            ref={ref}
            onClick={close}
            type="button"
            aria-label="Close dialog"
            className={cn('absolute top-6 right-6', className)}
        >
            {children || <XIcon size={24} />}
        </button>
    );
}

export {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogTitle,
    MorphingDialogSubtitle,
    MorphingDialogDescription,
    MorphingDialogImage,
};
