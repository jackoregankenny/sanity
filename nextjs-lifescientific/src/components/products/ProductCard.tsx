import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity.image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Image as SanityImage } from 'sanity'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    tagline: string
    productImage: SanityImage
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.productImage ? urlForImage(product.productImage)
    .width(400)
    .height(300)
    .quality(80)
    .auto('format')
    .url() : null

  return (
    <Link href={`/products/${product.slug.current}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden">
        {imageUrl && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        )}
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
        </CardContent>
      </Card>
    </Link>
  )
} 