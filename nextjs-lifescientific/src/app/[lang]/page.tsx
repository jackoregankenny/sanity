import type { LanguageCode } from "@/hooks/useTranslations"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { HeroSection } from "@/components/landing/HeroSection"
import { ModernHero } from "@/components/landing/ModernHero"
import MinimalHero from "@/components/landing/MinimalHero"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { ProductsSection } from "@/components/landing/ProductsSection"
import { GlobeDemo } from "@/components/landing/Globe"
import { About1 } from "@/components/landing/About1"
import { ProductShowcaseHero } from "@/components/landing/ProductShowcaseHero"

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
export function generateMetadata(): Metadata {
  return {
    title: 'Life Scientific',
    description: 'Welcome to Life Scientific',
  }
}

export default async function LandingPage(props: Props) {
  const params = await Promise.resolve((await props.params))
  validateLanguage(params.lang)

  // Static content for development
  const mockContent = {
    hero: {
      title: "Innovative Agricultural Solutions",
      subtitle: "Developing high-quality crop protection products for sustainable farming practices worldwide.",
      ctaText: "Explore Products",
      learnMoreText: "Learn more",
      newProductsText: "New products available",
      // We'll add the image later when integrating with Sanity
      image: undefined
    },
    features: {
      title: "Why Choose Life Scientific",
      items: [
        {
          title: "Sustainable Solutions",
          description: "Environmentally conscious crop protection products that maintain efficacy while reducing environmental impact.",
          icon: "leaf" as const
        },
        {
          title: "Scientific Excellence",
          description: "Cutting-edge research and development ensuring the highest quality agricultural solutions.",
          icon: "flask" as const
        },
        {
          title: "Proven Reliability",
          description: "Trusted by farmers worldwide with products tested in diverse agricultural conditions.",
          icon: "shield" as const
        },
        {
          title: "Global Reach",
          description: "Supporting agricultural communities across continents with localized solutions.",
          icon: "star" as const
        }
      ]
    },
    products: {
      title: "Featured Products",
      subtitle: "Discover our range of innovative crop protection solutions",
      items: [
        {
          name: "Niantic",
          slug: "niantic",
          category: "herbicide",
          tagline: "Advanced weed control solution",
          productImage: undefined
        },
        {
          name: "Tarak",
          slug: "tarak",
          category: "insecticide",
          tagline: "Complete plant protection",
          productImage: undefined
        },
        {
          name: "Lambda",
          slug: "lambda",
          category: "insecticide",
          tagline: "Targeted pest management",
          productImage: undefined
        }
      ]
    }
  }
  
  // 0 = original gravity hero, 1 = 3D showcase hero, 2 = modern hero, 3 = minimal hero
  const heroChoice: number = 3;
  
  return (
    <main>
      {heroChoice === 0 ? (
        <HeroSection
          title={mockContent.hero.title}
          subtitle={mockContent.hero.subtitle}
          ctaText={mockContent.hero.ctaText}
          learnMoreText={mockContent.hero.learnMoreText}
          newProductsText={mockContent.hero.newProductsText}
        />
      ) : heroChoice === 1 ? (
        <ProductShowcaseHero
          title={mockContent.hero.title}
          subtitle={mockContent.hero.subtitle}
          ctaText={mockContent.hero.ctaText}
          secondaryCtaText={mockContent.hero.learnMoreText}
        />
      ) : heroChoice === 2 ? (
        <ModernHero
          title={mockContent.hero.title}
          subtitle={mockContent.hero.subtitle}
          ctaText={mockContent.hero.ctaText}
          secondaryCtaText={mockContent.hero.learnMoreText}
        />
      ) : (
        <MinimalHero
          title="Scientific protection for optimal crop performance"
          subtitle="High-efficacy agricultural solutions backed by research and developed for sustainable farming practices."
          ctaText={mockContent.hero.ctaText}
          secondaryCtaText={mockContent.hero.learnMoreText}
        />
      )}
      <FeaturesSection
        title={mockContent.features.title}
        features={mockContent.features.items}
      />
      <ProductsSection
        title={mockContent.products.title}
        subtitle={mockContent.products.subtitle}
        products={mockContent.products.items}
      />
      <About1 />
      <ModernHero />
      <GlobeDemo />
    </main>
  )
}