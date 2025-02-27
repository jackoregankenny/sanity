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
      {/* Hero Section with improved styling and subtle pattern background */}
      <div className="relative overflow-hidden bg-[#f9fafb] border-b min-h-[50vh] flex items-center">
        {/* Subtle pattern background */}
        <div className="absolute inset-0">
          <div 
            className="h-full w-full opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f766e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        
        {/* Abstract orbital elements */}
        <div className="absolute right-0 top-1/4 w-96 h-96 opacity-10 md:opacity-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full border-2 border-[#0f766e]/20 animate-[spin_60s_linear_infinite]">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#0f766e]"
                style={{ 
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateX(${96*2}px) translateY(-50%)` 
                }}
              />
            ))}
          </div>
          
          <div className="absolute top-[15%] bottom-[15%] left-[15%] right-[15%] rounded-full border border-[#0f766e]/20 animate-[spin_80s_linear_infinite_reverse]">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-5 h-0.5 rounded-full bg-[#0f766e]/20"
                style={{ 
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateX(${96/1.5}px) translateY(-50%)` 
                }}
              />
            ))}
          </div>
          
          <div className="absolute top-[30%] bottom-[30%] left-[30%] right-[30%] rounded-full bg-[#0f766e]/5 animate-pulse"></div>
        </div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-3xl">
            {/* Announcement badge */}
            <div className="mb-8 inline-flex items-center rounded-full bg-[#f0f9f6] border border-[#e0f2ed] px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-[#10b981] mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#10b981] opacity-75"></span>
              </span>
              <span className="text-sm font-medium text-[#0f766e]">Latest agricultural solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              <span className="block">{translations.products.pageTitle}</span>
              <span className="block text-[#0f766e]">for optimal crop performance</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              {translations.products.pageDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid with shadow decoration */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Decorative gradient shadow */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-100 to-transparent"></div>
        
        {/* Add subtle teal pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230f766e' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px'
          }}
        ></div>
        
        {/* Add subtle teal accents */}
        <div className="absolute top-32 left-1/4 w-64 h-64 rounded-full bg-[#0f766e]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-[#0f766e]/5 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl px-4 py-16 relative z-10">
          {/* Add value proposition banner instead of floating elements */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center p-3 bg-[#f0f9f6] rounded-full">
              <div className="text-[#0f766e]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-semibold text-gray-900">Nature Approved Solutions</div>
              <div className="text-sm text-gray-600">All our products are developed for sustainable farming practices</div>
            </div>
            
            <div className="flex items-center p-3 bg-[#f0f9f6] rounded-full ml-0 md:ml-8">
              <div className="text-[#0f766e]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 8V21H3V8M23 3H1V8H23V3ZM12 12H12.01V12.01H12V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-semibold text-gray-900">Eco-Certified Products</div>
              <div className="text-sm text-gray-600">Scientifically proven and environmentally validated</div>
            </div>
          </div>
          
          <ProductsGrid 
            products={products} 
            translations={translations}
            lang={lang}
          />
        </div>
      </div>
    </>
  )
}

// Server Component
export default async function ProductsPage(props: Props) {
  const params = await Promise.resolve((await props.params))
  validateLanguage(params.lang)

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="animate-pulse space-y-4 container mx-auto max-w-7xl px-4 py-16">
          {/* Hero skeleton */}
          <div className="h-12 bg-gray-200 rounded w-1/6 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-16"></div>
          
          {/* Filters skeleton */}
          <div className="h-10 bg-gray-200 rounded w-full mb-8"></div>
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border p-4 h-64">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      }>
        <ProductsContent lang={params.lang} />
      </Suspense>
    </div>
  )
} 