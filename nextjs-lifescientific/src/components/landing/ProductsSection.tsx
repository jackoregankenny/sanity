"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity.image'
import { LandingProductItem } from '@/types/sanity'

interface ProductsSectionProps {
  title: string
  subtitle?: string
  products: LandingProductItem[]
}

export function ProductsSection({
  title = "Our Products",
  subtitle = "Research-backed agricultural solutions",
  products = []
}: ProductsSectionProps) {
  // If no products are provided, display a placeholder state
  const hasProducts = products && products.length > 0
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
        
        {/* Products grid */}
        {hasProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard 
                key={product._id || index}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          // Placeholder state when no products are available
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 mb-4">No products available at the moment.</p>
            <p className="text-sm text-gray-400">Products will appear here once they are added in Sanity CMS.</p>
          </div>
        )}
        
        {/* View all products button */}
        {hasProducts && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#0f766e] text-white font-medium hover:bg-[#0f766e]/90 transition-colors"
            >
              View All Products
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Individual product card component
function ProductCard({ product, index }: { product: LandingProductItem, index: number }) {
  const imageUrl = product.productImage && urlForImage(product.productImage) 
    ? urlForImage(product.productImage)!.url() 
    : '/images/product-placeholder.jpg'
  
  // Calculate staggered animation delay based on index
  const delay = 0.1 + (index * 0.1)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Product image - updated to 1:1 ratio */}
      <div className="relative aspect-square w-full bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category badge */}
        {product.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0f766e] text-xs font-medium px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}
      </div>
      
      {/* Product content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        {product.tagline && (
          <p className="text-sm font-medium text-[#0f766e] mb-3">
            {product.tagline}
          </p>
        )}
        
        {product.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {product.shortDescription}
          </p>
        )}
        
        {/* Supported Crops Section - New */}
        {product.supportedCrops && product.supportedCrops.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 mb-2">Supported Crops:</div>
            <div className="flex flex-wrap gap-1.5">
              {product.supportedCrops.slice(0, 3).map((crop, i) => (
                <span key={i} className="inline-flex items-center bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                  <svg className="w-3 h-3 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {crop.crop}
                </span>
              ))}
              {product.supportedCrops.length > 3 && (
                <span className="inline-block text-xs text-gray-500">
                  +{product.supportedCrops.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Link to product detail page */}
        {product.slug && (
          <Link 
            href={`/products/${product.slug.current}`}
            className="mt-auto inline-flex items-center text-[#0f766e] font-medium hover:underline"
          >
            Learn More
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  )
} 