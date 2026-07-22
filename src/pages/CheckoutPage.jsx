import { Check, ChevronRight, CreditCard, MapPin, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { siteConfig } from '../data/siteConfig'
import { formatCurrency } from '../utils/format'

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useStore()
  const [payment, setPayment] = useState('cod')
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const shipping = subtotal >= siteConfig.freeShippingThreshold ? 0 : 99

  const submit = async (event) => {
    event.preventDefault(); setStatus('sending')
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('order-items', cart.map((item) => `${item.name} × ${item.quantity}`).join('; '))
    data.set('order-total', String(subtotal + shipping))
    try {
      const response = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
      if (!response.ok) throw new Error('Order submission failed')
      setSubmitted(true); clearCart(); window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch { setStatus('error') }
  }

  if (!cart.length && !submitted) return <div className="page-shell standard-page"><div className="empty-state"><PackageCheck /><h1>Your cart is empty</h1><Link className="primary-button" to="/shop">Return to shop</Link></div></div>
  if (submitted) return <div className="page-shell standard-page"><div className="confirmation"><span><Check /></span><div className="eyebrow">Order confirmed</div><h1>Thank you for choosing uncommon.</h1><p>Your order request has been received. A confirmation and payment instructions are sent to your email shortly.</p><div><strong>UQ-{String(Date.now()).slice(-7)}</strong><small>Order reference</small></div><button className="primary-button" onClick={() => navigate('/')}>Continue shopping <ChevronRight /></button></div></div>

  return <div className="page-shell standard-page"><div className="page-intro compact"><span className="eyebrow">Secure checkout</span><h1>Complete your order</h1></div><form name="order" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="checkout-layout" onSubmit={submit}><input type="hidden" name="form-name" value="order" /><input name="bot-field" className="hidden" tabIndex="-1" autoComplete="off" /><input type="hidden" name="order-items" /><input type="hidden" name="order-total" /><div className="checkout-form"><section><h2><span>1</span> Customer details</h2><div className="form-grid"><label>Full name<input name="name" required /></label><label>Email address<input name="email" type="email" required /></label><label>Phone number<input name="phone" type="tel" required /></label></div></section><section><h2><span>2</span> Delivery address</h2><div className="form-grid"><label className="wide">Address<input name="address" required /></label><label>City<input name="city" required /></label><label>State<input name="state" required /></label><label>PIN code<input name="pincode" inputMode="numeric" required pattern="[0-9]{6}" /></label></div></section><section><h2><span>3</span> Payment method</h2><div className="payment-options"><label className={payment === 'cod' ? 'active' : ''}><input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={(event) => setPayment(event.target.value)} /><Truck /><span><strong>Cash on Delivery</strong><small>Pay when your order arrives</small></span></label><label className={payment === 'online' ? 'active' : ''}><input type="radio" name="payment" value="online" checked={payment === 'online'} onChange={(event) => setPayment(event.target.value)} /><CreditCard /><span><strong>Online payment</strong><small>Payment instructions follow confirmation</small></span></label></div></section></div><aside className="order-card checkout-summary"><h2>Order summary</h2>{cart.map((item) => <div className="checkout-item" key={item.slug}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small>Qty {item.quantity}</small></span><b>{formatCurrency(item.price * item.quantity)}</b></div>)}<dl><div><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div><div><dt>Shipping</dt><dd>{shipping ? formatCurrency(shipping) : 'Free'}</dd></div><div className="total"><dt>Total</dt><dd>{formatCurrency(subtotal + shipping)}</dd></div></dl><button className="primary-button full" type="submit" disabled={status === 'sending'}><ShieldCheck /> {status === 'sending' ? 'Placing order…' : 'Place order'}</button>{status === 'error' && <p className="form-error">We could not place the order. Please try again.</p>}<p>By placing your order, you agree to UniQraft’s terms and policies.</p></aside></form></div>
}
