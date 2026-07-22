import { Link } from 'react-router-dom'
import logo from '../assets/uniqraft-logo.png'

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="brand-lockup" aria-label="UniQraft home">
      <img src={logo} alt="UniQraft" className={compact ? 'h-10 w-10' : 'h-12 w-12'} />
      <span className="hidden sm:block">
        <strong>Uni<span>Qraft</span></strong>
        <small>Unique Products</small>
      </span>
    </Link>
  )
}
