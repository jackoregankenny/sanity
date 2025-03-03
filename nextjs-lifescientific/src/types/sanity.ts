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

// Landing FAQ Section Block
export interface FAQItem {
  question: string
  answer: string
}

export interface LandingFAQBlock {
  _type: 'landingFAQ'
  _key: string
  title: string
  subtitle?: string
  faqs: FAQItem[]
  backgroundStyle?: 'light' | 'dark' | 'gradient'
}

// Landing Partners Section Block
export interface PartnerItem {
  name: string
  logo?: SanityImage
  link?: string
}

export interface CertificationItem {
  name: string
  logo?: SanityImage
  description: string
}

export interface LandingPartnersBlock {
  _type: 'landingPartners'
  _key: string
  title: string
  subtitle?: string
  partnersTitle?: string
  partners?: PartnerItem[]
  certificationsTitle?: string
  certifications?: CertificationItem[]
  showTrustBadges?: boolean
}

// Blog-related types
export interface Author {
  _id: string
  name: string
  slug: SanitySlug
  avatar?: SanityImage
  bio?: any[] // Portable Text
  role?: string
  email?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

export interface Category {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  color?: string
  featuredImage?: SanityImage
  language: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: SanitySlug
  language: string
  translationStatus?: 'up-to-date' | 'needs-review' | 'out-of-sync'
  lastTranslated?: string
  version?: number
  author?: Author
  categories?: Category[]
  publishedAt: string
  featuredImage?: SanityImage
  excerpt?: string
  content: any[] // Portable Text
  relatedPosts?: BlogPost[]
  seoTitle?: string
  seoDescription?: string
}

export interface BlogPage {
  _id: string
  title: string
  subtitle?: string
  language: string
  translationStatus?: 'up-to-date' | 'needs-review' | 'out-of-sync'
  lastTranslated?: string
  version?: number
  description?: string
  heroImage?: SanityImage
  postsPerPage: number
  featuredPosts?: BlogPost[]
  showAuthorBio: boolean
  showCategoriesWidget: boolean
  showRecentPostsWidget: boolean
  showSubscribeWidget: boolean
  subscribeFormTitle?: string
  subscribeFormText?: string
  seoTitle?: string
  seoDescription?: string
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
  | LandingFAQBlock
  | LandingPartnersBlock

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