"use client"

import React, { useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BarChart3, FlaskConical, Microscope, Globe2, Quote } from 'lucide-react'
import Image from 'next/image'

type ResearchStat = {
  value: string
  label: string
  icon?: React.ReactNode
}

type ResearchApproach = {
  title: string
  description: string
}

export function ResearchSection({
  title = "Life Scientific Research",
  subtitle = "Our Scientific Approach",
  stats = [
    { value: "15+", label: "Years of Research" },
    { value: "98.3%", label: "Effectiveness Rate" },
    { value: "40+", label: "Countries Served" },
    { value: "12", label: "Research Centers" }
  ],
  description = "At Life Scientific, every product represents years of rigorous research and testing. Our team of scientists continuously works to develop solutions that address the evolving challenges of modern agriculture while prioritizing environmental sustainability.",
  researchApproaches = [
    {
      title: "Rigorous Testing",
      description: "Each product undergoes extensive field trials in diverse agricultural environments."
    },
    {
      title: "Innovative Formulations",
      description: "Our scientists develop specialized compounds that maximize effectiveness while minimizing environmental impact."
    },
    {
      title: "Data-Driven Approach",
      description: "We continuously analyze performance metrics to refine and improve our agricultural solutions."
    }
  ],
  image,
  quoteText = "Our goal is to deliver innovative solutions that empower farmers to succeed while protecting the land they cultivate.",
  quoteAuthor = "John Smith",
  quoteRole = "CEO, Life Scientific"
}: {
  title?: string
  subtitle?: string
  stats?: ResearchStat[]
  description?: string
  researchApproaches?: ResearchApproach[]
  image?: any
  quoteText?: string
  quoteAuthor?: string
  quoteRole?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  // Throttle mouse tracking to improve performance
  const [isThrottled, setIsThrottled] = useState(false)
  
  // Mouse position tracking for subtle effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 }) // Lower stiffness for better performance
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 }) // Lower stiffness for better performance
  
  // Handle mouse movement with throttling
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isThrottled) return
    
    setIsThrottled(true)
    setTimeout(() => setIsThrottled(false), 50) // Only update every 50ms
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      mouseX.set(x)
      mouseY.set(y)
    }
  }
  
  // Icon mapping for stats
  const getIcon = (index: number) => {
    const icons = [
      <FlaskConical key="flask" className="w-5 h-5" />,
      <BarChart3 key="chart" className="w-5 h-5" />,
      <Globe2 key="globe" className="w-5 h-5" />,
      <Microscope key="microscope" className="w-5 h-5" />
    ]
    return icons[index % icons.length]
  }
  
  // Icon mapping for research approaches
  const getApproachIcon = (index: number) => {
    const icons = [
      <Microscope className="h-4 w-4" />,
      <FlaskConical className="h-4 w-4" />,
      <BarChart3 className="h-4 w-4" />
    ]
    return icons[index % icons.length]
  }
  
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 relative overflow-hidden bg-slate-50"
    >
      {/* Modern, subtle background elements */}
      <div className="absolute inset-0 bg-[url('/images/backgrounds/grid-pattern.svg')] bg-repeat opacity-[0.03]"></div>
      
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-50 mix-blend-multiply opacity-60 blur-3xl will-change-transform"
        style={{
          x: useTransform(springX, [-0.5, 0.5], [10, -10]), // Reduced movement
          y: useTransform(springY, [-0.5, 0.5], [-10, 10]), // Reduced movement
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#0f766e]/10 blur-3xl will-change-transform"
        style={{
          x: useTransform(springX, [-0.5, 0.5], [-10, 10]), // Reduced movement
          y: useTransform(springY, [-0.5, 0.5], [10, -10]), // Reduced movement
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with more modern typography and layout */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }} // Faster transition
            className="mb-3"
          >
            <span className="bg-gradient-to-r from-[#0f766e] to-emerald-500 bg-clip-text text-transparent text-sm uppercase tracking-wider font-semibold">
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }} // Moderate delay
            className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }} // Moderate delay
            className="text-lg text-gray-600 max-w-2xl"
          >
            {description}
          </motion.p>
        </div>
        
        {/* Stats with modern card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 * index, // Staggered animation but not too much delay
                ease: "easeOut" // Simple easing function
              }}
              whileHover={{ y: -5 }} // Simple hover effect
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 relative overflow-hidden will-change-transform"
            >
              {/* Modern accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#0f766e] to-transparent opacity-40"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-[#f0f9f6] flex items-center justify-center text-[#0f766e]">
                  {getIcon(index)}
                </div>
                
                {/* Visual accent */}
                <div className="h-6 w-6 rounded-full flex items-center justify-center">
                  <motion.div 
                    className="h-[3px] w-[3px] rounded-full bg-[#0f766e] will-change-transform"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Research approach with modern card layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Image column */}
              <div className="md:col-span-2 relative h-64 md:h-auto">
                <div className="h-full w-full relative will-change-transform">
                  <Image
                    src={image ? image : "/images/research-lab.jpg"}
                    alt="Life Scientific Research"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f766e]/40 to-transparent mix-blend-multiply"></div>
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 will-change-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ y: -5 }} // Simple hover effect
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#0f766e] text-white p-2 rounded-md">
                      <FlaskConical className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Scientific Method</div>
                      <div className="font-semibold text-gray-900">Research-First</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Content column */}
              <div className="md:col-span-3 p-6 md:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">Our Scientific Approach</span>
                  <motion.span
                    className="inline-block h-1 w-1 rounded-full bg-[#0f766e] will-change-transform"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </h3>
                
                <div className="space-y-6">
                  {researchApproaches.map((approach, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <div className="mr-4 mt-1 h-8 w-8 flex-shrink-0 rounded-lg bg-[#f0f9f6] flex items-center justify-center text-[#0f766e]">
                        {getApproachIcon(index)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{approach.title}</h4>
                        <p className="text-gray-600 mt-1">{approach.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Visual accents - subtle dots pattern */}
                <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-1 opacity-50">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-1 rounded-full bg-[#0f766e]/60"
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CEO Quote Section */}
        {quoteText && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 relative overflow-hidden">
              {/* Background quote accent */}
              <Quote className="absolute top-4 left-4 h-24 w-24 text-[#0f766e]/5" />
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="h-1 w-10 bg-[#0f766e] rounded-full mr-3"></div>
                  <span className="text-[#0f766e] font-semibold text-sm uppercase tracking-wide">Leadership Perspective</span>
                </div>
                
                <blockquote className="text-2xl font-medium text-gray-800 mb-6 leading-relaxed">
                  "{quoteText}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <cite className="not-italic font-semibold text-gray-900">{quoteAuthor}</cite>
                    <span className="text-gray-500 text-sm">{quoteRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 