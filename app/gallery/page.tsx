"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import YearSection from "./YearSection"
import { SwipeCarousel } from "../components/SwipeCarousel"

const galleryData: { [key: string]: { id: number; type: "video" | "image"; src: string; alt: string; }[] } = {
    2023: [
        { id: 1, type: "image", src: "/galleryImage/2022/1.jpg", alt: "Image 1 2022" },
        { id: 2, type: "image", src: "/galleryImage/2022/5.jpg", alt: "Image 2 2022" },
        { id: 3, type: "image", src: "/galleryImage/2022/3.jpg", alt: "Image 3 2022" },
        { id: 4, type: "video", src: "/galleryImage/2022/8v.mp4", alt: "Video 1 2022" },
        { id: 5, type: "image", src: "/galleryImage/2022/9.jpg", alt: "Image 4 2022" },
        { id: 6, type: "image", src: "/galleryImage/2022/4.jpg", alt: "Image 5 2022" },
        { id: 7, type: "image", src: "/galleryImage/2022/6.jpg", alt: "Image 6 2022" },
        { id: 8, type: "image", src: "/galleryImage/2022/2.jpg", alt: "Image 7 2022" },
        { id: 9, type: "image", src: "/galleryImage/2022/7.jpg", alt: "Image 8 2022" },
        { id: 10, type: "image", src: "/galleryImage/2022/10.jpg", alt: "Image 9 2022" },
        { id: 11, type: "video", src: "/galleryImage/2022/11v.mp4", alt: "Video 2 2022" },
        { id: 12, type: "image", src: "/galleryImage/2024/1.jpg", alt: "Image 1 2024" },
        { id: 13, type: "image", src: "/galleryImage/2024/2.png", alt: "Image 2 2024" },
    ],
}

export default function Gallery() {
    const [selectedYear] = useState<string | null>(null)

    const years = Object.keys(galleryData).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 p-10">
            <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Previous Year Highlights</h1>
            <SwipeCarousel />
            <h1 className="text-4xl font-bold text-center text-indigo-700 my-8">Gallery</h1>
            {/* <div className="flex justify-center space-x-4 mb-8">
                {years.map((year) => (
                    <motion.button
                        key={year}
                        className={`px-4 py-2 rounded-full ${selectedYear === year ? "bg-white text-white-foreground" : "bg-secondary text-secondary-foreground"
                            }`}
                        onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {year}
                    </motion.button>
                ))}
            </div> */}
            <AnimatePresence mode="wait">
                {(selectedYear ? [selectedYear] : years).map((year) => (
                    <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <YearSection year={year} media={galleryData[year]} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

