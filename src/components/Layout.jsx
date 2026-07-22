import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import FloatingActions from './FloatingActions'
import Toast from './Toast'

export default function Layout() {
  const location = useLocation()
  useEffect(() => {
    const labels = { '/shop': 'Shop Unique Products', '/about': 'About UniQraft', '/contact': 'Contact UniQraft', '/cart': 'Shopping Cart', '/wishlist': 'Wishlist', '/checkout': 'Secure Checkout', '/compare': 'Compare Products' }
    if (!location.pathname.startsWith('/product/')) document.title = `${labels[location.pathname] || 'Unique Products'} | UniQraft`
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.href = `https://uniqraft-shop.netlify.app${location.pathname}`
    const description = document.querySelector('meta[name="description"]')
    if (description && location.pathname === '/shop') description.content = 'Shop UniQraft’s complete collection of smart gadgets, home, kitchen, lifestyle, beauty, gifts and accessories.'
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <div className="min-h-screen bg-white text-midnight transition-colors dark:bg-[#07111f] dark:text-white">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname + location.search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer /><FloatingActions /><Toast />
    </div>
  )
}
