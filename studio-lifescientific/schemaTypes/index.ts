import { heroBlock } from './blocks/heroBlock'
import { featuresBlock, galleryBlock } from './blocks/pageBlocks'
import { videoBlock } from './blocks/videoBlock'
import { landingPageBlocks } from './blocks/landingPageBlocks'
import page from './page'
import product from './product'
import productDocument from './productDocument'
import recommendedTool from './recommendedTool'
import { localizedText } from './shared/localizedText'
import blogPost from './blogPost'
import category from './category'
import author from './author'
import blogPage from './blogPage'
import navigation from './navigation'

export const schemaTypes = [
  // Documents
  page,
  product,
  productDocument,
  recommendedTool,
  blogPost,
  category,
  author,
  blogPage,
  navigation,
  
  // Blocks
  heroBlock,
  featuresBlock,
  galleryBlock,
  videoBlock,
  ...landingPageBlocks,
  
  // Shared
  localizedText,
]
