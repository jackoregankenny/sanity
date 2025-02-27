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
import { motion } from "framer-motion"
import { Search, Filter, X, ArrowRight, LayoutGrid, List, Info, Check, FileText, Leaf, Wheat, Plane as Plant, Zap, Eye } from "lucide-react"

// Product categories from schema with more descriptive icons
const CATEGORIES: Array<{ value: CategoryValue; label: string; icon: React.ReactNode }> = [
  { value: 'pesticide', label: 'Pesticide', icon: <X size={14} className="mr-1" /> },
  { value: 'herbicide', label: 'Herbicide', icon: <Leaf size={14} className="mr-1" /> },
  { value: 'fungicide', label: 'Fungicide', icon: <FileText size={14} className="mr-1" /> },
  { value: 'insecticide', label: 'Insecticide', icon: <Info size={14} className="mr-1" /> }
] as const

// Common crops with icons for quick filters
const COMMON_CROPS = [
  { value: 'Wheat', icon: <Wheat size={14} className="mr-1" /> },
  { value: 'Corn', icon: <Plant size={14} className="mr-1" /> },
  { value: 'Potatoes', icon: <Plant size={14} className="mr-1" /> },
  { value: 'Barley', icon: <Wheat size={14} className="mr-1" /> },
] as const

type CategoryValue = 'pesticide' | 'herbicide' | 'fungicide' | 'insecticide'
type ViewMode = 'grid' | 'table'

// Remove the predefined CROPS constant and replace with a function to get unique crops
const getUniqueCrops = (products: ProductDocument[]) => {
  return [...new Set(products.flatMap(p => p.supportedCrops?.map(c => c.crop) || []))]
}

// Improved search function that includes crops
const enhancedSearch = (product: ProductDocument, query: string): boolean => {
  if (!query) return true;
  
  const searchText = query.toLowerCase();
  
  // Check product name
  if (product.name.toLowerCase().includes(searchText)) return true;
  
  // Check product tagline
  if (product.tagline && product.tagline.toLowerCase().includes(searchText)) return true;
  
  // Check supported crops - this is the key improvement
  if (product.supportedCrops && product.supportedCrops.some(c => 
    c.crop.toLowerCase().includes(searchText)
  )) return true;
  
  // Check active ingredients
  if (product.variants && product.variants.some(v => 
    v.activeIngredients && v.activeIngredients.some(i => 
      i.name.toLowerCase().includes(searchText)
    )
  )) return true;
  
  return false;
};

interface ProductCardProps {
  product: ProductDocument
  lang: string
  index: number
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

// Simplified product card designed for non-technical farmers
const ProductCard = memo(function ProductCard({ product, lang, index }: ProductCardProps) {
  const imageUrl = product.productImage?.asset?._ref
  const variantCount = product.variants?.length || 0
  const cropCount = product.supportedCrops?.length || 0
  
  // Get first variant for details
  const firstVariant = product.variants?.[0]
  
  // Get active ingredients from all variants
  const activeIngredients = product.variants?.flatMap(v => v.activeIngredients || []) || []
  const uniqueIngredients = [...new Set(activeIngredients.map(i => i.name))]
  
  // Generate a consistent color based on the product category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'pesticide': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', accent: '#1e40af' };
      case 'herbicide': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', accent: '#166534' };
      case 'fungicide': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', accent: '#92400e' };
      case 'insecticide': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', accent: '#b91c1c' };
      default: return { bg: 'bg-[#f0f9f6]', text: 'text-[#0f766e]', border: 'border-[#e0f2ed]', accent: '#0f766e' };
    }
  };
  
