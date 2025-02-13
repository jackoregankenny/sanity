import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import { notFound } from "next/navigation"
import { type LanguageCode } from "@/hooks/useTranslations"
import { getTranslations } from "@/hooks/useTranslations"
import { languages } from "@/config/languages"
import { Metadata } from "next"
import Image from "next/image"
import { urlFor } from "@/sanity/image"
import { Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ActiveIngredient {
  name: string
  amount: string
  units: string
}

interface ProductDocument extends SanityDocument {
  name: string
  description: string
  tagline?: string
  category: 'pesticide' | 'herbicide' | 'fungicide'
  variants: Array<{
    name: string
    sku: string
    formulationType: keyof typeof formulationTypes
    registrationNumber: string
    containerSizes: string[]
    activeIngredients: ActiveIngredient[]
    documents?: Array<{
      name: string
      url: string
    }>
  }>
  features?: Array<{
    title: string
    description: string
  }>
  benefits?: Array<{
    title: string
    description: string
  }>
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

interface Props {
  params: {
    lang: string
    slug: string
  }
}

const formulationTypes = {
  SL: 'Soluble Concentrate',
  EC: 'Emulsifiable Concentrate',
  SC: 'Suspension Concentrate',
  WP: 'Wettable Powder',
  WG: 'Water Dispersible Granules'
} as const

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Generate metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await Promise.resolve(props.params)
  validateLanguage(params.lang)

  const product = await client.fetch<ProductDocument | null>(
    `*[_type == "product" && slug.current == $slug && language == $lang][0]`,
    { slug: params.slug, lang: params.lang }
  )

  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  return {
    title: product.name,
    description: product.tagline
  }
}

// Add a helper function to group variants by region
function groupVariantsByRegion(variants: ProductDocument['variants']) {
  return variants.reduce((acc, variant) => {
    acc[variant.name] = variant;
    return acc;
  }, {} as Record<string, ProductDocument['variants'][0]>);
}

export default async function ProductPage(props: Props) {
  const params = await Promise.resolve(props.params)
  validateLanguage(params.lang)
  const translations = await getTranslations(params.lang)

  try {
    const product = await client.fetch<ProductDocument | null>(
      `*[_type == "product" && slug.current == $slug && language == $lang][0]`,
      { slug: params.slug, lang: params.lang },
      { next: { tags: ['product'] } }
    )

    if (!product) {
      notFound()
    }

    const variantsByRegion = groupVariantsByRegion(product.variants);
    const regions = Object.keys(variantsByRegion);
    const defaultRegion = regions[0];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container max-w-[80%] mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Product Image */}
              <div className="order-2 lg:order-1 sticky top-24">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    {product.productImage?.asset?._ref ? (
                      <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
                        <Image
                          src={urlFor(product.productImage).width(800).height(800).url()}
                          alt={product.productImage.alt || product.name}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400">{translations.common.noResults}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Product Overview */}
              <div className="flex flex-col order-1 lg:order-2 lg:pl-8">
                <div className="mb-8">
                  <Badge variant="secondary" className="mb-6 capitalize text-sm px-3 py-1">
                    {translations.products.categoryLabels[product.category]}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                  {product.tagline && (
                    <p className="text-xl text-muted-foreground font-medium">{product.tagline}</p>
                  )}
                </div>

                <Separator className="mb-8" />

                {/* Quick Overview */}
                <div className="prose prose-gray max-w-none mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features & Benefits Summary */}
                <div className="space-y-8">
                  {/* Features Summary */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">Key Features</h3>
                      <div className="grid gap-4">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium mb-1">{feature.title}</h4>
                              <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits Summary */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">Key Benefits</h3>
                      <div className="grid gap-4">
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium mb-1">{benefit.title}</h4>
                              <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* View All Features & Benefits Button */}
                {((product.features && product.features.length > 2) || (product.benefits && product.benefits.length > 2)) && (
                  <button
                    onClick={() => document.getElementById('features-benefits')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-8 text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center gap-2"
                  >
                    View All Features & Benefits
                    <span className="text-lg">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features & Benefits Full Section */}
        {((product.features && product.features.length > 0) || (product.benefits && product.benefits.length > 0)) && (
          <div id="features-benefits" className="bg-white border-b">
            <div className="container max-w-[80%] mx-auto px-4 py-16">
              <div className="space-y-16">
                {/* All Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4 p-6 bg-muted rounded-xl">
                          <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-4 p-6 bg-muted rounded-xl">
                          <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium mb-2">{benefit.title}</h4>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Regional Variants */}
        <div className="container max-w-[80%] mx-auto px-4 py-16">
          <Tabs defaultValue={defaultRegion} className="space-y-8">
            <TabsList className="w-full justify-start bg-transparent p-0 rounded-none border-b">
              {regions.map((region) => (
                <TabsTrigger
                  key={region}
                  value={region}
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none px-8"
                >
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Region Tabs */}
            {regions.map((region) => {
              const variant = variantsByRegion[region];
              
              return (
                <TabsContent key={region} value={region} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Product Details */}
                    <div className="md:col-span-2">
                      <Card>
                        <CardHeader className="pb-6">
                          <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          <div>
                            <h4 className="text-sm font-medium mb-3">Registration Information</h4>
                            <div className="grid gap-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">SKU</span>
                                <span className="font-medium">{variant.sku}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Registration Number</span>
                                <span className="font-medium">{variant.registrationNumber}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Formulation Type</span>
                                <span className="font-medium">{formulationTypes[variant.formulationType]}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-3">Available Pack Sizes</h4>
                            <div className="flex flex-wrap gap-2">
                              {variant.containerSizes.map((size, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {size}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Active Ingredients */}
                          <div>
                            <h4 className="text-sm font-medium mb-3">Active Ingredients</h4>
                            <div className="grid gap-3">
                              {variant.activeIngredients.map((ingredient, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                  <span className="font-medium">{ingredient.name}</span>
                                  <Badge variant="secondary">
                                    {ingredient.amount} {ingredient.units}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Documents Section - Right Column */}
                    {variant.documents && variant.documents.length > 0 && (
                      <div>
                        <Card>
                          <CardHeader className="pb-6">
                            <CardTitle>Product Documents</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-3">
                              {variant.documents.map((doc, idx) => (
                                <a
                                  key={idx}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors group"
                                >
                                  <span className="font-medium group-hover:text-primary transition-colors">
                                    {doc.name.toUpperCase()}
                                  </span>
                                  <span className="text-primary">→</span>
                                </a>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-[80%] mx-auto px-4 py-16">
          <div className="bg-white rounded-xl border p-8">
            <h1 className="text-4xl font-bold mb-8">{translations.common.error}</h1>
          </div>
        </div>
      </div>
    )
  }
}

// Generate static params for all products in all languages
export async function generateStaticParams() {
  const products = await client.fetch<Array<{ slug: { current: string }, language: string }>>(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      "language": language
    }`
  )

  return products.map((product) => ({
    lang: product.language,
    slug: product.slug,
  }))
} 