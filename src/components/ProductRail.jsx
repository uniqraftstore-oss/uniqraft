import ProductCard from './ProductCard'

export default function ProductRail({ products }) {
  return <div className="product-rail">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
}