  const categoryColor = getCategoryColor(product.category.value);
  const categoryInfo = CATEGORIES.find(c => c.value === product.category.value);

  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Link 
        href={`/${lang}/products/${product.slug.current}`}
        className="block h-full"
      >
        <article className="h-full flex flex-col bg-white rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-[#e0f2ed] relative overflow-hidden">
          {/* Product Image - changed to 1:1 aspect ratio */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
            {imageUrl ? (
              <Image
                src={urlFor(imageUrl).width(600).height(600).url()}
                alt={product.productImage?.alt || product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#f0f9f6] to-white flex items-center justify-center">
                <div className="text-[#0f766e] opacity-70 font-medium text-lg">Life Scientific</div>
              </div>
            )}
            
            {/* Category badge - more prominent */}
            <div className="absolute top-3 left-3 flex items-center gap-1">
              <div className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border} border shadow-sm`}>
                {categoryInfo?.icon}
                {product.category.label}
              </div>
            </div>
            
            {/* Formulation type badge if available */}
            {firstVariant?.formulationType && (
              <div className="absolute bottom-3 right-3">
                <div className="px-2 py-1 rounded-md bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-800 shadow-sm border border-gray-200">
                  {firstVariant.formulationType.label}
                </div>
              </div>
            )}
          </div>

          {/* Product Details - simplified and farmer-friendly */}
          <div className="flex-1 p-5">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-[#0f766e] transition-colors">
              {product.name}
            </h3>
            
            {product.tagline && (
              <p className="text-gray-600 text-sm mb-3">
                {product.tagline}
              </p>
            )}
            
            {/* Active ingredients */}
            {uniqueIngredients.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1">
                {uniqueIngredients.map((ingredient, i) => (
                  <Badge key={i} variant="secondary" className="bg-gray-100">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Crops section - Most important for farmers */}
            {product.supportedCrops && product.supportedCrops.length > 0 && (
              <div className="mt-2 mb-2">
                <div className="font-medium text-sm text-gray-900 mb-2">Works with:</div>
                <div className="flex flex-wrap gap-1.5">
                  {product.supportedCrops.slice(0, 5).map((cropItem, i) => (
                    <Badge key={i} variant="outline" className="bg-white text-xs">
                      <Plant size={12} className="mr-1 text-green-600" />
                      {cropItem.crop}
                      {cropItem.dosage && (
                        <span className="ml-1 text-gray-500">
                          {cropItem.dosage.amount}{cropItem.dosage.unit}
                        </span>
                      )}
                    </Badge>
                  ))}
                  {product.supportedCrops.length > 5 && (
                    <Badge variant="outline" className="bg-white text-xs">
                      +{product.supportedCrops.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Feature/benefit highlight - if available */}
            {(product.benefits?.[0] || product.features?.[0]) && (
              <div className="mt-3 border-t border-gray-100 pt-3">
                <div className="text-xs text-gray-600">
                  {product.benefits?.[0]?.title || product.features?.[0]?.title}
                </div>
              </div>
            )}
          </div>

          {/* Action footer */}
          <div className="px-5 pb-5 pt-2 border-t border-gray-100">
            <button 
              className="w-full flex items-center justify-center gap-2 bg-[#f0f9f6] text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-colors duration-300 py-2 px-3 rounded-md font-medium text-sm"
            >
              <Eye size={16} />
              View Details
            </button>
          </div>
        </article>
      </Link>
    </motion.div>
  )
})

// Table Row Component - Simplified for farmers but with more details
const ProductTableRow = memo(function ProductTableRow({ product, lang, index }: ProductCardProps) {
  const imageUrl = product.productImage?.asset?._ref
  const variantCount = product.variants?.length || 0
  const cropCount = product.supportedCrops?.length || 0

  // Get active ingredients from all variants
  const activeIngredients = product.variants?.flatMap(v => v.activeIngredients || []) || []
  const uniqueIngredients = [...new Set(activeIngredients.map(i => i.name))]
  
  // Get container sizes
  const containerSizes = [...new Set(product.variants?.flatMap(v => v.containerSizes || []) || [])]

  // Generate a consistent color based on the product category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'pesticide': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
      case 'herbicide': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      case 'fungicide': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' };
      case 'insecticide': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      default: return { bg: 'bg-[#f0f9f6]', text: 'text-[#0f766e]', border: 'border-[#e0f2ed]' };
    }
  };
  
  const categoryColor = getCategoryColor(product.category.value);
  const categoryInfo = CATEGORIES.find(c => c.value === product.category.value);
  
  return (
    <motion.tr 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.03 }}
      className="border-b border-gray-100 hover:bg-gray-50/50 group"
    >
      <td className="py-4 pl-4 pr-3">
        <Link 
          href={`/${lang}/products/${product.slug.current}`}
          className="flex items-center gap-3"
        >
          {imageUrl ? (
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <Image 
                src={urlFor(imageUrl).width(200).height(200).url()}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-md bg-[#f0f9f6] flex items-center justify-center flex-shrink-0 border border-[#e0f2ed]">
              <div className="text-[#0f766e] text-xs font-medium">LS</div>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 group-hover:text-[#0f766e] transition-colors">
              {product.name}
            </div>
            {product.tagline && (
              <div className="text-gray-500 text-sm truncate max-w-xs">
                {product.tagline}
              </div>
            )}
            
            {/* Formulation types */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {product.variants.slice(0, 2).map((variant, i) => (
                  variant.formulationType && (
                    <span key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                      {variant.formulationType.label}
                    </span>
                  )
                ))}
                {product.variants.length > 2 && (
                  <span className="text-xs text-gray-500">+{product.variants.length - 2} more</span>
                )}
              </div>
            )}
          </div>
        </Link>
      </td>
      <td className="px-3 py-4">
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border} border`}>
          {categoryInfo?.icon}
          {product.category.label}
        </div>
        
