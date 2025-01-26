import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  alt: string
}

interface MediaCardProps {
  item: MediaItem
}

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    const videoElement = document.getElementById(`video-${item.id}`) as HTMLVideoElement
    if (videoElement) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isPlaying ? videoElement.pause() : videoElement.play()
    }
  }

  return (
    <motion.div
      className="mb-4 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {item.type === "image" ? (
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
          onClick={()=>{
            window.open(item.src)
          }}
        />
      ) : (
        <div className="relative">
          <video
            id={`video-${item.id}`}
            src={item.src}
            className="rounded-lg shadow-lg w-full"
            loop
            muted
            playsInline
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-12 h-12 text-white" /> : <Play className="w-12 h-12 text-white" />}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default MediaCard

