import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'wfaq7tu4',
  dataset: 'production',
  useCdn: false, // We'll set this to true in production
  apiVersion: '2024-02-20', // Use today's date or your preferred version
}) 