import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  name: string
  slug: string
  tagline?: string
  category: string
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

interface Props {
  title: string
  subtitle: string
  products: Product[]
}

export function ProductsSection({ title, subtitle, products }: Props) {
  return (
    <section className="bg-gray-50">
      <div className="container max-w-[80%] mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg transition-shadow group-hover:shadow-xl">
                <CardContent className="p-0">
                  {product.productImage?.asset?._ref ? (
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={urlFor(product.productImage).width(600).height(450).url()}
                        alt={product.productImage.alt || product.name}
                        fill
                        className="object-contain p-8"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground">Product image coming soon</span>
                    </div>
                  )}
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-4 capitalize">
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.tagline && (
                      <p className="text-muted-foreground">
                        {product.tagline}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 