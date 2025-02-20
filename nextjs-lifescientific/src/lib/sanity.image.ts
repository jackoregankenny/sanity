import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { client } from '@/sanity/client'

const { projectId, dataset } = client.config()

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source)
} 