import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const items = [
    {
        type: 'image',
        src: '/galleryImage/news1.jpg',
        title: 'Samagya Newspaper',
    },
    {
        type: "video",
        embedId: "kbfK4iug84c",
        title: "Phoolon Ki Holi Ladoo Gopal k Sath",
    },
    {
        type: "image",
        src: "/galleryImage/news3.jpg",
        title: "Jhalak Newspaper",
    },
    {
        type: "video",
        embedId: "TEcjzC1jJNA",
        title: "Phoolon Ki Holi 2024 Live",
    }
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            <div className="overflow-hidden relative aspect-video rounded-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        {items[currentIndex].type === 'image' ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={items[currentIndex].src!}
                                    width={1000}
                                    height={1000}
                                    alt={items[currentIndex].title}
                                    className="w-full h-full object-contain bg-purple-800/30 backdrop-blur-sm rounded-2xl border"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-white text-xl font-semibold">
                                        {items[currentIndex].title}
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${items[currentIndex].embedId}`}
                                    title={items[currentIndex].title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-white text-xl font-semibold">
                                        {items[currentIndex].title}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-4 gap-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}