import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
})

export const urlForImage = (source: Image | undefined) => {
  if (!source) {
    return undefined
  }

  return imageBuilder.image(source)
} 