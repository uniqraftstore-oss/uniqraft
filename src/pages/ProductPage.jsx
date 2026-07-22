import { useEffect, useState } from 'react'
import { ArrowRightLeft, CalendarDays, Check, Heart, Mail, Minus, Plus, RotateCcw, Share2, ShieldCheck, ShoppingBag } from 'lucide-react'
import { FacebookIcon } from '../components/BrandIcons'
import { Link, useParams } from 'react-router-dom'
import { productBySlug, products } from '../data/products'
import { useStore } from '../context/StoreContext'
import { formatCurrency } from '../utils/format'
import Rating from '../components/Rating'
import ProductRail from '../components/ProductRail'
import NotFoundPage from './NotFoundPage'

export default function ProductPage() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  const [image, setImage] = useState(product?.image)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('description')
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, rememberProduct, recentlyViewed } = useStore()

  useEffect(() => {
    if (!product) return
    setImage(product.image)
    rememberProduct(product)
    document.title = `${product.name} | UniQraft`
    let schema = document.querySelector('#product-schema')
    if (!schema) { schema = document.createElement('script'); schema.id = 'product-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema) }
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: product.gallery, description: product.description, brand: { '@type': 'Brand', name: product.brand }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price, availability: 'https://schema.org/InStock' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews } })
    return () => { document.title = 'UniQraft — Unique Products for Everyday Life'; document.querySelector('#product-schema')?.remove() }
  }, [product?.slug])

  if (!product) return <NotFoundPage />
  const liked = wishlist.some((item) => item.slug === product.slug)
  const compared = compare.some((item) => item.slug === product.slug)
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 8)
  const deliveryDate = new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })
  const shareText = encodeURIComponent(`Look at ${product.name} on UniQraft`)
  const shareUrl = encodeURIComponent(window.location.href)

  return (
    <div className="page-shell product-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to={`/shop?category=${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
      <div className="product-detail-grid">
        <div className="gallery"><div className="thumbnails">{product.gallery.map((source, index) => <button key={source} className={image === source ? 'active' : ''} onClick={() => setImage(source)}><img src={source} alt={`${product.name} view ${index + 1}`} /></button>)}</div><div className="main-image"><img src={image} alt={product.name} /></div></div>
        <div className="product-info"><span className="eyebrow">{product.category} · {product.brand}</span><h1>{product.name}</h1><Rating rating={product.rating} reviews={product.reviews} /><p className="product-lede">{product.description}</p><div className="detail-price"><strong>{formatCurrency(product.price)}</strong><s>{formatCurrency(product.originalPrice)}</s>{product.discount > 0 && <span>Save {product.discount}%</span>}</div><p className="tax-note">Inclusive of all taxes</p><div className="stock-note"><span></span> In stock — only {product.stock} available</div><div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Plus /></button></div><button className="primary-button grow" onClick={() => addToCart(product, quantity)}><ShoppingBag /> Add to cart</button></div><div className="secondary-actions"><button onClick={() => toggleWishlist(product)}><Heart fill={liked ? 'currentColor' : 'none'} />{liked ? 'Wishlisted' : 'Add to wishlist'}</button><button onClick={() => toggleCompare(product)}><ArrowRightLeft />{compared ? 'Comparing' : 'Compare'}</button></div><div className="delivery-cards"><div><CalendarDays /><span><strong>Estimated delivery</strong><small>By {deliveryDate}</small></span></div><div><RotateCcw /><span><strong>Easy returns</strong><small>Within 7 days</small></span></div><div><ShieldCheck /><span><strong>Secure purchase</strong><small>Protected checkout</small></span></div></div><div className="share-row"><Share2 /> Share <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><FacebookIcon /></a><a href={`mailto:?subject=${shareText}&body=${shareUrl}`} aria-label="Share by email"><Mail /></a></div></div>
      </div>
      <div className="product-tabs"><div>{['description', 'specifications', 'reviews'].map((name) => <button className={tab === name ? 'active' : ''} onClick={() => setTab(name)} key={name}>{name}</button>)}</div>{tab === 'description' && <article><h2>Designed to be useful, chosen to feel different.</h2><p>{product.description} Our collection focuses on practical details, easy everyday use, and products that make thoughtful gifts.</p></article>}{tab === 'specifications' && <article><h2>Product specifications</h2><dl>{Object.entries(product.specifications).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></article>}{tab === 'reviews' && <article><h2>Customer reviews</h2><div className="review-summary"><strong>{product.rating}</strong><Rating rating={product.rating} reviews={product.reviews} /><p>Customers appreciate the product’s value, usefulness, and easy ordering experience.</p></div></article>}</div>
      <section className="section"><div className="section-heading"><div><span className="eyebrow">You may also like</span><h2>Related products</h2></div></div><ProductRail products={related} /></section>
      {recentlyViewed.filter((item) => item.slug !== product.slug).length > 0 && <section className="section"><div className="section-heading"><div><span className="eyebrow">Your browsing trail</span><h2>Recently viewed</h2></div></div><ProductRail products={recentlyViewed.filter((item) => item.slug !== product.slug)} /></section>}
    </div>
  )
}
