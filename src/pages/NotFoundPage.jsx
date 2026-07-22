import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="page-shell standard-page"><div className="not-found"><strong>404</strong><span className="eyebrow">Lost between the shelves</span><h1>This find has wandered off.</h1><p>The page may have moved, or the product is no longer in this collection.</p><Link className="primary-button" to="/"><ArrowLeft /> Back home</Link></div></div>
}
