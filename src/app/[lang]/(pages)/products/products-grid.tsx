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

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

// Product categories from schema
const CATEGORIES: Array<{ value: CategoryValue; label: string }> = [
  { value: 'pesticide', label: 'Pesticide' },
  { value: 'herbicide', label: 'Herbicide' },
  { value: 'fungicide', label: 'Fungicide' },
  { value: 'insecticide', label: 'Insecticide' }
] as const

type CategoryValue = 'pesticide' | 'herbicide' | 'fungicide' | 'insecticide'

// ... existing code ...

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

        <div className="flex-1 p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="inline-flex">
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

        <div className="px-4 pb-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {variantCount > 0 && (
              <Badge variant="outline" className="inline-flex">
                {variantCount} {variantCount === 1 ? 'Region' : 'Regions'}
              </Badge>
            )}
            {cropCount > 0 && (
              <Badge variant="outline" className="inline-flex">
                {cropCount} {cropCount === 1 ? 'Crop' : 'Crops'}
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
})

// ... rest of existing code ... 