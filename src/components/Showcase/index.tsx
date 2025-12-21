import { motion, MotionValue, useTransform } from 'motion/react';
import { PlusIcon } from 'lucide-react';
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogTitle,
    MorphingDialogImage,
    MorphingDialogSubtitle,
    MorphingDialogClose,
    MorphingDialogDescription,
    MorphingDialogContainer,
} from './morphing-dialog';
import beautyImg from '@/assets/beauty.jpg';
import studyImg from '@/assets/study.jpg';
import activitiesImg from '@/assets/actitvities.jpg';

const showcaseData = [
    {
        id: 1,
        title: 'Beauty 𝜗ৎ',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: beautyImg,
    },
    {
        id: 2,
        title: 'Study 𝜗ৎ',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: studyImg,
    },
    {
        id: 3,
        title: 'Actitivties 𝜗ৎ',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: activitiesImg,
    },
];

export default function Showcase({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
    return (
        <motion.div
            id="showcase"
            style={{ scale, rotate }}
            className="relative h-dvh w-full bg-white"
        >
            <div className="relative mx-auto max-w-7xl space-y-12 py-8 2xl:space-y-16 2xl:py-12">
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                    <h2 className="font-bodoni text-7xl font-semibold tracking-tight">
                        ART STUDY
                    </h2>
                    <p className="font-red-rose text-center text-xl">
                        “Get ready with my study and work hard for my dream.”🦢.⋆
                    </p>
                </div>
                <div className="grid grid-cols-2 place-items-center gap-12 lg:grid-cols-3">
                    {showcaseData.map((item) => (
                        <div key={item.id} className="h-80 w-full">
                            <MorphingDialog
                                transition={{
                                    type: 'spring',
                                    bounce: 0.05,
                                    duration: 0.25,
                                }}
                            >
                                <MorphingDialogTrigger
                                    style={{
                                        borderRadius: '12px',
                                    }}
                                    className="flex w-full flex-col overflow-hidden border border-zinc-950/10 bg-(--color-red-inferno) dark:border-zinc-50/10 dark:bg-zinc-900"
                                >
                                    <MorphingDialogImage
                                        src={item.img}
                                        alt={`Image for ${item.title}`}
                                        className="h-80 w-full object-cover 2xl:h-96"
                                    />
                                    <div className="flex grow flex-row items-end justify-between px-3 py-2">
                                        <div>
                                            <MorphingDialogTitle className="font-red-rose text-white dark:text-zinc-50">
                                                {item.title}
                                            </MorphingDialogTitle>
                                            <MorphingDialogSubtitle className="font-red-rose text-white dark:text-zinc-400">
                                                {item.subtitle}
                                            </MorphingDialogSubtitle>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-white text-white transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                                            aria-label="Open dialog"
                                        >
                                            <PlusIcon size={12} />
                                        </button>
                                    </div>
                                </MorphingDialogTrigger>
                                <MorphingDialogContainer>
                                    <MorphingDialogContent
                                        style={{
                                            borderRadius: '24px',
                                        }}
                                        className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-(--color-red-inferno) sm:w-125 dark:border-zinc-50/10 dark:bg-zinc-900"
                                    >
                                        <MorphingDialogImage
                                            src={item.img}
                                            alt={`Image for ${item.title}`}
                                            className="h-75 w-full object-cover"
                                        />
                                        <div className="p-6">
                                            <MorphingDialogTitle className="font-red-rose text-2xl text-white dark:text-zinc-50">
                                                {item.title}
                                            </MorphingDialogTitle>
                                            <MorphingDialogSubtitle className="font-red-rose text-white dark:text-zinc-400">
                                                {item.subtitle}
                                            </MorphingDialogSubtitle>
                                            <MorphingDialogDescription
                                                disableLayoutAnimation
                                                variants={{
                                                    initial: { opacity: 0, scale: 0.8, y: 100 },
                                                    animate: { opacity: 1, scale: 1, y: 0 },
                                                    exit: { opacity: 0, scale: 0.8, y: 100 },
                                                }}
                                            >
                                                <p className="font-red-rose mt-2 text-white dark:text-zinc-500">
                                                    {item.description}
                                                </p>
                                                <p className="font-red-rose text-white">
                                                    {item.longDescription}
                                                </p>
                                                <a
                                                    className="font-red-rose mt-2 inline-flex text-white underline"
                                                    href="https://www.are.na/block/12759029"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Are.na block
                                                </a>
                                            </MorphingDialogDescription>
                                        </div>
                                        <MorphingDialogClose className="text-zinc-50" />
                                    </MorphingDialogContent>
                                </MorphingDialogContainer>
                            </MorphingDialog>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
