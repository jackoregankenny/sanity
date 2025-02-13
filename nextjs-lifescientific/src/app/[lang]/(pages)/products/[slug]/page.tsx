import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import { notFound } from "next/navigation"
import { type LanguageCode, languages } from "@/config/languages"
import Image from "next/image"
import { Metadata } from "next"

interface ActiveIngredient {
  name: string
  amount: string
  units: string
}

interface ProductVariant {
  name: string
  activeIngredients: ActiveIngredient[]
}

interface ProductDocument {
  documentType: 'sds' | 'label' | 'technical' | 'registration'
  file: {
    asset: {
      url: string
    }
  }
}

interface Product extends SanityDocument {
  name: string
  tagline: string
  description: string
  category: 'pesticide' | 'herbicide' | 'fungicide'
  features: string[]
  specifications: Array<{
    label: string
    value: string
  }>
  ingredients: Array<{
    name: string
    percentage: string
    description: string
  }>
  variants: ProductVariant[]
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  gallery?: Array<{
    asset: {
      _ref: string
    }
    alt?: string
  }>
  documents?: ProductDocument[]
}

interface ProductPage extends SanityDocument {
  product: Product
  seoTitle?: string
  seoDescription?: string
  uiText: {
    variantsTitle: string
    documentsTitle: string
    documentLabels: {
      sds: string
      label: string
      technical: string
      registration: string
    }
    variantLabels: {
      ingredients: string
      formulation: string
      registration: string
      containers: string
    }
    buttonLabels: {
      download: string
      viewMore: string
    }
  }
}

interface Props {
  params: {
    lang: LanguageCode
    slug: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Validate params first
  const { lang, slug } = await validateParams(params)

  const product = await client.fetch<Product | null>(
    PRODUCT_QUERY,
    { slug, lang }
  )

  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  return {
    title: `${product.name} | Life Scientific`,
    description: product.tagline,
  }
}

// Query to get a single product
const PRODUCT_QUERY = `*[
  _type == "product" && 
  slug.current == $slug && 
  language == $lang
][0] {
  _id,
  _type,
  name,
  tagline,
  description,
  category,
  features,
  specifications,
  ingredients,
  variants[] {
    name,
    activeIngredients[] {
      name,
      amount,
      units
    }
  },
  productImage,
  gallery,
  "documents": *[_type == "productDocument" && references(^._id)] {
    documentType,
    "file": file.asset->
  }
}`

// Validate params before using them
async function validateParams(params: Props['params']) {
  const { lang, slug } = params
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
  return { lang, slug }
}

export default async function ProductPage({ params }: Props) {
  // Validate params first
  const { lang, slug } = await validateParams(params)

  try {
    const product = await client.fetch<Product | null>(
      PRODUCT_QUERY,
      { slug, lang },
      { next: { revalidate: 30 } }
    )

    if (!product) {
      notFound()
    }

    const imageUrl = product.productImage?.asset?._ref
      ? urlFor(product.productImage).width(1200).height(800).url()
      : null

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto max-w-7xl px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.productImage?.alt || product.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                {product.gallery && product.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={urlFor(image).width(200).height(200).url()}
                          alt={image.alt || `${product.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform"
                          sizes="(min-width: 1024px) 12.5vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6">
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 capitalize mb-4">
                    {product.category}
                  </span>
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                  <p className="text-xl text-gray-600">{product.tagline}</p>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p>{product.description}</p>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documents */}
                {product.documents && product.documents.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Product Documents</h2>
                    <div className="flex flex-wrap gap-4">
                      {product.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.file.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          {doc.documentType.toUpperCase()}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="bg-white border-b">
            <div className="container mx-auto max-w-7xl px-4 py-16">
              <h2 className="text-3xl font-bold mb-8">Specifications</h2>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="grid divide-y divide-gray-200">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-3 p-4">
                      <dt className="font-medium text-gray-500">{spec.label}</dt>
                      <dd className="col-span-2 text-gray-900">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ingredients Section */}
        {product.ingredients && product.ingredients.length > 0 && (
          <section className="bg-white border-b">
            <div className="container mx-auto max-w-7xl px-4 py-16">
              <h2 className="text-3xl font-bold mb-8">Active Ingredients</h2>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <h3 className="font-semibold text-lg">{ingredient.name}</h3>
                      <span className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {ingredient.percentage}
                      </span>
                    </div>
                    <p className="text-gray-600">{ingredient.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Variants Section */}
        {product.variants && product.variants.length > 0 && (
          <section className="bg-white">
            <div className="container mx-auto max-w-7xl px-4 py-16">
              <h2 className="text-3xl font-bold mb-8">Product Variants</h2>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {product.variants.map((variant, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">{variant.name}</h3>
                    <div className="space-y-3">
                      {variant.activeIngredients.map((ingredient, idx) => (
                        <div key={idx} className="flex items-baseline justify-between gap-2">
                          <span className="text-gray-700">{ingredient.name}</span>
                          <span className="text-sm font-medium text-gray-500">
                            {ingredient.amount}{ingredient.units}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="bg-white rounded-lg border p-8">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-red-600">Error loading product. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }
}

// Generate static params for all products in all languages
export async function generateStaticParams() {
  const products = await client.fetch<Array<{ slug: { current: string }, language: string }>>(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      "language": language
    }`
  )

  return products.map((product) => ({
    lang: product.language,
    slug: product.slug,
  }))
} 