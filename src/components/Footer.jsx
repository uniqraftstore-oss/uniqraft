import { Mail, Send } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from './BrandIcons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { siteConfig } from '../data/siteConfig'

const groups = [
  { title: 'Discover', links: [['Shop all', '/shop'], ['New arrivals', '/shop?sort=newest'], ['Best sellers', '/shop?filter=bestSeller'], ['Categories', '/shop#categories']] },
  { title: 'Company', links: [['About us', '/about'], ['Contact', '/contact'], ['FAQ', '/#faq'], ['Track order', '/contact']] },
  { title: 'Policies', links: [['Privacy policy', '/policies/privacy'], ['Refund policy', '/policies/refund'], ['Shipping policy', '/policies/shipping'], ['Terms & conditions', '/policies/terms']] },
]

export default function Footer() {
  const [status, setStatus] = useState('idle')
  const subscribe = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    try {
      const data = new FormData(form)
      const response = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
      if (!response.ok) throw new Error('Subscription failed')
      form.reset(); setStatus('success')
    } catch { setStatus('error') }
  }
  return (
    <footer className="footer">
      <div className="page-shell newsletter">
        <div><span className="eyebrow text-saffron">Private list</span><h2>Get the good finds first.</h2><p>New drops, practical discoveries, and subscriber-only offers.</p></div>
        <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={subscribe} className="newsletter-form">
          <input type="hidden" name="form-name" value="newsletter" /><input name="bot-field" className="hidden" tabIndex="-1" autoComplete="off" />
          <input name="email" type="email" required placeholder="Your email address" aria-label="Email address" /><button type="submit" disabled={status === 'sending'}><Send size={18} /> {status === 'sending' ? 'Sending…' : 'Subscribe'}</button>
          {status === 'success' && <small>Welcome to the list.</small>}{status === 'error' && <small>Try again or email us directly.</small>}
        </form>
      </div>
      <div className="page-shell footer-grid">
        <div className="footer-brand"><Logo /><p>Thoughtfully selected products that feel different, work beautifully, and make everyday moments more special.</p><div className="socials"><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a><a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a><a href={`mailto:${siteConfig.email}`} aria-label="Email UniQraft"><Mail /></a></div></div>
        {groups.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.links.map(([label, path]) => <Link key={label} to={path}>{label}</Link>)}</div>)}
      </div>
      <div className="page-shell footer-bottom"><span>© 2026 UniQraft. All Rights Reserved.</span><span>Made for uncommon everyday finds.</span></div>
    </footer>
  )
}
