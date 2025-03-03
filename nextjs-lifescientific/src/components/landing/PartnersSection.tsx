"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Award, ShieldCheck } from 'lucide-react'
import { urlForImage } from '@/lib/sanity.image'

type Partner = {
  name: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  link?: string
}

type Certification = {
  name: string
  description: string
  logo?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

type PartnersSectionProps = {
  title: string
  subtitle?: string
  partnersTitle?: string
  partners?: Partner[]
  certificationsTitle?: string
  certifications?: Certification[]
  showTrustBadges?: boolean
}

export function PartnersSection({
  title,
  subtitle,
  partnersTitle = 'Trusted Partners',
  partners = [],
  certificationsTitle = 'Industry Certifications',
  certifications = [],
  showTrustBadges = true
}: PartnersSectionProps) {
  const hasPartners = partners && partners.length > 0
  const hasCertifications = certifications && certifications.length > 0

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        {/* Partners */}
        {hasPartners && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">{partnersTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                  {partner.link ? (
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      {partner.logo && urlForImage(partner.logo) ? (
                        <div className="relative w-full h-20">
                          <Image
                            src={urlForImage(partner.logo)!.url()}
                            alt={partner.logo.alt || partner.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-20 flex items-center justify-center">
                          <span className="text-center font-medium">{partner.name}</span>
                        </div>
                      )}
                    </a>
                  ) : (
                    <>
                      {partner.logo && urlForImage(partner.logo) ? (
                        <div className="relative w-full h-20">
                          <Image
                            src={urlForImage(partner.logo)!.url()}
                            alt={partner.logo.alt || partner.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-20 flex items-center justify-center">
                          <span className="text-center font-medium">{partner.name}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">{certificationsTitle}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg flex flex-col items-center text-center">
                  {cert.logo && urlForImage(cert.logo) ? (
                    <div className="relative w-20 h-20 mb-4">
                      <Image
                        src={urlForImage(cert.logo)!.url()}
                        alt={cert.logo.alt || cert.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  <h4 className="text-xl font-semibold mb-2">{cert.name}</h4>
                  <p className="text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges */}
        {showTrustBadges && (
          <div className="mt-16 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-8">Why Trust Life Scientific</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="mb-2 mx-auto w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold">Quality Certified</h4>
              </div>
              <div>
                <div className="mb-2 mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="font-semibold">Science-Based</h4>
              </div>
              <div>
                <div className="mb-2 mx-auto w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h4 className="font-semibold">Regulatory Compliant</h4>
              </div>
              <div>
                <div className="mb-2 mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold">Trusted Globally</h4>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasPartners && !hasCertifications && (
          <div className="text-center p-8 bg-gray-100 rounded-lg max-w-3xl mx-auto">
            <p>Add partners and certifications in Sanity Studio to display them here.</p>
          </div>
        )}
      </div>
    </section>
  )
} 