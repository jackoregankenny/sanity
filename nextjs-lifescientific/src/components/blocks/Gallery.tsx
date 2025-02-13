import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { useState } from 'react'

interface GalleryImage {
  asset: {
    _ref: string
  }
  alt?: string
  caption?: string
}

interface GalleryProps {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

export default function Gallery({ title, subtitle, images, columns = 3 }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
              {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
            {images.map((image, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(image).width(800).height(800).url()}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {image.caption && (
                  <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-6xl aspect-[4/3]">
            <Image
              src={urlFor(selectedImage).width(1920).height(1440).url()}
              alt={selectedImage.alt || 'Gallery image'}
              fill
              className="object-contain"
            />
          </div>
          {selectedImage.caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </>
  )
} 