import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Array<{
    _id: string
    name: string
    slug: { current: string }
    tagline: string
    productImage: any
    category: string
  }>
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
} 