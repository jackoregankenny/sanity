"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Product = {
  name: string
  slug: string
  category: string
  tagline: string
  description: string
  productImage?: any
}

export function ProductsSection({
  title = "Product Portfolio",
  subtitle = "Scientifically formulated solutions for optimal crop protection",
  products
}: {
  title?: string
  subtitle?: string
  products: Product[]
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const productVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Products grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product, index) => {
            // Generate a consistent pseudo-random color for each product
            const colors = [
              { bg: "#0f766e", light: "#f0f9f6" }, // Green
              { bg: "#0052cc", light: "#f0f7ff" }, // Blue
              { bg: "#d4126e", light: "#fdf2f8" }, // Pink
              { bg: "#6366f1", light: "#f5f3ff" }, // Purple
            ];
            const colorIndex = (product.name.charCodeAt(0) + index) % colors.length;
            const color = colors[colorIndex];
            
            return (
              <motion.div 
                key={product.slug} 
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all duration-200 hover:shadow-md"
                variants={productVariants}
              >
                {/* Product image or placeholder */}
                <div className="h-48 relative bg-gray-50 overflow-hidden">
                  {product.productImage ? (
                    <Image 
                      src={product.productImage} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: color.light }}
                    >
                      <div 
                        className="w-24 h-36 rounded-md relative overflow-hidden shadow-lg"
                        style={{ backgroundColor: color.bg }}
                      >
                        <div className="h-6" style={{ backgroundColor: `${color.bg}90`, borderBottom: '1px solid rgba(255,255,255,0.2)' }}></div>
                        <div className="p-1 flex-1 flex flex-col h-full">
                          <div className="mt-1 bg-white rounded p-1 flex-1 flex flex-col items-center justify-center">
                            <div className="text-[8px] uppercase tracking-wider font-semibold text-gray-500">Life Scientific</div>
                            <div className="text-sm font-bold" style={{ color: color.bg }}>{product.name}</div>
                            <div className="text-[6px] mt-0.5 text-gray-500">{product.category}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Category label */}
                  <div 
                    className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full"
                    style={{ 
                      backgroundColor: `${color.bg}20`,
                      color: color.bg 
                    }}
                  >
                    {product.category}
                  </div>
                </div>
                
                {/* Product information */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.tagline}</p>
                  <p className="text-sm text-gray-500 mb-5 line-clamp-3">{product.description}</p>
                  
                  <div className="mt-auto">
                    <Link href={`/products/${product.slug}`} className="inline-flex items-center text-sm font-medium text-[#0f766e] group-hover:underline">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* View all products button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button 
            variant="outline"
            className="border-[#0f766e] text-[#0f766e] hover:bg-[#f0f9f6] hover:text-[#0f766e] px-6 py-6 h-auto rounded-md font-medium"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 