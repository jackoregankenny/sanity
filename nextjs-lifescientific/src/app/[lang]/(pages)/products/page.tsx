import { type SanityDocument } from "next-sanity"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getTranslations } from "@/hooks/useTranslations"

type LanguageCode = typeof languages[number]['id']

interface ProductDocument extends SanityDocument {
  name: string
  slug: { current: string }
  tagline: string
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  category: 'pesticide' | 'herbicide' | 'fungicide'
  variants: Array<{
    name: string
    activeIngredients: Array<{
      name: string
      amount: string
      units: string
    }>
  }>
}

interface Props {
  params: {
    lang: string
  }
}

// Validate params before using them
async function validateParams(params: { lang: string }): Promise<{ lang: LanguageCode }> {
  if (!languages.some(l => l.id === params.lang)) {
    notFound()
  }
  return { lang: params.lang as LanguageCode }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await validateParams(params)

  try {
    const translations = await getTranslations(lang)
    return {
      title: translations.products.pageTitle,
      description: translations.products.pageDescription,
    }
  } catch (error) {
    // Fallback metadata if translations fail
    return {
      title: 'Products | Life Scientific',
      description: 'Browse our range of agricultural solutions.',
    }
  }
}

// Query to get products in the current language
const PRODUCTS_QUERY = `*[
  _type == "product" &&
  language == $lang &&
  defined(slug.current)
] | order(name asc) {
  _id,
  _type,
  name,
  slug,
  tagline,
  productImage,
  category,
  variants[] {
    name,
    activeIngredients[] {
      name,
      amount,
      units
    }
  }
}`

export default async function ProductsPage({ params }: Props) {
  const { lang } = await validateParams(params)
  const translations = await getTranslations(lang)

  try {
    const products = await client.fetch<ProductDocument[]>(
      PRODUCTS_QUERY,
      { lang },
      { next: { revalidate: 30 } }
    )

    if (!products || products.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">{translations.products.pageTitle}</h1>
            <p className="text-lg text-gray-600 mb-8">
              {translations.products.pageDescription}
            </p>
            <div className="bg-white rounded-lg border p-8 text-center">
              <p className="text-gray-600">{translations.common.noResults}</p>
            </div>
          </div>
        </div>
      )
    }

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      const category = product.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    }, {} as Record<string, ProductDocument[]>)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{translations.products.pageTitle}</h1>
            <p className="text-lg text-gray-600">
              {translations.products.pageDescription}
            </p>
          </div>

          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-semibold mb-8 capitalize">
                {translations.products.categoryLabels[category as keyof typeof translations.products.categoryLabels]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                  const imageUrl = product.productImage?.asset?._ref
                    ? urlFor(product.productImage).width(600).height(600).url()
                    : null

                  // Get the first active ingredient from the first variant
                  const mainIngredient = product.variants?.[0]?.activeIngredients?.[0]

                  return (
                    <Link 
                      key={product._id}
                      href={`/${lang}/products/${product.slug.current}`}
                      className="group"
                    >
                      <article className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                        {imageUrl ? (
                          <div className="relative aspect-square">
                            <Image
                              src={imageUrl}
                              alt={product.productImage?.alt || product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">{translations.common.noResults}</span>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full capitalize">
                              {translations.products.categoryLabels[product.category]}
                            </span>
                          </div>
                          {product.tagline && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                              {product.tagline}
                            </p>
                          )}
                          {mainIngredient && (
                            <p className="text-sm text-gray-500">
                              {mainIngredient.name}: {mainIngredient.amount}{mainIngredient.units}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">{translations.products.pageTitle}</h1>
          <div className="bg-white rounded-lg border p-8">
            <p className="text-red-600">{translations.common.error}</p>
          </div>
        </div>
      </div>
    )
  }
}

// Generate static params for all languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.id
  }))
} 