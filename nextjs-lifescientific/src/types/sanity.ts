export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// Landing Hero Section Block
export interface LandingHeroBlock {
  _type: 'landingHero'
  _key: string
  title: string
  subtitle?: string
  ctaText?: string
  secondaryCtaText?: string
  image?: SanityImage
}

// Landing Features Section Block
export interface LandingFeatureItem {
  title: string
  description: string
  icon?: 'leaf' | 'flask' | 'shield' | 'globe' | 'star' | 'chart'
}

export interface LandingFeaturesBlock {
  _type: 'landingFeatures'
  _key: string
  title: string
  subtitle?: string
  features: LandingFeatureItem[]
}

// Landing Products Section Block
export interface LandingProductItem {
  _id: string
  name: string
  slug: SanitySlug
  category?: string
  tagline?: string
  shortDescription?: string
  productImage?: SanityImage
  supportedCrops?: Array<{
    crop: string
    dosage?: {
      amount: number | string
      unit: string
    }
  }>
}

export interface LandingProductsBlock {
  _type: 'landingProducts'
  _key: string
  title: string
  subtitle?: string
  products: LandingProductItem[]
}

// Landing Research Section Block
export interface LandingStatItem {
  value: string
  label: string
}

export interface ResearchApproach {
  title: string
  description: string
}

export interface LandingResearchBlock {
  _type: 'landingResearch'
  _key: string
  title: string
  subtitle?: string
  description?: string
  stats: LandingStatItem[]
  researchApproaches?: ResearchApproach[]
  image?: SanityImage
}

// Landing About Section Block
export interface LandingAboutBlock {
  _type: 'landingAbout'
  _key: string
  title: string
  subtitle?: string
  description: string
  values?: string[]
  image?: SanityImage
}

// Landing Testimonials Section Block
export interface LandingTestimonialItem {
  content: string
  author: string
  role?: string
  company?: string
  rating: number
  avatar?: SanityImage
}

export interface LandingTestimonialsBlock {
  _type: 'landingTestimonials'
  _key: string
  title: string
  subtitle?: string
  testimonials: LandingTestimonialItem[]
}

// Landing Contact Section Block
export interface LandingFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea' | 'select'
  required: boolean
}

export interface LandingContactBlock {
  _type: 'landingContact'
  _key: string
  title: string
  subtitle?: string
  ctaText: string
  email?: string
  phone?: string
  formFields?: LandingFormField[]
}

// Union type for all page builder blocks
export type PageBuilderBlock = 
  | LandingHeroBlock
  | LandingFeaturesBlock
  | LandingProductsBlock
  | LandingResearchBlock
  | LandingAboutBlock
  | LandingTestimonialsBlock
  | LandingContactBlock

// Complete Landing Page structure
export interface LandingPage {
  _id: string
  title: string
  slug: SanitySlug
  language: string
  translationStatus?: 'up-to-date' | 'needs-review' | 'out-of-sync'
  lastTranslated?: string
  version?: number
  pageBuilder: PageBuilderBlock[]
  seoTitle?: string
  seoDescription?: string
} 