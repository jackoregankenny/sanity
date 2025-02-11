import product from './product'
import productVariant from './productVariant'
import activeIngredient from './activeIngredient'
import productDocument from './productDocument'
import post from './post'
import author from './author'
import category from './category'

export const schemaTypes = [
  // Products
  product,
  productVariant,
  activeIngredient,
  productDocument,
  // Blog
  post,
  author,
  category
]
