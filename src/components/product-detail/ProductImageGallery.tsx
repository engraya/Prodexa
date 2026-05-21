import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductImageGalleryProps {
  images: string[]
  thumbnail: string
  title: string
}

export function ProductImageGallery({ images, thumbnail, title }: ProductImageGalleryProps) {
  const allImages = images.length > 0 ? images : [thumbnail]
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
        <img
          src={allImages[selected]}
          alt={`${title} — image ${selected + 1} of ${allImages.length}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 flex-wrap" role="list" aria-label="Product images">
          {allImages.map((src, i) => (
            <button
              key={i}
              role="listitem"
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={selected === i}
              className={cn(
                'h-16 w-16 rounded-md overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                selected === i ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
              )}
            >
              <img src={src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
