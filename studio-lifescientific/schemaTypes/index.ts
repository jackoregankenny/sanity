import activeIngredient from './activeIngredient'
import author from './author'
import category from './category'
import post from './post'
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

export const schemaTypes = [
  // Shared Types
  localizedText,
  translations,
  
  // Blocks
  ...blocks,
  
  // Products
  product,
  productVariant,
  productDocument,
  activeIngredient,
  
  // Blog
  post,
  author,
  category,
  
  // Pages
  page,
  
  // Components
  component,
  callToAction,
  
  // Tools & Services
  recommendedTool
]
