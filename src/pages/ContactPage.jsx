import { Clock3, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../data/siteConfig'

export default function ContactPage() {
  const [status, setStatus] = useState('idle')
  const submit = async (event) => {
    event.preventDefault(); setStatus('sending')
    try {
      const data = new FormData(event.currentTarget)
      const response = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
      if (!response.ok) throw new Error('Submission failed')
      event.currentTarget.reset(); setStatus('success')
    } catch { setStatus('error') }
  }
  return <div className="page-shell standard-page"><div className="contact-grid"><div className="contact-copy"><span className="eyebrow">Talk to a real person</span><h1>We’re here to help.</h1><p>Questions about a product, delivery, return, or order? Pick the channel that works best for you.</p><div className="contact-methods"><a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle /><span><strong>WhatsApp support</strong><small>Quick product and order help</small></span></a><a href={`mailto:${siteConfig.email}`}><Mail /><span><strong>Email support</strong><small>{siteConfig.email}</small></span></a><a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}><Phone /><span><strong>Phone support</strong><small>{siteConfig.phone}</small></span></a><div><Clock3 /><span><strong>Business hours</strong><small>{siteConfig.businessHours}</small></span></div></div></div><form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="contact-form"><input type="hidden" name="form-name" value="contact" /><input name="bot-field" className="hidden" tabIndex="-1" autoComplete="off" /><div><span className="eyebrow">Send a message</span><h2>How can we help?</h2></div><label>Your name<input name="name" required /></label><label>Email address<input name="email" type="email" required /></label><label>Phone number<input name="phone" type="tel" /></label><label>Subject<select name="subject" required><option value="">Choose a topic</option><option>Product question</option><option>Order support</option><option>Return or refund</option><option>Other</option></select></label><label>Message<textarea name="message" rows="5" required /></label><button className="primary-button full" disabled={status === 'sending'}><Send /> {status === 'sending' ? 'Sending…' : 'Send message'}</button>{status === 'success' && <p className="form-success">Thanks—your message is on its way.</p>}{status === 'error' && <p className="form-error">Something went wrong. Please email us directly.</p>}</form></div></div>
}
