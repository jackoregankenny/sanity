import activeIngredient from './activeIngredient'
import product from './product'
import productDocument from './productDocument'
import productVariant from './productVariant'
import page from './page'
import component from './component'
import callToAction from './components/callToAction'
import recommendedTool from './recommendedTool'
import translations from './shared/translations'
import { blocks } from './blocks'
import { localizedText } from './shared/localizedText'
import { heroBlock, featuresBlock, galleryBlock, videoBlock } from './blocks/pageBlocks'

export const schemaTypes = [
  // Shared Types
  localizedText,
  translations,
  
  // Blocks
  ...blocks,
  
  // Page Builder Blocks
  heroBlock,
  featuresBlock,
  galleryBlock,
  videoBlock,
  
  // Products & Related
  product,
  productVariant,
  productDocument,
  activeIngredient,
  
  // Pages & Components
  page,
  component,
  callToAction,
  
  // Tools & Services
  recommendedTool
]