        {/* Active ingredients */}
        {uniqueIngredients.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {uniqueIngredients.join(', ')}
          </div>
        )}
      </td>
      <td className="px-3 py-4">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {product.supportedCrops?.slice(0, 3).map((cropItem, i) => (
            <Badge key={i} variant="outline" className="bg-white text-xs">
              <Plant size={12} className="mr-1 text-green-600" />
              {cropItem.crop}
              {cropItem.dosage && (
                <span className="ml-1 text-gray-500">
                  {cropItem.dosage.amount}{cropItem.dosage.unit}
                </span>
              )}
            </Badge>
          ))}
          {product.supportedCrops && product.supportedCrops.length > 3 && (
            <Badge variant="outline" className="bg-white text-xs">
              +{product.supportedCrops.length - 3} more
            </Badge>
          )}
        </div>
        
        {/* Container sizes if available */}
        {containerSizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {containerSizes.map((size, i) => (
              <span key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                {size}
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="pl-3 pr-4 py-4 text-right">
        <Link 
          href={`/${lang}/products/${product.slug.current}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#f0f9f6] text-[#0f766e] h-9 px-4 py-2 hover:bg-[#0f766e] hover:text-white transition-colors"
        >
          <Eye size={16} className="mr-2" />
          View Details
        </Link>
      </td>
    </motion.tr>
  );
});

interface ProductsGridProps {
  products: ProductDocument[]
  translations: Translations
  lang: string
}

// Grid style updates for visual improvement
const gridStyles = {
  backgroundImage: `
    linear-gradient(to right, rgba(15, 118, 110, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 118, 110, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: '2rem 2rem',
  backgroundPosition: 'center center'
};

export function ProductsGrid({ products, translations, lang }: ProductsGridProps) {
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryValue | null>(null)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

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

  // Helper to check if a crop is in common crops
  const isCommonCrop = (crop: string) => {
    return COMMON_CROPS.some(c => c.value.toLowerCase() === crop.toLowerCase())
  }

  // Get crop icon
  const getCropIcon = (crop: string) => {
    const commonCrop = COMMON_CROPS.find(c => c.value.toLowerCase() === crop.toLowerCase())
    return commonCrop?.icon || <Plant size={14} className="mr-1" />
  }

  // Memoized filter function with improved search
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search term filter - enhanced to search crops
      if (deferredSearchTerm && !enhancedSearch(product, deferredSearchTerm)) {
        return false;
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
    <div className="container mx-auto px-4 pb-16">
      {/* Search and filter controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 items-center">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center justify-center p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#0f766e]' : 'text-gray-500 hover:text-gray-700'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center justify-center p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm text-[#0f766e]' : 'text-gray-500 hover:text-gray-700'}`}
              aria-label="Table view"
            >
              <List size={18} />
            </button>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg"
          >
            <Filter size={16} />
            Filters
            {selectedCrops.length > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-[#0f766e] text-white text-xs rounded-full">
                {selectedCrops.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick crop filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {COMMON_CROPS.map((crop) => (
          <button
            key={crop.value}
            onClick={() => {
              startTransition(() => {
                if (selectedCrops.includes(crop.value)) {
                  setSelectedCrops(prev => prev.filter(c => c !== crop.value))
                } else {
                  setSelectedCrops(prev => [...prev, crop.value])
                }
              })
            }}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
              selectedCrops.includes(crop.value)
                ? 'bg-[#0f766e] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {crop.icon}
            {crop.value}
          </button>
        ))}
        {selectedCrops.length > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Filter panel */}
      {isFiltersVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          {/* Categories */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    startTransition(() => {
                      setActiveCategory(category.value === activeCategory ? null : category.value)
                    })
                  }}
                  className={`flex items-center gap-2 p-2 border rounded-md transition-colors ${
                    category.value === activeCategory
                      ? 'bg-[#f0f9f6] border-[#0f766e] text-[#0f766e]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crops */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Crops</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableCrops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => {
                    startTransition(() => {
                      if (selectedCrops.includes(crop)) {
                        setSelectedCrops(prev => prev.filter(c => c !== crop))
                      } else {
                        setSelectedCrops(prev => [...prev, crop])
                      }
                    })
                  }}
                  className={`flex items-center gap-2 p-2 border rounded-md transition-colors ${
                    selectedCrops.includes(crop)
                      ? 'bg-[#f0f9f6] border-[#0f766e] text-[#0f766e]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Plant size={16} />
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results info */}
      {!isPending && (
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCrops.length > 0 && ' with selected filters'}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={gridStyles}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-full bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-5">
                <div className="h-6 w-3/4 bg-gray-100 animate-pulse mb-3 rounded-md" />
                <div className="h-4 w-5/6 bg-gray-100 animate-pulse mb-4 rounded-md" />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-gray-100 animate-pulse rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {!isPending && filteredProducts.length > 0 && viewMode === 'grid' && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative" 
          style={gridStyles}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              lang={lang}
              index={index} 
            />
          ))}
        </motion.div>
      )}

      {/* Table View - Simplified for farmers */}
      {!isPending && filteredProducts.length > 0 && viewMode === 'table' && (
        <div className="bg-white rounded-lg border overflow-hidden">
          <motion.table 
            className="min-w-full divide-y divide-gray-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3 pl-4 pr-3 text-left">Product</th>
                <th scope="col" className="px-3 py-3 text-left">Type & Ingredients</th>
                <th scope="col" className="px-3 py-3 text-left">Crops & Sizes</th>
                <th scope="col" className="pl-3 pr-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProducts.map((product, index) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  lang={lang}
                  index={index}
                />
              ))}
            </tbody>
          </motion.table>
        </div>
      )}

      {/* No results */}
      {!isPending && filteredProducts.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f0f9f6] flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-[#0f766e]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any products matching your search criteria.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 bg-[#f0f9f6] text-[#0f766e] hover:bg-[#0f766e] hover:text-white transition-colors py-2 px-4 rounded-md font-medium"
          >
            <Filter size={16} />
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
} 