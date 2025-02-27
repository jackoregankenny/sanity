'use client'

import * as React from 'react'
import { useState, useTransition, useDeferredValue, useCallback, useMemo, memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/image"
import type { ProductDocument, Translations } from "./types"
import { cn } from "@/lib/utils"

// Product categories from schema
const CATEGORIES: Array<{ value: CategoryValue; label: string }> = [
  { value: 'pesticide', label: 'Pesticide' },
  { value: 'herbicide', label: 'Herbicide' },
  { value: 'fungicide', label: 'Fungicide' },
  { value: 'insecticide', label: 'Insecticide' }
] as const

type CategoryValue = 'pesticide' | 'herbicide' | 'fungicide' | 'insecticide'

// Remove the predefined CROPS constant and replace with a function to get unique crops
const getUniqueCrops = (products: ProductDocument[]) => {
  return [...new Set(products.flatMap(p => p.supportedCrops?.map(c => c.crop) || []))]
}

interface ProductCardProps {
  product: ProductDocument
  lang: string
}

// Memoized product card component
const ProductCard = memo(function ProductCard({ product, lang }: ProductCardProps) {
  const imageUrl = product.productImage?.asset?._ref
  const variantCount = product.variants?.length || 0
  const cropCount = product.supportedCrops?.length || 0

  return (
    <Link 
      href={`/${lang}/products/${product.slug.current}`}
      className="group block"
    >
      <article className="h-full flex flex-col bg-white rounded-lg border transition-shadow hover:shadow-lg">
        {/* Product Image */}
        {imageUrl && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
            <Image
              src={urlFor(imageUrl).width(800).height(600).url()}
              alt={product.productImage?.alt || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}

        {/* Product Details */}
        <div className="flex-1 p-4">
          <div className="mb-2">
            <Badge variant="secondary">
              {product.category.label}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="px-4 pb-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {variantCount > 0 && (
              <Badge variant="outline">
                {variantCount} {variantCount === 1 ? 'Region' : 'Regions'}
              </Badge>
            )}
            {cropCount > 0 && (
              <Badge variant="outline">
                {cropCount} {cropCount === 1 ? 'Crop' : 'Crops'}
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
})

interface ProductsGridProps {
  products: ProductDocument[]
  translations: Translations
  lang: string
}

export function ProductsGrid({ products, translations, lang }: ProductsGridProps) {
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryValue | null>(null)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])

  // Use deferred value for search to avoid UI jank
  const deferredSearchTerm = useDeferredValue(searchTerm)

  // Get all unique crops from the products
  const availableCrops = useMemo(() => getUniqueCrops(products), [products])

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setActiveCategory(null)
      setSelectedCrops([])
      setSearchTerm("")
    })
  }, [])

  // Memoized filter function
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search term filter
      if (deferredSearchTerm && !product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (activeCategory && product.category.value !== activeCategory) {
        return false
      }

      // Crops filter
      if (selectedCrops.length > 0) {
        const productCrops = product.supportedCrops?.map(c => c.crop) || []
        if (!selectedCrops.some(crop => productCrops.includes(crop))) {
          return false
        }
      }

      return true
    })
  }, [products, deferredSearchTerm, activeCategory, selectedCrops])

  return (
    <div className="py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder={translations.products?.search || "Search products..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="whitespace-nowrap"
          >
            {translations.common?.clearFilters || "Clear filters"}
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-3">{translations.products?.categories || "Categories"}</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ value, label }) => (
                <Badge 
                  key={value}
                  variant={value === activeCategory ? "default" : "outline"}
                  onClick={() => {
                    startTransition(() => {
                      setActiveCategory(value === activeCategory ? null : value)
                    })
                  }}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Crops */}
          {availableCrops.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">{translations.products?.crops || "Crops"}</h3>
              <div className="flex flex-wrap gap-2">
                {availableCrops.map((crop) => (
                  <Badge 
                    key={crop}
                    variant={selectedCrops.includes(crop) ? "default" : "outline"}
                    onClick={() => {
                      startTransition(() => {
                        setSelectedCrops(prev => 
                          prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
                        )
                      })
                    }}
                  >
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isPending ? (
          // Loading state
          [...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">{translations.common?.noResults || "No results found"}</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product}
              lang={lang}
            />
          ))
        )}
      </div>
    </div>
  )
} 