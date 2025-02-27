import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './sanity.client'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || 'production',
})

/**
 * Helper function to generate image URLs from Sanity image references
 * @param source Sanity image object with asset reference
 * @returns The image URL builder or null if source is invalid
 */
export const urlForImage = (source: any) => {
  if (!source || !source.asset) {
    return null
  }
  
  return imageBuilder.image(source).auto('format').fit('max')
} 