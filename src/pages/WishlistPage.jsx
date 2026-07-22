import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export default function WishlistPage() {
  const { wishlist } = useStore()
  return <div className="page-shell standard-page"><div className="page-intro"><span className="eyebrow">Saved for later</span><h1>Your wishlist</h1><p>Keep the good finds close until you are ready.</p></div>{wishlist.length ? <div className="product-grid">{wishlist.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="empty-state"><Heart /><h2>Nothing saved yet</h2><p>Tap the heart on any product to build your shortlist.</p><Link className="primary-button" to="/shop">Discover products</Link></div>}</div>
}
