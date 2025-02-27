import { heroBlock } from './blocks/heroBlock'
import { featuresBlock, galleryBlock } from './blocks/pageBlocks'
import { videoBlock } from './blocks/videoBlock'
import page from './page'
import product from './product'
import productDocument from './productDocument'
import recommendedTool from './recommendedTool'
import { localizedText } from './shared/localizedText'

export const schemaTypes = [
  // Documents
  page,
  product,
  productDocument,
  recommendedTool,
  
  // Blocks
  heroBlock,
  featuresBlock,
  galleryBlock,
  videoBlock,
  
  // Shared
  localizedText,
]
