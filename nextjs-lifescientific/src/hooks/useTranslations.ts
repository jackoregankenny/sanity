import { client } from '@/sanity/client'
import { languages } from '@/config/languages'

export type LanguageCode = typeof languages[number]['id']

interface Translations {
  nav: {
    products: string
    about: string
    contact: string
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
  }
}

// Default English translations as fallback
const defaultTranslations: Translations = {
  nav: {
    products: 'Products',
    about: 'About',
    contact: 'Contact'
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
    noResults: 'No results found.'
  }
}

const TRANSLATIONS_QUERY = `*[_type == "translations" && language == $lang][0] {
  nav,
  products,
  common
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
        common: { ...defaultTranslations.common, ...translations.common }
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
          common: { ...defaultTranslations.common, ...englishTranslations.common }
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