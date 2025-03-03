import { client } from '@/sanity/client'
import { languages } from '@/config/languages'

export type LanguageCode = typeof languages[number]['id']

interface Translations {
  nav: {
    products: string
    about: string
    contact: string
    blog: string
    services: string
    home: string
    search: string
    language: string
  }
  products: {
    pageTitle: string
    pageDescription: string
    categoryLabels: {
      pesticide: string
      herbicide: string
      fungicide: string
    }
    sections: {
      features: string
      benefits: string
      variants: string
      documents: string
    }
    labels: {
      sku: string
      activeIngredients: string
      formulationType: string
      registrationNumber: string
      containerSizes: string
      documents: string
      viewVariants: string
      viewFeatures: string
      viewBenefits: string
    }
    formulation: {
      SL: string
      EC: string
      SC: string
      WP: string
      WG: string
    }
  }
  common: {
    loading: string
    error: string
    noResults: string
    newsletter: {
      title: string
      description: string
      buttonText: string
      placeholder: string
      successMessage: string
      errorMessage: string
    }
  }
  blog: {
    categories: string
    recentPosts: string
    readMore: string
    relatedPosts: string
    subscribe: string
    emailPlaceholder: string
    searchPlaceholder: string
    noResults: string
    authorBy: string
    publishedOn: string
    backToList: string
    loadMore: string
  }
}

// Default English translations as fallback
const defaultTranslations: Translations = {
  nav: {
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    services: 'Services',
    home: 'Home',
    search: 'Search',
    language: 'Language'
  },
  products: {
    pageTitle: 'Our Products',
    pageDescription: 'Discover our range of agricultural solutions.',
    categoryLabels: {
      pesticide: 'Pesticides',
      herbicide: 'Herbicides',
      fungicide: 'Fungicides'
    },
    sections: {
      features: 'Key Features',
      benefits: 'Benefits',
      variants: 'Product Variants',
      documents: 'Documents'
    },
    labels: {
      sku: 'SKU',
      activeIngredients: 'Active Ingredients',
      formulationType: 'Formulation Type',
      registrationNumber: 'Registration Number',
      containerSizes: 'Container Sizes',
      documents: 'Documents',
      viewVariants: 'View Variants',
      viewFeatures: 'Key Features',
      viewBenefits: 'Benefits'
    },
    formulation: {
      SL: 'Soluble Concentrate',
      EC: 'Emulsifiable Concentrate',
      SC: 'Suspension Concentrate',
      WP: 'Wettable Powder',
      WG: 'Water Dispersible Granules'
    }
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred. Please try again later.',
    noResults: 'No results found.',
    newsletter: {
      title: 'Stay Updated',
      description: 'Join our newsletter for the latest insights and updates.',
      buttonText: 'Subscribe',
      placeholder: 'Your email address',
      successMessage: 'Thank you for subscribing!',
      errorMessage: 'An error occurred. Please try again.'
    }
  },
  blog: {
    categories: 'Categories',
    recentPosts: 'Recent Posts',
    readMore: 'Read more',
    relatedPosts: 'Related Posts',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Your email address',
    searchPlaceholder: 'Search blog...',
    noResults: 'No posts found',
    authorBy: 'By',
    publishedOn: 'Published on',
    backToList: 'Back to all posts',
    loadMore: 'Load more'
  }
}

const TRANSLATIONS_QUERY = `*[_type == "translations" && language == $lang][0] {
  nav,
  products,
  common,
  blog
}`

export async function getTranslations(lang: LanguageCode): Promise<Translations> {
  try {
    // Try to get translations for the requested language
    const translations = await client.fetch<Translations | null>(
      TRANSLATIONS_QUERY,
      { lang },
      { next: { tags: ['translations'] } }
    )

    if (translations) {
      // Merge with defaults to ensure all fields exist
      return {
        ...defaultTranslations,
        ...translations,
        nav: { ...defaultTranslations.nav, ...translations.nav },
        products: {
          ...defaultTranslations.products,
          ...translations.products,
          categoryLabels: {
            ...defaultTranslations.products.categoryLabels,
            ...translations.products.categoryLabels
          },
          sections: { ...defaultTranslations.products.sections, ...translations.products.sections },
          labels: { ...defaultTranslations.products.labels, ...translations.products.labels },
          formulation: { ...defaultTranslations.products.formulation, ...translations.products.formulation }
        },
        common: { 
          ...defaultTranslations.common, 
          ...translations.common,
          newsletter: {
            ...defaultTranslations.common.newsletter,
            ...(translations.common?.newsletter || {})
          }
        },
        blog: { ...defaultTranslations.blog, ...(translations.blog || {}) }
      }
    }

    // If the requested language isn't English, try English
    if (lang !== 'en') {
      const englishTranslations = await client.fetch<Translations | null>(
        TRANSLATIONS_QUERY,
        { lang: 'en' },
        { next: { tags: ['translations'] } }
      )

      if (englishTranslations) {
        return {
          ...defaultTranslations,
          ...englishTranslations,
          nav: { ...defaultTranslations.nav, ...englishTranslations.nav },
          products: {
            ...defaultTranslations.products,
            ...englishTranslations.products,
            categoryLabels: {
              ...defaultTranslations.products.categoryLabels,
              ...englishTranslations.products.categoryLabels
            },
            sections: { ...defaultTranslations.products.sections, ...englishTranslations.products.sections },
            labels: { ...defaultTranslations.products.labels, ...englishTranslations.products.labels },
            formulation: { ...defaultTranslations.products.formulation, ...englishTranslations.products.formulation }
          },
          common: { 
            ...defaultTranslations.common, 
            ...englishTranslations.common,
            newsletter: {
              ...defaultTranslations.common.newsletter,
              ...(englishTranslations.common?.newsletter || {})
            }
          },
          blog: { ...defaultTranslations.blog, ...(englishTranslations.blog || {}) }
        }
      }
    }

    // If all else fails, use default translations
    return defaultTranslations
  } catch (error) {
    console.error('Error fetching translations:', error)
    return defaultTranslations
  }
} 