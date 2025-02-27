"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

type Testimonial = {
  content: string
  author: string
  role: string
  company: string
  avatar?: string
  rating?: number
  image?: string
  location?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    content: "Life Scientific's products have consistently outperformed other solutions in our large-scale farm operations. Their approach to sustainable agriculture has helped us reduce chemical usage while maintaining yields.",
    author: "Emily Johnson",
    role: "Head of Operations",
    company: "Green Valley Farms",
    rating: 5,
    image: "/images/testimonials/farm-field.jpg",
    location: "Iowa, USA"
  },
  {
    content: "The technical support team at Life Scientific has been exceptional. They don't just sell products; they provide comprehensive solutions tailored to our specific agricultural challenges.",
    author: "Michael Rodriguez",
    role: "Agricultural Director",
    company: "SunGrove Orchards",
    rating: 5,
    image: "/images/testimonials/orchard.jpg",
    location: "California, USA"
  },
  {
    content: "As a research partner, I've witnessed firsthand the rigorous testing that goes into each Life Scientific product. Their commitment to evidence-based solutions is unmatched in the industry.",
    author: "Dr. Sarah Chen",
    role: "Research Scientist",
    company: "AgriTech Institute",
    rating: 5,
    image: "/images/testimonials/research-lab.jpg",
    location: "Ontario, Canada"
  },
  {
    content: "Implementing Life Scientific's integrated pest management solutions has made a remarkable difference in our vineyard's health while significantly reducing our environmental footprint.",
    author: "Thomas Müller",
    role: "Vineyard Owner",
    company: "Müller Family Vineyards",
    rating: 4,
    image: "/images/testimonials/vineyard.jpg",
    location: "Rhineland, Germany"
  }
]

export function TestimonialsSection({
  title = "What Our Clients Say",
  subtitle = "Testimonials from agricultural professionals",
  testimonials = defaultTestimonials
}: {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  // Throttle mouse tracking to improve performance
  const [isThrottled, setIsThrottled] = useState(false)
  
  // Track mouse position for parallax effect with reduced stiffness
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 }) // Reduced stiffness
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 }) // Reduced stiffness
  
  // Throttled mouse movement handler
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
  
  // Scroll animations with reduced sensitivity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]) // Less extreme opacity change
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.99, 1, 1, 0.99]) // Less extreme scale change
  
  // Featured testimonial navigation
  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }
  
  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  // Prevent too many animations at once
  const shouldAnimate = (index: number) => index < 3 // Only animate the first 3 cards
  
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 relative overflow-hidden bg-gray-50"
    >
      {/* Simplified background decorations */}
      <motion.div 
        className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-green-50 mix-blend-multiply opacity-70 blur-3xl will-change-transform"
        style={{
          x: useTransform(springX, [-0.5, 0.5], [-10, 10]), // Reduced movement
          y: useTransform(springY, [-0.5, 0.5], [-10, 10]), // Reduced movement
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-40 -right-40 w-80 h-80 rounded-full bg-[#0f766e]/5 blur-3xl will-change-transform"
        style={{
          x: useTransform(springX, [-0.5, 0.5], [10, -10]), // Reduced movement
          y: useTransform(springY, [-0.5, 0.5], [10, -10]), // Reduced movement
        }}
      ></motion.div>
      <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern-light.svg')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center rounded-full bg-[#f0f9f6] px-3 py-1 mb-5 will-change-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
          >
            <span className="text-sm font-medium text-[#0f766e]">{subtitle}</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} // Removed delay for immediate rendering
          >
            {title}
          </motion.h2>
        </motion.div>
        
        {/* Featured testimonial - large format with optimized carousel */}
        <div className="mb-16 max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait" initial={false}> {/* Initial false to prevent initial animation */}
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} // Faster transitions
              className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                {/* Testimonial image */}
                <div className="md:w-2/5 relative">
                  <motion.div 
                    className="h-64 md:h-full relative will-change-transform"
                    whileHover={{ scale: 1.03 }} // Reduced scale amount
                    transition={{ type: "tween", duration: 0.3 }} // Using tween instead of spring
                  >
                    <Image
                      src={testimonials[activeTestimonial].image || "/images/testimonials/farm-field.jpg"}
                      alt={testimonials[activeTestimonial].company}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f766e]/30 to-transparent mix-blend-multiply"></div>
                  </motion.div>
                  
                  {/* Company badge */}
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 flex items-center will-change-transform"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, type: "tween" }} // Using tween, removed spring
                    whileHover={{ y: -3 }} // Simplified hover effect
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3">
                      <span className="text-[#0f766e] font-bold text-xl">
                        {testimonials[activeTestimonial].company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-xs text-gray-500">{testimonials[activeTestimonial].location}</div>
                      <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].company}</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Testimonial content */}
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <div className="mb-4 text-[#0f766e]/20">
                    <Quote size={48} />
                  </div>
                  
                  {/* Star rating - simplified */}
                  {testimonials[activeTestimonial].rating && (
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[activeTestimonial].rating! 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  <motion.blockquote 
                    className="text-xl md:text-2xl font-medium text-gray-800 mb-6 italic leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    "{testimonials[activeTestimonial].content}"
                  </motion.blockquote>
                  
                  <div className="mt-auto">
                    <div className="flex items-center">
                      {testimonials[activeTestimonial].avatar ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonials[activeTestimonial].avatar}
                            alt={testimonials[activeTestimonial].author}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#0f766e]/10 flex items-center justify-center mr-4">
                          <span className="text-[#0f766e] font-medium text-lg">
                            {testimonials[activeTestimonial].author.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].author}</div>
                        <div className="text-sm text-gray-600">
                          {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons - simplified */}
          <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2 pointer-events-none">
            <motion.button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto will-change-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto will-change-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "tween", duration: 0.2 }} // Using tween instead of spring
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
        
        {/* Testimonials grid with simplified hover interactions */}
        <motion.div
          style={{ opacity, scale }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md relative border border-gray-100 overflow-hidden flex flex-col will-change-transform"
              whileHover={{ y: -5 }} // Simplified hover effect
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Testimonial image with simplified zoom effect */}
              {testimonial.image && (
                <div className="h-32 relative overflow-hidden">
                  <motion.div
                    animate={{ 
                      scale: hoveredIndex === index ? 1.05 : 1 // Reduced scale amount
                    }}
                    transition={{ duration: 0.3, type: "tween" }} // Using tween for better performance
                    className="h-full w-full will-change-transform"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.company}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f766e]/30"></div>
                </div>
              )}
              
              {/* Testimonial content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Quote mark decoration - static */}
                <div className="absolute top-2 right-4 text-[#0f766e]/10 text-4xl">
                  <Quote />
                </div>
                
                {/* Star rating - simplified */}
                {testimonial.rating && (
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating! 
                            ? "text-yellow-500 fill-yellow-500" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Testimonial text */}
                <p className="text-gray-700 mb-6 relative z-10 text-sm flex-1">
                  "{testimonial.content}"
                </p>
                
                {/* Author info */}
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  {testimonial.avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0f766e]/10 flex items-center justify-center mr-3">
                      <span className="text-[#0f766e] font-medium text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 