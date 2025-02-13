import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  cta?: {
    text: string
    link: string
  }
}

export default function Hero({ title, subtitle, backgroundImage, cta }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      {backgroundImage?.asset?._ref ? (
        <div className="absolute inset-0">
          <Image
            src={urlFor(backgroundImage).width(1920).height(1080).url()}
            alt={backgroundImage.alt || title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
      )}

      {/* Content */}
      <div className="container relative mx-auto px-4 py-20 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          {subtitle && (
            <p className="text-xl mb-8 text-white/90">{subtitle}</p>
          )}
          {cta && (
            <Link
              href={cta.link}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {cta.text}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
} 