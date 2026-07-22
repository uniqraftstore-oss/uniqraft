import { motion } from 'framer-motion'
import { ArrowRightLeft, Eye, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatCurrency } from '../utils/format'
import Rating from './Rating'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare } = useStore()
  const liked = wishlist.some((item) => item.slug === product.slug)
  const compared = compare.some((item) => item.slug === product.slug)

  return (
    <motion.article className="product-card" whileHover={{ y: -7 }} transition={{ duration: .25 }}>
      <div className="product-image-wrap">
        <Link to={`/product/${product.slug}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
        <span className="product-badge">{product.badge}</span>
        <div className="product-actions">
          <button className={liked ? 'active' : ''} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"><Heart fill={liked ? 'currentColor' : 'none'} /></button>
          <Link to={`/product/${product.slug}`} aria-label="Quick view"><Eye /></Link>
          <button className={compared ? 'active' : ''} onClick={() => toggleCompare(product)} aria-label="Compare product"><ArrowRightLeft /></button>
        </div>
      </div>
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <Rating rating={product.rating} reviews={product.reviews} />
        <div className="price-row"><strong>{formatCurrency(product.price)}</strong><s>{formatCurrency(product.originalPrice)}</s>{product.discount > 0 && <span>{product.discount}% off</span>}</div>
        <button className="add-button" onClick={() => addToCart(product)}><ShoppingBag size={17} /> Add to cart</button>
      </div>
    </motion.article>
  )
}
