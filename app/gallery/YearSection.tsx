import type React from "react"
import Masonry from "react-masonry-css"
import MediaCard from "./MediaCard"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  alt: string
}

interface YearSectionProps {
  year: string
  media: MediaItem[]
}

const YearSection: React.FC<YearSectionProps> = ({ media }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className="mb-12">
      {/* <h2 className="text-3xl font-semibold mb-4">{year}</h2> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {media.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </Masonry>
    </div>
  )
}

export default YearSection

