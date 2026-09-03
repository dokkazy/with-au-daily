import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { PlusIcon } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
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
import beautyImg from '@/assets/images/beauty.jpg';
import studyImg from '@/assets/images/study.jpg';
import activitiesImg from '@/assets/images/actitvities.jpg';
import { cn } from '@/lib/utils';

const showcaseData = [
    {
        id: 1,
        title: 'Beauty 𝜗ৎ',
        subtitle: 'Rituels de Beauté et d’Âme',
        description:
            'Beauty là không gian nơi bạn quay về với cảm nhận tinh tế của chính mình. Ở đây, vẻ đẹp không bị định nghĩa bởi tiêu chuẩn, mà được nuôi dưỡng từ sự chậm rãi, chăm sóc và ý thức sống. ',
        longDescription: '',
        img: beautyImg,
    },
    {
        id: 2,
        title: 'Study 𝜗ৎ',
        subtitle: 'L’Art d’Étudier en Silence',
        description:
            'Study là không gian dành cho sự tập trung và khai mở trí tuệ. Tại đây, việc học không bị áp lực bởi thành tích, mà được dẫn dắt bởi sự tò mò và khao khát hiểu sâu. ',
        longDescription: '',
        img: studyImg,
    },
    {
        id: 3,
        title: 'Actitivties 𝜗ৎ',
        subtitle: 'Fragments d’une Vie Créative',
        description:
            'Activities là không gian ghi lại những hành động nuôi dưỡng cuộc sống hằng ngày. Tại đây, mỗi hoạt động được lựa chọn một cách có ý thức, giúp bạn duy trì sự cân bằng giữa cơ thể, cảm xúc và trí tuệ. ',
        longDescription: '',
        img: activitiesImg,
    },
];

export default function Showcase() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isDesktop) return;
            gsap.fromTo(
                rootRef.current,
                { rotate: 1 },
                {
                    rotate: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#page-scroll',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                    },
                }
            );
        },
        { dependencies: [isDesktop] }
    );

    return (
        <div
            ref={rootRef}
            id="art-study"
            className={cn('relative min-h-dvh w-full bg-white', isDesktop ? '' : 'mb-24')}
        >
            <div className="xl:max-w-8xl relative mx-auto space-y-12 px-4 py-8 sm:px-12 lg:max-w-7xl 2xl:space-y-16 2xl:py-12">
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                    <h2 className="font-bodoni text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                        ART STUDY 𝜗ৎ
                    </h2>
                    <p className="font-red-rose text-center text-base sm:text-lg md:text-xl">
                        “Get ready with my study and work hard for my dream.”🦢.⋆
                    </p>
                </div>
                <div className="grid grid-cols-1 place-items-center gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3 2xl:gap-12">
                    {showcaseData.map((item) => (
                        <div key={item.id} className="h-auto w-full">
                            <MorphingDialog>
                                <MorphingDialogTrigger
                                    style={{
                                        borderRadius: '12px',
                                    }}
                                    className="flex w-full flex-col overflow-hidden border border-zinc-950/10 bg-(--color-red-inferno) dark:border-zinc-50/10 dark:bg-zinc-900"
                                >
                                    <MorphingDialogImage
                                        src={item.img}
                                        alt={`Image for ${item.title}`}
                                        className="h-96 w-full object-cover sm:h-120 md:h-80 2xl:h-96"
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
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 cursor-pointer appearance-none items-center justify-center rounded-lg border border-white text-white transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                                            aria-label="Open dialog"
                                        >
                                            <PlusIcon size={12} />
                                        </div>
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
                                            <MorphingDialogDescription>
                                                <p className="font-red-rose mt-2 text-white dark:text-zinc-500">
                                                    {item.description}
                                                </p>
                                                <p className="font-red-rose text-white">
                                                    {item.longDescription}
                                                </p>
                                                <a
                                                    className="font-red-rose mt-2 inline-flex text-white underline"
                                                    href="https://www.notion.so/study-and-beauty-29f206edeb2b81929807de791857ba71"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    no.tion block
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
        </div>
    );
}
