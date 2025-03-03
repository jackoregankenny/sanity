import type { LanguageCode } from "@/hooks/useTranslations"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import MinimalHero from "@/components/landing/MinimalHero"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { ProductsSection } from "@/components/landing/ProductsSection"
import { AboutSection } from "@/components/landing/AboutSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { ResearchSection } from "@/components/landing/ResearchSection"
import { ContactSection } from "@/components/landing/ContactSection"
import { createClient } from '@/lib/sanity.client'
import React from 'react'

// Define types for our dynamically imported components
type FAQSectionProps = {
  key: string
  title: string
  subtitle: string
  questions: Array<{
    question: string
    answer: string
  }>
}

type PartnersSectionProps = {
  key: string
  title: string
  subtitle: string
  partners: Array<{
    name: string
    logo: any
    link?: string
  }>
}

// Create placeholder components
const PlaceholderFAQSection: React.FC<FAQSectionProps> = () => (
  <div className="p-8 text-center">FAQ Section (Component not implemented)</div>
)

const PlaceholderPartnersSection: React.FC<PartnersSectionProps> = () => (
  <div className="p-8 text-center">Partners Section (Component not implemented)</div>
)

// Check if components exist before importing
let FAQSection: React.ComponentType<FAQSectionProps>;
let PartnersSection: React.ComponentType<PartnersSectionProps>;

try {
  // Dynamic import with proper typing
  const FAQModule = require('@/components/landing/FAQSection');
  FAQSection = FAQModule.FAQSection;
} catch (e) {
  // Component doesn't exist yet, use placeholder
  FAQSection = PlaceholderFAQSection;
}

try {
  // Dynamic import with proper typing
  const PartnersModule = require('@/components/landing/PartnersSection');
  PartnersSection = PartnersModule.PartnersSection;
} catch (e) {
  // Component doesn't exist yet, use placeholder
  PartnersSection = PlaceholderPartnersSection;
}

interface Props {
  params: Promise<{
    lang: string
  }>
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.id,
  }))
}

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Generate metadata
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  // In a real implementation, you'd fetch this from Sanity for each language
  return {
    title: 'Life Scientific | Innovative Agricultural Solutions',
    description: 'High-efficacy agricultural solutions backed by research and developed for sustainable farming practices worldwide.',
  }
}

// Create Sanity client
const client = createClient()

// Component map with improved typing
const componentMap: Record<string, React.ComponentType<any>> = {
  landingHero: MinimalHero,
  landingFeatures: FeaturesSection,
  landingProducts: ProductsSection, 
  landingResearch: ResearchSection,
  landingTestimonials: TestimonialsSection,
  landingAbout: AboutSection,
  landingContact: ContactSection,
  landingFAQ: FAQSection,
  landingPartners: PartnersSection,
}

