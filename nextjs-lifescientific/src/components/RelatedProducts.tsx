'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface RelatedProduct {
  _id: string
  name: string
  slug: {
    current: string
  }
  productImage?: SanityImage
  category?: {
    name: string
  }
  variants?: Array<{
    country: string
  }>
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  currentCountries: string[]
}

export function RelatedProducts({ products, currentCountries }: RelatedProductsProps) {
  // Filter products that have variants available in any of the current countries
  const filteredProducts = products.filter(product => 
    product.variants?.some(variant => 
      currentCountries.includes(variant.country)
    )
  ).slice(0, 4) // Show up to 4 related products

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {filteredProducts.map((product) => (
        <Link 
          key={product._id}
          href={`/products/${product.slug.current}`}
          className="group"
        >
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader className="p-4">
              {product.productImage && (
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={urlForImage(product.productImage)?.width(400).height(400).url() || ''}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {product.category && (
                <Badge variant="secondary" className="mb-2">
                  {product.category.name}
                </Badge>
              )}
              <h3 className="font-semibold">{product.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 