import { useRef, useState } from 'react';
import { gsap, Flip, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { LayoutGrid, Notebook, Zap } from 'lucide-react';
import styles from './Hero.module.css';

type ModeType = 'chaos' | 'cleanup' | 'notebook';

const moodItems = [
    { id: 'dreams', src: '/assets/images/moods/dreams.png' },
    { id: 'film', src: '/assets/images/moods/film.png' },
    { id: 'folder', src: '/assets/images/moods/folder.png' },
    { id: 'kem', src: '/assets/images/moods/kem.png' },
    { id: 'lamp', src: '/assets/images/moods/lamp.png' },
    { id: 'lua', src: '/assets/images/moods/lua.png' },
    { id: 'note', src: '/assets/images/moods/note.png' },
    { id: 'pen', src: '/assets/images/moods/pen.png' },
    { id: 'ring', src: '/assets/images/moods/ring.png' },
    { id: 'than', src: '/assets/images/moods/than.png' },
    { id: 'thuoc', src: '/assets/images/moods/thuoc.png' },
    { id: 'tool', src: '/assets/images/moods/tool.png' },
    { id: 'trang', src: '/assets/images/moods/trang.png' },
    { id: 'tro', src: '/assets/images/moods/tro.png' },
];

const buttonItems = [
    { id: 'chaos', icon: <Zap /> },
    { id: 'cleanup', icon: <LayoutGrid /> },
    { id: 'notebook', icon: <Notebook /> },
];

const itemSizes: Record<string, number> = {
    dreams: 260,
    film: 200,
    folder: 160,
    kem: 140,
    lamp: 240,
    lua: 280,
    note: 260,
    pen: 120,
    ring: 320,
    than: 260,
    thuoc: 180,
    tool: 120,
    trang: 220,
    tro: 160,
};

const arrangements = {
    chaos: {
        header: { x: 50, y: 47.5, center: true },
        items: [
            { id: 'note', x: 38, y: 8, rotation: -10 },
            { id: 'lamp', x: 3, y: 1, rotation: 0 },
            { id: 'dreams', x: 8, y: 12, rotation: -12 },
            { id: 'film', x: 2, y: 52, rotation: -15 },
            { id: 'kem', x: 12, y: 45, rotation: 10 },
            { id: 'pen', x: 14, y: 22, rotation: 80 },
            { id: 'trang', x: 8, y: 68, rotation: 25 },
            { id: 'thuoc', x: 0.5, y: 1, rotation: 15 },
            { id: 'lua', x: 62, y: 12, rotation: 0 },
            { id: 'ring', x: 74, y: 2, rotation: 15 },
            { id: 'folder', x: 80, y: 48, rotation: -10 },
            { id: 'than', x: 76, y: 55, rotation: -8 },
            { id: 'tro', x: 68, y: 8, rotation: 0 },
            { id: 'tool', x: 72, y: 35, rotation: 20 },
        ],
    },
    cleanup: {
        header: { x: 70, y: 37.5, center: false },
        items: [
            { id: 'ring', x: 76.5, y: -5, rotation: 0 },
            { id: 'film', x: 74, y: 6, rotation: 0 },
            { id: 'lua', x: 0, y: 47.5, rotation: 0 },
            { id: 'tool', x: 68, y: 23, rotation: 0 },
            { id: 'note', x: 38, y: 8, rotation: 0 },
            { id: 'folder', x: 24.5, y: 33, rotation: 0 },
            { id: 'kem', x: -6, y: 3.5, rotation: 0 },
            { id: 'tro', x: 68, y: 8, rotation: 0 },
            { id: 'dreams', x: 9, y: -3.5, rotation: 0 },
            { id: 'pen', x: 60, y: 65.5, rotation: 0 },
            { id: 'trang', x: 36.5, y: 5.5, rotation: 0 },
            { id: 'thuoc', x: -5, y: 15, rotation: 0 },
            { id: 'lamp', x: 42, y: 28, rotation: 0 },
            { id: 'than', x: 20, y: 62, rotation: 0 },
        ],
    },
    notebook: {
        header: { x: 50, y: 47.5, center: true },
        items: [
            { id: 'ring', x: 45, y: 0.5, rotation: 20 },
            { id: 'tro', x: 65, y: 70, rotation: 25 },
            { id: 'film', x: 27.5, y: 15, rotation: 10 },
            { id: 'tool', x: 75, y: 35, rotation: 0 },
            { id: 'note', x: 30, y: 57.5, rotation: 10 },
            { id: 'folder', x: 25, y: 40, rotation: 10 },
            { id: 'kem', x: 30, y: 7.5, rotation: 30 },
            { id: 'than', x: 50, y: 50, rotation: -5 },
            { id: 'dreams', x: 10, y: 10, rotation: -30 },
            { id: 'trang', x: 16.5, y: 50, rotation: -20 },
            { id: 'thuoc', x: 57.5, y: 20, rotation: 10 },
            { id: 'lamp', x: 40, y: 32, rotation: -15 },
            { id: 'lua', x: 62, y: 45, rotation: 18 },
            { id: 'pen', x: 48, y: 68, rotation: 35 },
        ],
    },
};

export default function Hero() {
    const deskRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const [activeMode, setActiveMode] = useState<ModeType>('cleanup');

    const setLayout = (mode: ModeType) => {
        const desk = deskRef.current;
        const header = headerRef.current;
        if (!desk || !header) return;

        const deskWidth = desk.offsetWidth;
        const deskHeight = desk.offsetHeight;
        const layout = arrangements[mode];

        const isMobile = deskWidth < 1000;
        const offsetX = isMobile
            ? header.offsetWidth / 2
            : layout.header.center
              ? header.offsetWidth / 2
              : 0;
        const offsetY = isMobile
            ? header.offsetHeight / 2
            : layout.header.center
              ? header.offsetHeight / 2
              : 0;
        const headerX = isMobile ? 50 : layout.header.x;
        const headerY = isMobile ? 47.5 : layout.header.y;

        gsap.set(header, {
            x: (headerX / 100) * deskWidth - offsetX,
            y: (headerY / 100) * deskHeight - offsetY,
            rotation: 0,
        });

        layout.items.forEach(({ id, x, y, rotation }) => {
            gsap.set(`[data-mood-id="${id}"]`, {
                x: (x / 100) * deskWidth,
                y: (y / 100) * deskHeight,
                width: itemSizes[id],
                height: itemSizes[id],
                rotation,
            });
        });
    };

    const { contextSafe } = useGSAP(
        () => {
            setLayout('cleanup');
        },
        { scope: deskRef }
    );

    const switchMode = (mode: ModeType) => {
        if (mode === activeMode) return;

        const flipTargets = [headerRef.current, ...itemsRef.current].filter(Boolean);
        const state = Flip.getState(flipTargets);

        setLayout(mode);

        Flip.from(state, {
            duration: 1.25,
            ease: 'power3.inOut',
            stagger: { amount: 0.1, from: 'center' },
            absolute: true,
        });

        setActiveMode(mode);
    };

    return (
        <section className={cn(styles.container)}>
            <div ref={deskRef} className={cn(styles.desk)}>
                <div ref={headerRef} className={cn(styles.header)}>
                    <h1>CREATIVE CLUTTER 𝜗ৎ</h1>
                    <p>
                        Không gian nhỏ cho những ý tưởng rời rạc — nơi một vết cà phê, một trang
                        sổ mở dở và vài thứ bừa bộn trên bàn có cách gặp nhau khi bạn ngừng sắp
                        xếp mọi thứ.
                    </p>
                </div>

                {moodItems.map((mood) => (
                    <div
                        key={mood.id}
                        className={cn(styles.item)}
                        data-mood-id={mood.id}
                        ref={(el) => {
                            if (el && !itemsRef.current.includes(el))
                                itemsRef.current.push(el);
                        }}
                    >
                        <img src={mood.src} alt={mood.id} />
                    </div>
                ))}

                <div className={cn(styles.modes)}>
                    {buttonItems.map((button) => (
                        <button
                            key={button.id}
                            className={cn(styles.mode, activeMode === button.id && styles.active)}
                            onClick={() => contextSafe(switchMode)(button.id as ModeType)}
                            aria-label={button.id}
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
