import { client } from '@/sanity/client'
import ProductDetail from '@/components/products/ProductDetail'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getProduct(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      tagline,
      description,
      productImage,
      category,
      variants[] {
        country,
        crop,
        cropGroup,
        approvalNumber,
        formulationType,
        mechanismOfAction,
        containerSize,
        sizeUnit,
        details[] {
          _type,
          _type == 'activeIngredient' => {
            name,
            amount,
            units
          },
          _type == 'productDocument' => {
            documentType,
            "file": file.asset->
          }
        }
      }
    }
  `, { slug })
}

async function getRelatedProducts(category: string, currentId: string) {
  return client.fetch(`
    *[_type == "product" && category == $category && _id != $currentId] {
      _id,
      name,
      slug,
      productImage,
      category,
      variants[] {
        country
      }
    }
  `, { category, currentId })
}

export async function generateStaticParams() {
  const products = await client.fetch(`
    *[_type == "product"] {
      slug {
        current
      }
    }
  `)

  return products.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current,
  }))
}

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  // Fetch related products based on the same category
  const relatedProducts = await getRelatedProducts(product.category, product._id)

  return (
    <main className="py-8">
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </main>
  )
} 