import { Star } from 'lucide-react'

export default function Rating({ rating, reviews, light = false }) {
  return <div className={`rating ${light ? 'text-white/80' : ''}`}><Star size={14} fill="currentColor" /><strong>{rating}</strong>{reviews !== undefined && <span>({reviews})</span>}</div>
}
