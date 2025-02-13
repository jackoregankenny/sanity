import { ProductHero } from "./ProductHero"
import { ProductFeatures } from "./ProductFeatures"
import { ProductSpecs } from "./ProductSpecs"
import { RelatedProducts } from "./RelatedProducts"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import { type LanguageCode } from "@/config/languages"
import { type SanityDocument } from "next-sanity"

interface ProductVariant {
  name: string
  activeIngredient: string
  concentration: string
  formulationType: string
  mechanismOfAction: string
}

interface Product extends SanityDocument {
  name: string
  tagline: string
  description: string
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  category: string
  variants: ProductVariant[]
}

interface ProductLayout {
  title: string
  language: string
  isDefault: boolean
  ctaText: { text: string }
  featuresTitle: { text: string }
  specsTitle: { text: string }
  specLabels: {
    activeIngredient: { text: string }
    concentration: { text: string }
    formulationType: { text: string }
    mechanismOfAction: { text: string }
  }
  variantsTitle: { text: string }
  relatedTitle: { text: string }
}

interface ProductLayoutProps {
  product: Product
  layout: ProductLayout
  lang: LanguageCode
}

const getLayoutQuery = `*[_type == "productPageLayout" && language == $lang && isDefault == true][0]`

export async function getProductLayout(lang: LanguageCode) {
  return client.fetch<ProductLayout>(getLayoutQuery, { lang })
}

export function ProductLayout({ product, layout, lang }: ProductLayoutProps) {
  if (!layout) return null

  const productImage = product.productImage ? {
    url: urlFor(product.productImage).width(800).height(800).url(),
    alt: product.productImage.alt || product.name
  } : undefined

  return (
    <div className="flex flex-col min-h-screen">
      <ProductHero
        heading={product.name}
        subheading={product.tagline}
        ctaText={layout.ctaText.text}
        image={productImage}
      />

      <ProductFeatures
        sectionTitle={layout.featuresTitle.text}
        features={[
          {
            title: product.name,
            description: product.description,
            icon: 'shield'
          }
        ]}
      />

      {product.variants && product.variants.length > 0 && (
        <ProductSpecs
          sectionTitle={layout.specsTitle.text}
          specs={[
            {
              label: layout.specLabels.activeIngredient.text,
              value: product.variants[0].activeIngredient
            },
            {
              label: layout.specLabels.concentration.text,
              value: product.variants[0].concentration
            },
            {
              label: layout.specLabels.formulationType.text,
              value: product.variants[0].formulationType
            },
            {
              label: layout.specLabels.mechanismOfAction.text,
              value: product.variants[0].mechanismOfAction
            }
          ]}
        />
      )}

      {/* Related products would be fetched separately based on category or other criteria */}
      {/* <RelatedProducts
        sectionTitle={layout.relatedTitle.text}
        products={[]}
        lang={lang}
      /> */}
    </div>
  )
} 