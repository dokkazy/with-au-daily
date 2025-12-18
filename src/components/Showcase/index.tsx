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
import heroImg from '@/assets/hero.jpg';

const showcaseData = [
    {
        id: 1,
        title: 'EB27',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: heroImg,
    },
    {
        id: 2,
        title: 'EB27',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: heroImg,
    },
    {
        id: 3,
        title: 'EB27',
        subtitle: 'Edouard Wilfrid Buquet',
        description:
            'Little is known about the life of Édouard-Wilfrid Buquet. He was born in France in 1866, but the time and place of his death is unfortunately a mystery.',
        longDescription:
            'Research conducted in the 1970s revealed that he’d designed the “EB 27” double-arm desk lamp in 1925, handcrafting it from nickel-plated brass, aluminium and varnished wood.',
        img: heroImg,
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
            <div className="relative mx-auto max-w-7xl space-y-16 py-12">
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                    <h2 className="font-bodoni text-7xl font-semibold tracking-tight">SHOWCASE</h2>
                    <p className="text-center font-red-rose text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consectetur
                        quam libero quaerat reiciendis autem, dolor cupiditate, exercitationem et
                        dolores est nisi ipsam qui nam molestiae sit quae delectus aut.
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
                                    className="flex w-full flex-col overflow-hidden border border-zinc-950/10 bg-[#f4f0ea] dark:border-zinc-50/10 dark:bg-zinc-900"
                                >
                                    <MorphingDialogImage
                                        src={item.img}
                                        alt={`Image for ${item.title}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="flex grow flex-row items-end justify-between px-3 py-2">
                                        <div>
                                            <MorphingDialogTitle className="text-zinc-950 dark:text-zinc-50 font-red-rose">
                                                {item.title}
                                            </MorphingDialogTitle>
                                            <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400 font-red-rose">
                                                {item.subtitle}
                                            </MorphingDialogSubtitle>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
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
                                        className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-[#f4f0ea] sm:w-125 dark:border-zinc-50/10 dark:bg-zinc-900"
                                    >
                                        <MorphingDialogImage
                                            src={item.img}
                                            alt={`Image for ${item.title}`}
                                            className="h-75 w-full object-cover"
                                        />
                                        <div className="p-6">
                                            <MorphingDialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50 font-red-rose">
                                                {item.title}
                                            </MorphingDialogTitle>
                                            <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400 font-red-rose">
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
                                                <p className="mt-2 text-zinc-500 dark:text-zinc-500 font-red-rose">
                                                    {item.description}
                                                </p>
                                                <p className="text-zinc-500 font-red-rose">
                                                    {item.longDescription}
                                                </p>
                                                <a
                                                    className="mt-2 inline-flex text-zinc-500 underline font-red-rose"
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
