import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, Mail, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from './BrandIcons'
import Logo from './Logo'
import { useStore } from '../context/StoreContext'
import { siteConfig } from '../data/siteConfig'

const links = [
  ['Home', '/'], ['Shop', '/shop'], ['Categories', '/shop#categories'],
  ['New Arrivals', '/shop?sort=newest'], ['Best Sellers', '/shop?filter=bestSeller'], ['About Us', '/about'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { itemCount, wishlist, theme, setTheme } = useStore()

  const search = (event) => {
    event.preventDefault()
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <>
      <div className="announcement">
        <span>Free shipping above ₹999</span><span>Easy 7-day returns</span><span>Secure payments</span>
      </div>
      <header className="site-header">
        <div className="page-shell nav-row">
          <button className="icon-button lg:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X /> : <Menu />}</button>
          <Logo />
          <nav className="desktop-nav">
            {links.map(([label, path]) => <NavLink key={label} to={path}>{label}</NavLink>)}
          </nav>
          <div className="nav-actions">
            <a className="icon-button hidden xl:grid" href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a className="icon-button hidden xl:grid" href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a className="icon-button hidden xl:grid" href={`mailto:${siteConfig.email}`} aria-label="Email UniQraft"><Mail /></a>
            <button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search /></button>
            <button className="icon-button hidden sm:grid" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">{theme === 'light' ? <Moon /> : <Sun />}</button>
            <Link className="icon-button hidden sm:grid" to="/account" aria-label="Account"><UserRound /></Link>
            <Link className="icon-button count-button" to="/wishlist" aria-label="Wishlist"><Heart /><em>{wishlist.length}</em></Link>
            <Link className="icon-button count-button" to="/cart" aria-label="Cart"><ShoppingBag /><em>{itemCount}</em></Link>
          </div>
        </div>
        {searchOpen && (
          <form className="page-shell search-panel" onSubmit={search}>
            <Search size={19} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cameras, lamps, kitchen tools…" /><button>Search</button>
          </form>
        )}
        {open && (
          <nav className="mobile-nav">
            {links.map(([label, path]) => <NavLink key={label} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          </nav>
        )}
      </header>
    </>
  )
}
