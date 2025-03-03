import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN
})

const baseTranslations = {
  _type: 'translations',
  language: 'en',
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
  blog: {
    categories: 'Categories',
    recentPosts: 'Recent Posts',
    readMore: 'Read More',
    relatedPosts: 'Related Posts',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Enter your email',
    searchPlaceholder: 'Search articles...',
    noResults: 'No articles found',
    authorBy: 'By',
    publishedOn: 'Published on',
    backToList: 'Back to Blog',
    loadMore: 'Load More'
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    noResults: 'No results found',
    newsletter: {
      title: 'Subscribe to Our Newsletter',
      description: 'Stay updated with our latest news and updates',
      buttonText: 'Subscribe',
      placeholder: 'Your email address',
      successMessage: 'Thank you for subscribing!',
      errorMessage: 'Something went wrong. Please try again.'
    }
  }
}

async function createTranslations() {
  try {
    const doc = await client.create(baseTranslations)
    console.log('Created translations document:', doc._id)
  } catch (error) {
    console.error('Failed to create translations:', error)
  }
}

createTranslations() 