"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react'
import { urlForImage } from '@/lib/sanity.image'

export type Testimonial = {
  content: string
  author: string
  role?: string
  company?: string
  rating: number
  avatar?: any
}

interface TestimonialsSectionProps {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({
  title = "What Our Customers Say",
  subtitle = "Feedback from agricultural professionals using our products",
  testimonials = []
}: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  // Handle empty testimonials array
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{subtitle}</p>
          )}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-500">No testimonials available yet.</p>
          </div>
        </div>
      </section>
    )
  }
  
  const nextTestimonial = () => {
    setActiveTestimonial((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }
  
  const prevTestimonial = () => {
    setActiveTestimonial((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }
  
  // Get current testimonial
  const testimonial = testimonials[activeTestimonial]
  
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }
  
  // Process image URL from Sanity
  const getImageUrl = (avatar: any) => {
    if (!avatar) return null
    
    if (avatar.asset && urlForImage(avatar)) {
      return urlForImage(avatar)?.url()
    }
    
    // Handle case where avatar might be a direct URL string
    if (typeof avatar === 'string' && avatar.startsWith('http')) {
      return avatar
    }
    
    return null
  }
  
  const imageUrl = getImageUrl(testimonial.avatar)
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
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
          
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Featured testimonial card */}
        <div className="mb-16 relative">
          <motion.div 
            key={activeTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100"
          >
            <div className="grid md:grid-cols-5 items-stretch">
              {/* Testimonial content */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex mb-6">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="relative mb-8">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#0f766e]/10 transform scale-x-[-1]" />
                    <p className="text-lg text-gray-700 italic relative z-10 pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                    {testimonial.role && testimonial.company && ', '}
                    {testimonial.company}
                  </p>
                </div>
              </div>
              
              {/* Image column */}
              <div className="md:col-span-2 bg-gray-50 relative min-h-[200px]">
                {imageUrl ? (
                  <Image 
                    src={imageUrl}
                    alt={`${testimonial.author} testimonial`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                    <div className="bg-white p-4 rounded-full mb-2">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No image available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2 pointer-events-none">
              <motion.button
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto will-change-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto will-change-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Navigation indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeTestimonial
                    ? "w-8 bg-[#0f766e]"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 