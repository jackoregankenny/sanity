import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface RelatedProduct {
  id: string
  name: string
  slug: string
  image?: {
    url: string
    alt: string
  }
  category: string
}

interface RelatedProductsProps {
  sectionTitle: string
  products: RelatedProduct[]
  className?: string
  lang: string
}

export function RelatedProducts({
  sectionTitle,
  products,
  className,
  lang
}: RelatedProductsProps) {
  return (
    <section className={cn("py-16 bg-muted", className)}>
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          {sectionTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/products/${product.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-none">
                {product.image ? (
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-muted-foreground/10 rounded">
                      {product.category}
                    </span>
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