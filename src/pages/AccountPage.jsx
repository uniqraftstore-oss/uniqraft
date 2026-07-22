import { Mail, Package, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AccountPage() {
  return <div className="page-shell standard-page"><div className="account-card"><UserRound /><span className="eyebrow">Your UniQraft space</span><h1>Account access is coming soon.</h1><p>For now, order updates arrive directly by email and WhatsApp. Our team can help with any order question.</p><div><Link className="primary-button" to="/contact"><Mail /> Contact support</Link><Link className="secondary-button" to="/shop"><Package /> Continue shopping</Link></div></div></div>
}
