import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileIcon } from "lucide-react"
import type { Image as SanityImage } from 'sanity'
import ProductActions from './ProductActions'
import RelatedProducts from './RelatedProducts'

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    tagline: string
    description: string
    productImage: SanityImage
    category: string
    variants: Array<{
      country: string
      crop: string
      cropGroup: string
      approvalNumber: string
      formulationType: string
      mechanismOfAction: string
      containerSize: string
      sizeUnit: string
      details: Array<{
        _type: string
        name?: string
        amount?: string
        units?: string
        documentType?: string
        file?: {
          asset: {
            url: string
          }
        }
      }>
    }>
  }
  relatedProducts: Array<{
    _id: string
    name: string
    slug: { current: string }
    productImage: SanityImage
    category: string
    variants: Array<{ country: string }>
  }>
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const imageUrl = product.productImage ? urlForImage(product.productImage)
    .width(500)
    .height(500)
    .quality(100)
    .url() : null

  // Get unique countries from variants
  const countries = [...new Set(product.variants.map(v => v.country))]

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Image */}
        <div className="sticky top-8 h-fit lg:px-8">
          {imageUrl && (
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-background shadow-sm">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Product Info & Actions */}
        <div className="flex flex-col gap-8 lg:pr-8">
          <div>
            <Badge variant="secondary" className="mb-4 capitalize">
              {product.category}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.tagline}</p>
            <div className="mt-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {countries.map(country => (
              <Badge key={country} variant="outline" className="text-base">
                {country === 'IE' ? 'Ireland' : 'United Kingdom'}
              </Badge>
            ))}
          </div>

          <ProductActions />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="border-t">
        <div className="py-12">
          <Tabs defaultValue={product.variants[0]?.country || 'IE'} className="w-full">
            <div className="mb-8">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                {product.variants.map((variant, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={variant.country}
                    className="rounded-none border-b-2 border-transparent px-8 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    {variant.country === 'IE' ? 'Ireland' : 'United Kingdom'}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {product.variants.map((variant, index) => (
              <TabsContent key={index} value={variant.country}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Product Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Crop</p>
                        <p className="font-medium">{variant.crop}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Crop Group</p>
                        <p className="font-medium">{variant.cropGroup}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Approval Number</p>
                        <p className="font-medium">{variant.approvalNumber}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technical Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Formulation Type</p>
                        <p className="font-medium">{variant.formulationType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Mechanism of Action</p>
                        <p className="font-medium">{variant.mechanismOfAction}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Container Size</p>
                        <p className="font-medium">{`${variant.containerSize} ${variant.sizeUnit}`}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Ingredients */}
                  {variant.details.some(detail => detail._type === 'activeIngredient') && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Ingredients</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-3">
                        {variant.details
                          .filter(detail => detail._type === 'activeIngredient')
                          .map((ingredient, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center justify-between rounded-lg border bg-card p-4"
                            >
                              <span className="font-medium">{ingredient.name}</span>
                              <Badge variant="secondary">
                                {`${ingredient.amount} ${ingredient.units}`}
                              </Badge>
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Documents */}
                {variant.details.some(detail => detail._type === 'productDocument') && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-medium">Documentation</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {variant.details
                        .filter(detail => detail._type === 'productDocument')
                        .map((doc, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            asChild
                            className="h-auto justify-start gap-3 p-4"
                          >
                            <a
                              href={doc.file?.asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <FileIcon className="h-5 w-5" />
                              <span>{doc.documentType?.toUpperCase()} Document</span>
                            </a>
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="border-t py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
          <p className="mt-2 text-muted-foreground">
            Other products available in {countries.map(c => c === 'IE' ? 'Ireland' : 'United Kingdom').join(' and ')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <RelatedProducts 
            products={relatedProducts} 
            currentProductId={product._id} 
            currentCountries={countries}
          />
        </div>
      </div>
    </div>
  )
} 