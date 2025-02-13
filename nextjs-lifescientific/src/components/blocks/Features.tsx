import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface Feature {
  title: string
  description: string
  icon?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

interface FeaturesProps {
  title: string
  subtitle?: string
  features: Feature[]
  layout?: 'grid' | 'list'
}

export default function Features({ title, subtitle, features, layout = 'grid' }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`
          ${layout === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-8 max-w-3xl mx-auto'
          }
        `}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`
                bg-white p-8 rounded-lg shadow-sm
                ${layout === 'list' ? 'flex items-start gap-6' : ''}
              `}
            >
              {feature.icon?.asset?._ref && (
                <div className={layout === 'list' ? 'flex-shrink-0' : 'mb-6'}>
                  <div className="relative w-12 h-12">
                    <Image
                      src={urlFor(feature.icon).width(48).height(48).url()}
                      alt={feature.icon.alt || feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 