import { ArrowRightLeft, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatCurrency } from '../utils/format'

export default function ComparePage() {
  const { compare, toggleCompare, addToCart } = useStore()
  if (!compare.length) return <div className="page-shell standard-page"><div className="empty-state"><ArrowRightLeft /><h1>No products to compare</h1><p>Add up to three products from any product card.</p><Link className="primary-button" to="/shop">Browse products</Link></div></div>
  const rows = [
    ['Price', (product) => formatCurrency(product.price)], ['MRP', (product) => formatCurrency(product.originalPrice)],
    ['Rating', (product) => `${product.rating} / 5`], ['Reviews', (product) => product.reviews],
    ['Brand', (product) => product.brand], ['Category', (product) => product.category],
    ['Availability', (product) => `${product.stock} in stock`], ['Featured', (product) => product.featured ? <Check /> : '—'],
    ['Best seller', (product) => product.bestSeller ? <Check /> : '—'],
  ]
  return <div className="page-shell standard-page compare-page"><div className="page-intro compact"><span className="eyebrow">Side by side</span><h1>Compare products</h1><p>Look past the headline price and choose what fits your day best.</p></div><div className="compare-table"><div className="compare-head"><span>Product</span>{compare.map((product) => <article key={product.slug}><button onClick={() => toggleCompare(product)} aria-label={`Remove ${product.name}`}><X /></button><img src={product.image} alt={product.name} /><Link to={`/product/${product.slug}`}><strong>{product.name}</strong></Link><button className="add-button" onClick={() => addToCart(product)}>Add to cart</button></article>)}</div>{rows.map(([label, render]) => <div className="compare-row" key={label}><strong>{label}</strong>{compare.map((product) => <span key={product.slug}>{render(product)}</span>)}</div>)}</div></div>
}
