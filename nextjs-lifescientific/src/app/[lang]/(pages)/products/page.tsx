import { type SanityDocument } from "next-sanity"
import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getTranslations } from "@/hooks/useTranslations"
import type { LanguageCode } from "@/hooks/useTranslations"

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
}

interface Props {
  params: {
    lang: string
  }
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.id,
  }))
}

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Generate metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await Promise.resolve(props.params)
    validateLanguage(params.lang)
    const translations = await getTranslations(params.lang)
    return {
      title: translations.products.pageTitle,
      description: translations.products.pageDescription,
    }
  } catch {
    // Fallback metadata if validation or translations fail
    return {
      title: 'Products | Life Scientific',
      description: 'Browse our range of agricultural solutions.',
    }
  }
}

// Query to get products in the current language
const getProductsQuery = `*[
  _type == "product" &&
  language == $language &&
  defined(slug.current)
]|order(_createdAt desc){
  _id,
  _type,
  name,
  slug,
  tagline,
  productImage,
  category
}`

export default async function ProductsPage(props: Props) {
  const params = await Promise.resolve(props.params)
  validateLanguage(params.lang)
  const translations = await getTranslations(params.lang)

  try {
    const products = await client.fetch<ProductDocument[]>(
      getProductsQuery,
      { language: params.lang },
      { next: { tags: ['product'] } }
    )

    if (!products || products.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 py-16">
            <div className="bg-white rounded-lg border p-8 text-center">
              <h1 className="text-4xl font-bold mb-4">{translations.products.pageTitle}</h1>
              <p className="text-gray-600">{translations.common.noResults}</p>
            </div>
          </div>
        </div>
      )
    }

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    }, {} as Record<ProductDocument['category'], ProductDocument[]>)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{translations.products.pageTitle}</h1>
            <p className="text-xl text-gray-600">{translations.products.pageDescription}</p>
          </div>

          {/* Products by Category */}
          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 capitalize">
                {translations.products.categoryLabels[category as ProductDocument['category']]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                  const imageUrl = product.productImage?.asset?._ref
                    ? urlFor(product.productImage).width(600).height(600).url()
                    : null

                  return (
                    <Link 
                      key={product._id}
                      href={`/${params.lang}/products/${product.slug.current}`}
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
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {product.tagline}
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
          <div className="bg-white rounded-lg border p-8">
            <h1 className="text-4xl font-bold mb-8">{translations.common.error}</h1>
          </div>
        </div>
      </div>
    )
  }
} 