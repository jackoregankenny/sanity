"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Award, ShieldCheck } from 'lucide-react'

interface Partner {
  name: string
  logo: string
  link?: string
}

interface Certification {
  name: string
  logo?: string
  description: string
}

interface PartnersSectionProps {
  title?: string
  subtitle?: string
  partnersTitle?: string
  partners?: Partner[]
  certificationsTitle?: string
  certifications?: Certification[]
  showTrustBadges?: boolean
}

export function PartnersSection({
  title = "Our Partners & Certifications",
  subtitle = "Collaborating with industry leaders to deliver quality agricultural solutions",
  partnersTitle = "Trusted Partners",
  partners = [],
  certificationsTitle = "Industry Certifications",
  certifications = [],
  showTrustBadges = true
}: PartnersSectionProps) {
  // Default partners if none are provided
  const defaultPartners: Partner[] = [
    { name: "Agricultural Institute", logo: "/placeholder-logo-1.svg", link: "#" },
    { name: "Global Farming Initiative", logo: "/placeholder-logo-2.svg", link: "#" },
    { name: "EcoFarm Alliance", logo: "/placeholder-logo-3.svg", link: "#" },
    { name: "Research Labs International", logo: "/placeholder-logo-4.svg", link: "#" },
    { name: "Sustainable Crop Network", logo: "/placeholder-logo-5.svg", link: "#" }
  ]

  // Default certifications if none are provided
  const defaultCertifications: Certification[] = [
    {
      name: "ISO 9001:2015",
      logo: "/placeholder-cert-1.svg",
      description: "International standard for quality management systems"
    },
    {
      name: "Environmental Stewardship",
      logo: "/placeholder-cert-2.svg",
      description: "Recognizing our commitment to sustainable agricultural practices"
    },
    {
      name: "GMP Certification",
      logo: "/placeholder-cert-3.svg",
      description: "Good Manufacturing Practice ensuring consistent quality control"
    }
  ]

  const partnersToUse = partners.length > 0 ? partners : defaultPartners
  const certificationsToUse = certifications.length > 0 ? certifications : defaultCertifications

  // Function to render a partner logo with fallback
  const renderPartnerLogo = (partner: Partner, index: number) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-center justify-center p-4"
      >
        {partner.link ? (
          <a 
            href={partner.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 flex items-center justify-center"
            aria-label={`Visit ${partner.name}`}
          >
            {partner.logo ? (
              <div className="relative h-12 w-32 md:h-16 md:w-40">
                <Image 
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-4 text-center min-w-32">
                <span className="font-medium text-gray-800">{partner.name}</span>
              </div>
            )}
          </a>
        ) : (
          <div className="grayscale opacity-70 flex items-center justify-center">
            {partner.logo ? (
              <div className="relative h-12 w-32 md:h-16 md:w-40">
                <Image 
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-4 text-center min-w-32">
                <span className="font-medium text-gray-800">{partner.name}</span>
              </div>
            )}
          </div>
        )}
      </motion.div>
    )
  }

  // Function to render a certification with fallback
  const renderCertification = (cert: Certification, index: number) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center"
      >
        {cert.logo ? (
          <div className="relative h-16 w-16 mb-4">
            <Image 
              src={cert.logo}
              alt={cert.name}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <Award className="h-12 w-12 text-[#0f766e] mb-4" />
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
        <p className="text-gray-600 text-sm">{cert.description}</p>
      </motion.div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
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
          
          {/* Partners section */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-gray-900 mb-8 text-center"
            >
              {partnersTitle}
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
              {partnersToUse.map((partner, index) => renderPartnerLogo(partner, index))}
            </div>
          </div>
          
          {/* Certifications section */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-gray-900 mb-8 text-center"
            >
              {certificationsTitle}
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {certificationsToUse.map((cert, index) => renderCertification(cert, index))}
            </div>
          </div>
          
          {/* Trust badges section */}
          {showTrustBadges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Why Trust Life Scientific</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#f0f9f6] p-4 rounded-full mb-4">
                    <ShieldCheck className="h-8 w-8 text-[#0f766e]" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Quality Guaranteed</h4>
                  <p className="text-gray-600">All products undergo rigorous testing to meet or exceed industry standards</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#f0f9f6] p-4 rounded-full mb-4">
                    <Award className="h-8 w-8 text-[#0f766e]" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Award-Winning Research</h4>
                  <p className="text-gray-600">Recognized for innovation in sustainable agricultural solutions</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#f0f9f6] p-4 rounded-full mb-4">
                    <Check className="h-8 w-8 text-[#0f766e]" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Regulatory Compliance</h4>
                  <p className="text-gray-600">Meeting all regulatory requirements across global markets</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
} 