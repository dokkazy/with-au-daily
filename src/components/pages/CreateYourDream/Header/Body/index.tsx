import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Body.module.scss';
import type { JSX } from 'react';
import { useSmoothScroll } from '@/hooks/use-lenis';

type BodyProps = {
    links: {
        title: string;
        href: string;
        src: string;
    }[];
    selectedLink: { isActive: boolean; index: number };
    setSelectedLink: (link: { isActive: boolean; index: number }) => void;
    onLinkClick: () => void;
};

export default function Body({ links, selectedLink, setSelectedLink, onLinkClick }: BodyProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    // char stagger on mount (replaces the `translate` variants with custom delays)
    useGSAP(
        () => {
            gsap.fromTo(
                `.${styles.body} p span`,
                { y: '100%', opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.inOut',
                    stagger: (_i: number, el: HTMLElement, list: HTMLElement[]) => {
                        const wordIndex = Math.floor(Array.from(list).indexOf(el) / 2);
                        return wordIndex * 0.1;
                    },
                }
            );
        },
        { scope: rootRef }
    );

    // blur non-selected links on hover (replaces the `blur` variants)
    useGSAP(
        () => {
            const paragraphs = rootRef.current?.querySelectorAll(`.${styles.body} > a > p`);
            if (!paragraphs) return;
            paragraphs.forEach((p, index) => {
                gsap.to(p, {
                    filter:
                        selectedLink.isActive && selectedLink.index != index
                            ? 'blur(4px)'
                            : 'blur(0px)',
                    opacity: selectedLink.isActive && selectedLink.index != index ? 0.6 : 1,
                    duration: 0.3,
                });
            });
        },
        { dependencies: [selectedLink], scope: rootRef }
    );

    // Create scroll handlers for each link (must be called at top level)
    const scrollHandlers = [
        useSmoothScroll(links[0].href),
        useSmoothScroll(links[1].href),
        useSmoothScroll(links[2].href),
        useSmoothScroll(links[3].href),
    ];

    const getChars = (word: string) => {
        const chars: JSX.Element[] = [];
        word.split('').forEach((char, i) => {
            chars.push(<span key={char + i}>{char}</span>);
        });
        return chars;
    };

    return (
        <div ref={rootRef} className={styles.body}>
            {links.map((link, index) => {
                const { title, href } = link;

                return (
                    <a
                        key={`l_${index}`}
                        href={href}
                        onClick={(e) => {
                            scrollHandlers[index](e);
                            onLinkClick();
                        }}
                    >
                        <p
                            onMouseOver={() => {
                                setSelectedLink({ isActive: true, index });
                            }}
                            onMouseLeave={() => {
                                setSelectedLink({ isActive: false, index });
                            }}
                        >
                            {getChars(title)}
                        </p>
                    </a>
                );
            })}
        </div>
    );
}
