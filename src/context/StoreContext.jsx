import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('uniqraft-cart', [])
  const [wishlist, setWishlist] = useLocalStorage('uniqraft-wishlist', [])
  const [compare, setCompare] = useLocalStorage('uniqraft-compare', [])
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('uniqraft-recent', [])
  const [theme, setTheme] = useLocalStorage('uniqraft-theme', 'light')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__uniqraftToast)
    window.__uniqraftToast = window.setTimeout(() => setToast(null), 2400)
  }

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.slug === product.slug)
      return existing
        ? current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    notify(`${product.name} added to cart`)
  }

  const updateQuantity = (slug, quantity) => {
    if (quantity < 1) return setCart((current) => current.filter((item) => item.slug !== slug))
    setCart((current) => current.map((item) => item.slug === slug ? { ...item, quantity } : item))
  }

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.slug === product.slug)
    setWishlist((current) => exists ? current.filter((item) => item.slug !== product.slug) : [...current, product])
    notify(exists ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const toggleCompare = (product) => {
    const exists = compare.some((item) => item.slug === product.slug)
    if (!exists && compare.length >= 3) return notify('Compare up to 3 products at a time')
    setCompare((current) => exists ? current.filter((item) => item.slug !== product.slug) : [...current, product])
    notify(exists ? 'Removed from comparison' : 'Added to comparison')
  }

  const rememberProduct = (product) => {
    setRecentlyViewed((current) => [product, ...current.filter((item) => item.slug !== product.slug)].slice(0, 8))
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = useMemo(() => ({
    cart, wishlist, compare, recentlyViewed, theme, toast, itemCount, subtotal,
    addToCart, updateQuantity, removeFromCart: (slug) => setCart((items) => items.filter((item) => item.slug !== slug)),
    clearCart: () => setCart([]), toggleWishlist, toggleCompare, rememberProduct,
    setTheme, notify,
  }), [cart, wishlist, compare, recentlyViewed, theme, toast, itemCount, subtotal])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
