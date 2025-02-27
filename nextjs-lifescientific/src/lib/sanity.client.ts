import { createClient as createSanityClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-07-01'

export const createClient = () => {
  if (!projectId) {
    // During development, provide a helpful error message
    console.error(
      '❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable\n' +
      '1. Create a .env.local file in your Next.js app\'s root directory\n' +
      '2. Add NEXT_PUBLIC_SANITY_PROJECT_ID="your-actual-project-id" to the file\n' +
      '3. Get your project ID from your Sanity Studio\'s sanity.config.ts file\n' +
      '4. Restart your Next.js app\n'
    )
    
    // Don't use a placeholder in development to make the error obvious
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Missing Sanity Project ID - see console for instructions')
    }
  }
  
  return createSanityClient({
    projectId: projectId || '', // Don't use a placeholder as it causes confusing dataset errors
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production',
    // For additional debugging: 
    // stega: {
    //   enabled: process.env.NODE_ENV === 'development',
    // },
  })
} 