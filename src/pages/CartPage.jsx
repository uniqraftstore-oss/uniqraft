import { Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { siteConfig } from '../data/siteConfig'
import { formatCurrency } from '../utils/format'

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart, notify } = useStore()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const applyCoupon = () => { const valid = coupon.trim().toUpperCase() === 'UNIQUE10'; setDiscount(valid ? Math.round(subtotal * .1) : 0); notify(valid ? 'UNIQUE10 applied' : 'Coupon is not valid') }
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : 99
  const taxable = Math.max(0, subtotal - discount)
  const gst = Math.round(taxable - taxable / (1 + siteConfig.gstRate))
  const total = taxable + shipping
  const remaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal)

  if (!cart.length) return <div className="page-shell standard-page"><div className="empty-state"><ShoppingBag /><h1>Your cart is waiting</h1><p>Discover useful, uncommon products and add your favourites.</p><Link className="primary-button" to="/shop">Start shopping</Link></div></div>

  return <div className="page-shell standard-page"><div className="page-intro compact"><span className="eyebrow">Your selection</span><h1>Shopping cart</h1></div>{remaining > 0 ? <div className="shipping-progress"><Truck /> Add {formatCurrency(remaining)} more for free shipping<div><span style={{ width: `${Math.min(100, subtotal / siteConfig.freeShippingThreshold * 100)}%` }} /></div></div> : <div className="shipping-progress success"><Truck /> You unlocked free shipping</div>}<div className="cart-layout"><div className="cart-list">{cart.map((item) => <article key={item.slug}><img src={item.image} alt={item.name} /><div><span>{item.category}</span><Link to={`/product/${item.slug}`}><h3>{item.name}</h3></Link><strong>{formatCurrency(item.price)}</strong></div><div className="quantity"><button onClick={() => updateQuantity(item.slug, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.slug, item.quantity + 1)}><Plus /></button></div><strong>{formatCurrency(item.price * item.quantity)}</strong><button className="remove" onClick={() => removeFromCart(item.slug)}><Trash2 /></button></article>)}</div><aside className="order-card"><h2>Order summary</h2><div className="coupon"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" /><button onClick={applyCoupon}>Apply</button></div><small>Try <strong>UNIQUE10</strong> for 10% off.</small><dl><div><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>{discount > 0 && <div className="discount"><dt>Coupon discount</dt><dd>−{formatCurrency(discount)}</dd></div>}<div><dt>Shipping estimate</dt><dd>{shipping ? formatCurrency(shipping) : 'Free'}</dd></div><div><dt>GST included</dt><dd>{formatCurrency(gst)}</dd></div><div className="total"><dt>Grand total</dt><dd>{formatCurrency(total)}</dd></div></dl><Link className="primary-button full" to="/checkout">Proceed to checkout</Link><p>Secure checkout · Easy 7-day returns</p></aside></div></div>
}
