import { client } from '@/sanity/client'
import ProductGrid from '@/components/products/ProductGrid'

export const revalidate = 60

async function getProducts() {
  return client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      slug,
      tagline,
      productImage,
      category
    }
  `)
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Our Products</h1>
      <ProductGrid products={products} />
    </main>
  )
} 