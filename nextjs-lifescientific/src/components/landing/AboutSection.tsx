"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Leaf, Droplet, Sprout, Landmark } from 'lucide-react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { SanityImage } from '@/types/sanity'

interface AboutSectionProps {
  title: string
  subtitle?: string
  description: string
  values?: string[]
  image?: SanityImage
}

export function AboutSection({
  title = "Our Mission",
  subtitle = "Advancing agriculture through science",
  description = "Life Scientific was founded with a clear purpose: to develop agricultural solutions that balance effectiveness with environmental responsibility. Through rigorous research and innovation, we create products that help farmers maximize productivity while preserving natural resources for future generations.",
  values = [
    "Scientific excellence",
    "Environmental stewardship",
    "Agricultural advancement",
    "Global collaboration"
  ],
  image
}: AboutSectionProps) {
  // Track mouse position for image hover effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  // Throttle mouse tracking to improve performance
  const [isThrottled, setIsThrottled] = useState(false)
  
  // Spring animation with optimized settings - less stiffness means less calculation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 }) // Reduced stiffness
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 }) // Reduced stiffness
  
  // Handle mouse movement for parallax effect with throttling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isThrottled) return
    
    setIsThrottled(true)
    setTimeout(() => setIsThrottled(false), 50) // Only update every 50ms
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }
  }
  
  // Icon mapping for values
  const getValueIcon = (index: number) => {
    const icons = [
      <Sprout key="science" className="h-3 w-3 text-[#0f766e]" />,
      <Droplet key="environment" className="h-3 w-3 text-[#0f766e]" />,
      <Leaf key="agriculture" className="h-3 w-3 text-[#0f766e]" />,
      <Landmark key="global" className="h-3 w-3 text-[#0f766e]" />
    ]
    return icons[index % icons.length]
  }
  
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Simplified background decorations */}
      <motion.div 
        className="absolute -right-40 bottom-0 w-80 h-80 rounded-full bg-[#0f766e]/5 blur-3xl will-change-transform"
        animate={{ 
          x: isInView ? mousePosition.x * -10 : 0, // Reduced movement
          y: isInView ? mousePosition.y * -10 : 0, // Reduced movement
        }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Simplified animation
      ></motion.div>
      <motion.div 
        className="absolute -left-40 top-40 w-60 h-60 rounded-full bg-green-50 opacity-70 blur-3xl will-change-transform"
        animate={{ 
          x: isInView ? mousePosition.x * 10 : 0, // Reduced movement
          y: isInView ? mousePosition.y * 10 : 0, // Reduced movement
        }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Simplified animation
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header - mobile only */}
        <div className="text-center mb-16 lg:hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center rounded-full bg-[#f0f9f6] px-3 py-1 mb-5"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }} // Reduced stiffness
            >
              <span className="text-sm font-medium text-[#0f766e]">{subtitle}</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
          </motion.div>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image column - now with optimized interactive images */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Main image with optimized hover effect */}
              <motion.div 
                className="rounded-2xl shadow-xl overflow-hidden will-change-transform"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "tween", duration: 0.3 }} // Using tween instead of spring for better performance
              >
                {image && urlForImage(image) ? (
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={urlForImage(image)!.url()}
                      alt={image.alt || "About Life Scientific"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] relative">
                    <motion.div
                      style={{
                        x: useTransform(springX, [-0.5, 0.5], [5, -5]), // Reduced movement range
                        y: useTransform(springY, [-0.5, 0.5], [5, -5]), // Reduced movement range
                      }}
                      className="absolute inset-0 w-[calc(100%+10px)] h-[calc(100%+10px)] -ml-[5px] -mt-[5px] will-change-transform" // Reduced size for better performance
                    >
                      <Image
                        src="/images/sustainable-farming.jpg"
                        alt="Sustainable farming"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </motion.div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f766e]/30 to-transparent mix-blend-multiply"></div>
                
                {/* Decorative badge with animation */}
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-white rounded-full p-4 shadow-lg will-change-transform"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
                >
                  <div className="bg-[#0f766e] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
                    <div className="text-center leading-tight">
                      <div className="text-xl">15+</div>
                      <div className="text-xs">Years</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Floating smaller image 1 - with optimized parallax effect */}
              <motion.div 
                className="absolute -bottom-8 -left-8 w-32 h-32 md:w-40 md:h-40 rounded-lg shadow-lg overflow-hidden border-4 border-white will-change-transform"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }} // Reduced scale amount
                style={{
                  x: useTransform(springX, [-0.5, 0.5], [-5, 5]), // Reduced movement range
                  y: useTransform(springY, [-0.5, 0.5], [3, -3]), // Reduced movement range
                }}
              >
                <Image
                  src="/images/crop-inspection.jpg"
                  alt="Crop inspection"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
              
              {/* Floating smaller image 2 - with optimized parallax effect */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg overflow-hidden border-4 border-white will-change-transform"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }} // Reduced scale amount
                style={{
                  x: useTransform(springX, [-0.5, 0.5], [3, -3]), // Reduced movement range
                  y: useTransform(springY, [-0.5, 0.5], [-3, 3]), // Reduced movement range
                }}
              >
                <Image
                  src="/images/lab-research.jpg"
                  alt="Laboratory research"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="max-w-xl">
              {/* Section header - desktop only */}
              <div className="hidden lg:block mb-8">
                <motion.div 
                  className="inline-flex items-center justify-center rounded-full bg-[#f0f9f6] px-3 py-1 mb-5"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
                >
                  <span className="text-sm font-medium text-[#0f766e]">{subtitle}</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col h-full will-change-transform"
                    whileHover={{ y: -5 }} // Simplified hover effect
                  >
                    <div className="flex items-center mb-3">
                      <motion.div 
                        className="mr-3 h-8 w-8 flex-shrink-0 rounded-full bg-[#f0f9f6] flex items-center justify-center will-change-transform"
                        whileHover={{ scale: 1.1 }} // Simplified hover effect
                        transition={{ type: "tween", duration: 0.2 }} // Using tween
                      >
                        {getValueIcon(index)}
                      </motion.div>
                      <h3 className="font-semibold text-gray-900">{value}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Our commitment to {value.toLowerCase()} drives our approach to creating solutions for modern agriculture.
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-[#f0f9f6] rounded-xl p-6 border border-[#0f766e]/10 will-change-transform"
                whileHover={{ y: -5 }} // Simplified hover effect
              >
                <blockquote className="italic text-gray-700">
                  "Our goal is to deliver innovative solutions that empower farmers to succeed while protecting the land they cultivate."
                </blockquote>
                <div className="mt-3 flex items-center">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-[#0f766e] flex items-center justify-center mr-3 will-change-transform"
                    whileHover={{ scale: 1.1 }} // Simplified hover effect
                    transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
                  >
                    <span className="text-white font-medium text-sm">JS</span>
                  </motion.div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">John Smith</div>
                    <div className="text-xs text-gray-600">CEO, Life Scientific</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 