export default async function LandingPage(props: Props) {
  const params = await Promise.resolve((await props.params))
  validateLanguage(params.lang)

  // Fetch landing page data from Sanity
  const query = `*[_type == "page" && slug.current == "landing" && language == $lang][0]{
    _id,
    title,
    pageBuilder[]{
      _type,
      _key,
      title,
      subtitle,
      highlightWords,
      showNotification,
      notificationText,
      dataPoints[]{
        label,
        value
      },
      ctaText,
      secondaryCtaText,
      image,
      features[] {
        title,
        description,
        icon
      },
      products[]-> {
        _id,
        name,
        slug,
        "category": category.label,
        tagline,
        shortDescription,
        productImage {
          asset->{
            _id,
            url
          },
          alt
        },
        supportedCrops[] {
          crop,
          dosage {
            amount,
            unit
          }
        }
      },
      stats[] {
        value,
        label
      },
      researchApproaches[] {
        title,
        description
      },
      quoteText,
      quoteAuthor,
      quoteRole,
      description,
      values,
      testimonials[] {
        content,
        author,
        role,
        company,
        rating,
        avatar {
          asset->{
            _id,
            url
          }
        }
      },
      email,
      phone,
      // FAQ Section fields
      faqs[] {
        question,
        answer
      },
      backgroundStyle,
      // Partners Section fields
      partnersTitle,
      partners[] {
        name,
        logo {
          asset->{
            _id,
            url
          },
          alt
        },
        link
      },
      certificationsTitle,
      certifications[] {
        name,
        logo {
          asset->{
            _id,
            url
          },
          alt
        },
        description
      },
      showTrustBadges
    }
  }`

  // Use a minimal hero as the default fallback
  let heroContent = {
    title: "Scientific protection for optimal crop performance",
    subtitle: "High-efficacy agricultural solutions backed by research and developed for sustainable farming practices.",
    ctaText: "Discover Products",
    secondaryCtaText: "Learn More",
    showNotification: true,
    notificationText: "New sustainable formula release",
    highlightWords: "optimal crop performance",
    dataPoints: [
      { label: "Effectiveness", value: "98.3%" },
      { label: "Sustainability", value: "Eco-certified" },
      { label: "Research", value: "15+ years" }
    ]
  }

  // Try to fetch the landing page content from Sanity
  let landingPageData
  try {
    landingPageData = await client.fetch(query, { lang: params.lang })
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Fetched Sanity data for "${params.lang}" language page:`, 
        landingPageData ? 
          `Found page "${landingPageData.title}" with ${landingPageData.pageBuilder?.length || 0} components` : 
          'No page found'
      )
    }
  } catch (error) {
    console.error('Error fetching landing page data:', error)
  }

  // If we have page data from Sanity, render the components based on the page builder
  if (landingPageData?.pageBuilder?.length > 0) {
    return (
      <main className="bg-white">
        {landingPageData.pageBuilder.map((block: any) => {
          switch (block._type) {
            case 'landingHero':
              return (
                <MinimalHero
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  ctaText={block.ctaText}
                  secondaryCtaText={block.secondaryCtaText}
                  image={block.image}
                  showNotification={block.showNotification}
                  notificationText={block.notificationText}
                  dataPoints={block.dataPoints}
                  highlightWords={block.highlightWords}
                />
              )
            case 'landingFeatures':
              return (
                <FeaturesSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  features={block.features || []}
                />
              )
            case 'landingProducts':
              return (
                <ProductsSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  products={block.products || []}
                />
              )
            case 'landingResearch':
              return (
                <ResearchSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  stats={block.stats || []}
                  description={block.description}
                  researchApproaches={block.researchApproaches || []}
                  image={block.image}
                  quoteText={block.quoteText}
                  quoteAuthor={block.quoteAuthor}
                  quoteRole={block.quoteRole}
                />
              )
            case 'landingTestimonials':
              return (
                <TestimonialsSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  testimonials={block.testimonials || []}
                />
              )
            case 'landingAbout':
              return (
                <AboutSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  description={block.description}
                  values={block.values || []}
                  image={block.image}
                />
              )
            case 'landingContact':
              return (
                <ContactSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  ctaText={block.ctaText}
                  email={block.email}
                  phone={block.phone}
                />
              )
            case 'landingFAQ':
              return (
                <FAQSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  questions={block.faqs || []}
                />
              )
            case 'landingPartners':
              return (
                <PartnersSection
                  key={block._key}
                  title={block.title}
                  subtitle={block.subtitle}
                  partners={block.partners || []}
                />
              )
            default:
              if (process.env.NODE_ENV === 'development') {
                console.warn(`Unknown block type: ${block._type}`)
              }
              return null
          }
        })}
      </main>
    )
  }

  // Fallback to just a hero section if no Sanity data is available
  // This is more minimal than showing all components as static content
  return (
    <main className="bg-white">
      <MinimalHero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        ctaText={heroContent.ctaText}
        secondaryCtaText={heroContent.secondaryCtaText}
        showNotification={heroContent.showNotification}
        notificationText={heroContent.notificationText}
        dataPoints={heroContent.dataPoints}
        highlightWords={heroContent.highlightWords}
      />
    </main>
  )
}