import { ChevronUp, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><ChevronUp /></button>
      <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with UniQraft" data-tooltip="Chat with UniQraft"><MessageCircle /></a>
    </div>
  )
}
