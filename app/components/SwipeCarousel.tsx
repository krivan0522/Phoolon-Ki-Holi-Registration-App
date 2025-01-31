import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

const content = [
    {
        type: "image",
        url: "/galleryImage/news1.jpg",
        title: "Samagya Newspaper",
        description: "Howrah Me Braj Ke Jaisi Phoolon Ki Holi Ka Bhavya Aayojan"
    },
    {
        type: "video",
        embedId: "kbfK4iug84c",
        title: "Phoolon Ki Holi Ladoo Gopal k Sath",
        description: "Watch The highlights of Phoolon Ki Holi and what our organizers has to say about it"
    },
    {
        type: "image",
        url: "/galleryImage/news3.jpg",
        title: "Jhalak Newspaper",
        description: "Chintamani Maidan me kheli gyi Phoolon ki holi"
    },
    {
        type: "video",
        embedId: "TEcjzC1jJNA",
        title: "Phoolon Ki Holi 2024 Live",
        description: "Missed the event? Watch the full event here"
    }
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 15;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const SwipeCarousel = () => {
    const [contentIndex, setContentIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const dragX = useMotionValue(0);

    useEffect(() => {
        if (isVideoPlaying) return;

        const intervalRef = setInterval(() => {
            setContentIndex((pv) => {
                if (pv === content.length - 1) {
                    return 0;
                }
                return pv + 1;
            });
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, [isVideoPlaying]);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && contentIndex < content.length - 1) {
            setContentIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && contentIndex > 0) {
            setContentIndex((pv) => pv - 1);
        }
    };

    return (
        <div className="relative overflow-hidden bg-purple-800/30 backdrop-blur-sm rounded-2xl border">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${contentIndex * 100}%`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab items-center active:cursor-grabbing w-full"
            >
                <Content contentIndex={contentIndex} setIsVideoPlaying={setIsVideoPlaying} />
            </motion.div>

            <Dots contentIndex={contentIndex} setContentIndex={setContentIndex} />
            <GradientEdges />
        </div>
    );
};

const Content = ({ contentIndex, setIsVideoPlaying }: { contentIndex: number; setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleMessage = useCallback((event: { data: { event: 'command' | 'infoDelivery'; func: string; info: { playerState: number | undefined; }; }; }) => {
        if (event.data && event.data.event) {
            switch (event.data.event) {
                case 'command':
                    if (event.data.func === 'playVideo') {
                        setIsVideoPlaying(true);
                    } else if (event.data.func === 'pauseVideo') {
                        setIsVideoPlaying(false);
                    }
                    break;
                case 'infoDelivery':
                    if (event.data.info && event.data.info.playerState !== undefined) {
                        setIsVideoPlaying(event.data.info.playerState === 1);
                    }
                    break;
            }
        }
    }, [setIsVideoPlaying]);

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage]);

    return (
        <>
            {content.map((item, idx) => {
                return (
                    <motion.div
                        key={idx}
                        animate={{
                            scale: contentIndex === idx ? 0.95 : 0.85,
                        }}
                        transition={SPRING_OPTIONS}
                        className="w-full min-w-full px-4 py-8"
                    >
                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black bg-transparent">
                            {item.type === "image" ? (
                                <Image
                                    src={item.url!}
                                    alt={item.title}
                                    className="w-full h-full object-contain"
                                    width={106}
                                    height={900}
                                    unoptimized
                                />
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${item.embedId}?autoplay=0&enablejsapi=1`}
                                    title={item.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="border-0"
                                />
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                                {item.title}
                            </h2>
                            <p className="text-gray-300 mt-2 text-lg">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

const Dots = ({ contentIndex, setContentIndex }: { contentIndex: number; setContentIndex: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            {content.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setContentIndex(idx)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${idx === contentIndex
                                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 scale-125"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            {/* <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-purple-900/80 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-blue-900/80 to-transparent" /> */}
        </>
    );
};

export default SwipeCarousel;