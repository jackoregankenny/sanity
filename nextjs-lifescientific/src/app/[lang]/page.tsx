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
    title: 'Life Scientific | Innovative Agricultural Solutions',
    description: 'High-efficacy agricultural solutions backed by research and developed for sustainable farming practices worldwide.',
  }
}

export default async function LandingPage(props: Props) {
  const params = await Promise.resolve((await props.params))
  validateLanguage(params.lang)

  // Static content for development - will be replaced with Sanity data
  const mockContent = {
    hero: {
      title: "Scientific protection for optimal crop performance",
      subtitle: "High-efficacy agricultural solutions backed by research and developed for sustainable farming practices.",
      ctaText: "Discover Products",
      secondaryCtaText: "Learn More"
    },
    features: {
      title: "Scientific Advantage",
      subtitle: "Our research-backed approach delivers measurable results",
      items: [
        {
          title: "Sustainable Formulations",
          description: "Environmentally conscious crop protection products that maintain efficacy while reducing environmental impact.",
          icon: "leaf" as const
        },
        {
          title: "Research Excellence",
          description: "Cutting-edge scientific development ensuring the highest quality agricultural solutions.",
          icon: "flask" as const
        },
        {
          title: "Proven Reliability",
          description: "Trusted by farmers worldwide with products tested in diverse agricultural conditions.",
          icon: "shield" as const
        },
        {
          title: "Global Expertise",
          description: "Supporting agricultural communities across continents with localized solutions.",
          icon: "globe" as const
        }
      ]
    },
    products: {
      title: "Product Portfolio",
      subtitle: "Scientifically formulated solutions for optimal crop protection",
      items: [
        {
          name: "Niantic",
          slug: "niantic",
          category: "Herbicide",
          tagline: "Advanced weed control solution",
          description: "Premium systemic herbicide for broad-spectrum weed management with long-lasting effectiveness.",
          productImage: undefined
        },
        {
          name: "Tarak",
          slug: "tarak",
          category: "Fungicide",
          tagline: "Complete plant protection",
          description: "Powerful broad-spectrum fungicide that prevents and cures fungal diseases while protecting new growth.",
          productImage: undefined
        },
        {
          name: "EcoShield",
          slug: "ecoshield",
          category: "Organic Solution",
          tagline: "Sustainable crop protection",
          description: "Certified organic formula that enhances natural plant defenses while meeting strict ecological standards.",
          productImage: undefined
        },
        {
          name: "Lambda",
          slug: "lambda",
          category: "Insecticide",
          tagline: "Targeted pest management",
          description: "Fast-acting insecticide with extended protection period and minimal environmental impact.",
          productImage: undefined
        }
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Testimonials from agricultural professionals",
      items: [
        {
          content: "Life Scientific's products have consistently outperformed other solutions in our large-scale farm operations. Their approach to sustainable agriculture has helped us reduce chemical usage while maintaining yields.",
          author: "Emily Johnson",
          role: "Head of Operations",
          company: "Green Valley Farms",
          rating: 5
        },
        {
          content: "The technical support team at Life Scientific has been exceptional. They don't just sell products; they provide comprehensive solutions tailored to our specific agricultural challenges.",
          author: "Michael Rodriguez",
          role: "Agricultural Director",
          company: "SunGrove Orchards",
          rating: 5
        },
        {
          content: "As a research partner, I've witnessed firsthand the rigorous testing that goes into each Life Scientific product. Their commitment to evidence-based solutions is unmatched in the industry.",
          author: "Dr. Sarah Chen",
          role: "Research Scientist",
          company: "AgriTech Institute",
          rating: 5
        },
        {
          content: "Implementing Life Scientific's integrated pest management solutions has made a remarkable difference in our vineyard's health while significantly reducing our environmental footprint.",
          author: "Thomas Müller",
          role: "Vineyard Owner",
          company: "Müller Family Vineyards",
          rating: 4
        }
      ]
    },
    research: {
      title: "Research-Driven Innovation",
      subtitle: "Our scientific approach to agricultural challenges",
      stats: [
        { value: "15+", label: "Years of Research" },
        { value: "98.3%", label: "Effectiveness Rate" },
        { value: "40+", label: "Countries Served" },
        { value: "12", label: "Research Centers" }
      ],
      description: "At Life Scientific, every product represents years of rigorous research and testing. Our team of scientists continuously works to develop solutions that address the evolving challenges of modern agriculture while prioritizing environmental sustainability."
    },
    about: {
      title: "Our Mission",
      subtitle: "Advancing agriculture through science",
      description: "Life Scientific was founded with a clear purpose: to develop agricultural solutions that balance effectiveness with environmental responsibility. Through rigorous research and innovation, we create products that help farmers maximize productivity while preserving natural resources for future generations.",
      values: [
        "Scientific excellence",
        "Environmental stewardship",
        "Agricultural advancement",
        "Global collaboration"
      ],
      image: undefined
    },
    contact: {
      title: "Connect With Our Experts",
      subtitle: "Get personalized agricultural solutions for your specific needs",
      ctaText: "Contact Us",
      email: "info@lifescientific.com",
      phone: "+1 (555) 123-4567"
    }
  }
  
  return (
    <main className="bg-white">
      <MinimalHero
        title={mockContent.hero.title}
        subtitle={mockContent.hero.subtitle}
        ctaText={mockContent.hero.ctaText}
        secondaryCtaText={mockContent.hero.secondaryCtaText}
      />
      <FeaturesSection
        title={mockContent.features.title}
        subtitle={mockContent.features.subtitle}
        features={mockContent.features.items}
      />
      <ProductsSection
        title={mockContent.products.title}
        subtitle={mockContent.products.subtitle}
        products={mockContent.products.items}
      />
      <ResearchSection
        title={mockContent.research.title}
        subtitle={mockContent.research.subtitle}
        stats={mockContent.research.stats}
        description={mockContent.research.description}
      />
      <TestimonialsSection
        title={mockContent.testimonials.title}
        subtitle={mockContent.testimonials.subtitle}
        testimonials={mockContent.testimonials.items}
      />
      <AboutSection
        title={mockContent.about.title}
        subtitle={mockContent.about.subtitle}
        description={mockContent.about.description}
        values={mockContent.about.values}
        image={mockContent.about.image}
      />
      <ContactSection
        title={mockContent.contact.title}
        subtitle={mockContent.contact.subtitle}
        ctaText={mockContent.contact.ctaText}
        email={mockContent.contact.email}
        phone={mockContent.contact.phone}
      />
    </main>
  )
}