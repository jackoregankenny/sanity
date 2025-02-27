import { client } from "@/sanity/client"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getTranslations } from "@/hooks/useTranslations"
import type { LanguageCode } from "@/hooks/useTranslations"
import type { ProductDocument } from "./types"
import { ProductsGrid } from "./products-grid"
import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"

interface Props {
  params: Promise<{
    lang: string
  }>
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
  noStore() // Opt out of caching for dynamic metadata
  try {
    const params = await Promise.resolve((await props.params))
    validateLanguage(params.lang)
    const translations = await getTranslations(params.lang)
    return {
      title: translations.products.pageTitle,
      description: translations.products.pageDescription,
      alternates: {
        languages: Object.fromEntries(
          languages.map(lang => [lang.id, `/${lang.id}/products`])
        )
      }
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
  description,
  productImage,
  category,
  variants[]{
    name,
    formulationType,
    activeIngredients[]{
      name,
      amount,
      units
    }
  },
  supportedCrops[]{
    crop
  }
}`

async function ProductsContent({ lang }: { lang: string }) {
  noStore() // Opt out of caching for dynamic data
  const translations = await getTranslations(lang)
  const products = await client.fetch<ProductDocument[]>(
    getProductsQuery,
    { language: lang },
    { cache: 'no-store' } // Next.js 15 no longer caches by default
  )

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{translations.products.pageTitle}</h1>
        <p className="text-gray-600">{translations.common.noResults}</p>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{translations.products.pageTitle}</h1>
            <p className="text-xl text-muted-foreground">{translations.products.pageDescription}</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductsGrid 
        products={products} 
        translations={translations}
        lang={lang}
      />
    </>
  )
}

// Server Component
export default async function ProductsPage(props: Props) {
  const params = await Promise.resolve((await props.params))
  validateLanguage(params.lang)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <Suspense fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border p-4 h-64"></div>
              ))}
            </div>
          </div>
        }>
          <ProductsContent lang={params.lang} />
        </Suspense>
      </div>
    </div>
  )
} 