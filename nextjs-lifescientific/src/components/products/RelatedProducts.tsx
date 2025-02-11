import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Image as SanityImage } from 'sanity'

interface RelatedProduct {
  _id: string
  name: string
  slug: { current: string }
  productImage: SanityImage
  category: string
  variants: Array<{ country: string }>
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  currentProductId: string
  currentCountries: string[]
}

export default function RelatedProducts({ products, currentProductId, currentCountries }: RelatedProductsProps) {
  // Filter products that have variants in at least one of the current countries
  const relatedProducts = products
    .filter(product => {
      // Filter out current product
      if (product._id === currentProductId) return false
      
      // Check if product has variants in any of the current countries
      return product.variants.some(variant => 
        currentCountries.includes(variant.country)
      )
    })
    .slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <>
      {relatedProducts.map((product) => {
        const imageUrl = product.productImage ? urlForImage(product.productImage)
          .width(400)
          .height(400)
          .quality(90)
          .url() : null

        return (
          <Link 
            key={product._id} 
            href={`/products/${product.slug.current}`}
            className="group block"
          >
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
              {imageUrl && (
                <div className="relative aspect-square w-full overflow-hidden bg-background">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}
              <CardHeader className="space-y-2 p-4">
                <div className="space-y-2">
                  <h3 className="line-clamp-2 font-medium leading-tight">{product.name}</h3>
                  <Badge variant="secondary" className="capitalize">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {product.variants.map(variant => (
                    <Badge key={variant.country} variant="outline" className="text-xs">
                      {variant.country === 'IE' ? 'IE' : 'UK'}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        )
      })}
    </>
  )
} 