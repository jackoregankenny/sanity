interface VideoProps {
  title?: string
  subtitle?: string
  url: string
  type: 'youtube' | 'vimeo' | 'file'
  poster?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

export default function Video({ title, subtitle, url, type, poster }: VideoProps) {
  const getEmbedUrl = (url: string, type: 'youtube' | 'vimeo' | 'file') => {
    if (type === 'file') return url

    const videoId = type === 'youtube' 
      ? url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
      : url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)?.[1]

    if (!videoId) return url

    return type === 'youtube'
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`
  }

  const embedUrl = getEmbedUrl(url, type)

  return (
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

        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
            {type === 'file' ? (
              <video
                src={url}
                poster={poster?.asset?._ref ? poster.asset._ref : undefined}
                controls
                className="absolute inset-0 w-full h-full"
              >
                <p>Your browser doesn&apos;t support HTML5 video.</p>
              </video>
            ) : (
              <iframe
                src={embedUrl}
                title={title || 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 