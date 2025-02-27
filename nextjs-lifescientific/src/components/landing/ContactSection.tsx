"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactSection({
  title = "Connect With Our Experts",
  subtitle = "Get personalized agricultural solutions for your specific needs",
  ctaText = "Contact Us",
  email = "info@lifescientific.com",
  phone = "+1 (555) 123-4567"
}: {
  title?: string
  subtitle?: string
  ctaText?: string
  email?: string
  phone?: string
}) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#0f766e]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-[#f0f9f6] px-3 py-1 mb-5">
            <span className="text-sm font-medium text-[#0f766e]">{subtitle}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </motion.div>
        
        {/* Contact content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Contact info sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-1 bg-[#0f766e] text-white rounded-2xl p-8 h-full flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">Phone</div>
                    <a 
                      href={`tel:${phone}`} 
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/20">
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-colors focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-colors focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-colors focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your agricultural needs"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-colors focus:outline-none"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="bg-[#0f766e] hover:bg-[#0e6a63] text-white rounded-lg px-6 py-3 w-full sm:w-auto">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 