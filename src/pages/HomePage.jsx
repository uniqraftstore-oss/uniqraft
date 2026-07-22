import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeIndianRupee, BadgeCheck, Clock3, Headphones, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/ProductCard'
import ProductRail from '../components/ProductRail'
import SectionHeading from '../components/SectionHeading'
import FaqList from '../components/FaqList'
import Rating from '../components/Rating'
import { siteConfig } from '../data/siteConfig'

const heroProducts = products.filter((product) => product.featured).slice(0, 3)
const reasons = [
  [BadgeCheck, 'Premium quality', 'Useful products with thoughtful quality checks.'],
  [BadgeIndianRupee, 'Honest pricing', 'Competitive prices without compromising usefulness.'],
  [Sparkles, 'Carefully curated', 'Every product earns its place in the collection.'],
  [Truck, 'Fast delivery', 'Prompt dispatch and reliable shipping partners.'],
  [RotateCcw, 'Easy returns', 'A straightforward seven-day return window.'],
  [ShieldCheck, 'Secure payments', 'Protected checkout and trusted payment methods.'],
  [PackageCheck, 'Trusted store', 'Clear product details and dependable support.'],
  [Headphones, 'Friendly support', 'Real help before and after your purchase.'],
]

const testimonials = [
  ['Aarohi Mehta', 'Exactly as shown. The lamp feels premium and the packaging was excellent.', 'AM'],
  ['Kabir Bhatia', 'Amazing quality and quick delivery. I found three genuinely useful products.', 'KB'],
  ['Naina Joseph', 'Excellent customer service. The WhatsApp response was quick and helpful.', 'NJ'],
  ['Rohan Iyer', 'Highly recommended for uncommon gifts that do not feel generic.', 'RI'],
]

function Countdown() {
  const [remaining, setRemaining] = useState(6 * 60 * 60 + 42 * 60 + 18)
  useEffect(() => { const timer = setInterval(() => setRemaining((value) => value > 0 ? value - 1 : 21600), 1000); return () => clearInterval(timer) }, [])
  const units = [Math.floor(remaining / 3600), Math.floor((remaining % 3600) / 60), remaining % 60]
  return <div className="countdown">{units.map((value, index) => <div key={index}><strong>{String(value).padStart(2, '0')}</strong><span>{['Hours', 'Minutes', 'Seconds'][index]}</span></div>)}</div>
}

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 8)
  const newest = products.filter((product) => product.newArrival).slice(0, 10)
  const best = products.filter((product) => product.bestSeller).slice(0, 8)

  return (
    <>
      <section className="hero">
        <div className="page-shell hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <span className="eyebrow">Curated for curious people</span>
            <h1>Find the <em>uncommon</em> in everyday life.</h1>
            <p>Thoughtfully selected products that feel different, work beautifully, and make everyday moments a little more special.</p>
            <div className="hero-buttons"><Link className="primary-button" to="/shop">Explore collection <ArrowRight /></Link><Link className="secondary-button" to="/shop#categories">Browse categories</Link></div>
            <div className="hero-proof"><div><strong>70+</strong><span>Curated finds</span></div><div><strong>7-day</strong><span>Easy returns</span></div><div><strong>4.7/5</strong><span>Customer love</span></div></div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1 }}>
            <div className="hero-orbit">UQ</div>
            <img src={heroProducts[0].image} alt="Curated UniQraft lifestyle products" />
            <div className="floating-product top-card"><img src={heroProducts[1].image} alt="" /><span><small>Today’s find</small><strong>{heroProducts[1].name}</strong></span></div>
            <div className="floating-product bottom-card"><Clock3 /><span><small>Dispatch</small><strong>Within 24–48 hours</strong></span></div>
          </motion.div>
        </div>
      </section>

      <section className="section page-shell" id="categories">
        <SectionHeading eyebrow="Shop your way" title="Useful things, sorted beautifully." copy="From clever kitchen helpers to gifts people remember." action={<Link className="text-link" to="/shop">View all <ArrowRight /></Link>} />
        <div className="category-grid">{categories.slice(0, 8).map(({ name, icon: Icon, tone }, index) => <Link to={`/shop?category=${encodeURIComponent(name)}`} className={`category-card ${tone}`} key={name}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><strong>{name}</strong><ArrowRight /></Link>)}</div>
      </section>

      <section className="section page-shell">
        <SectionHeading eyebrow="The UniQraft edit" title="Products worth a second look." copy="Distinctive, practical, and chosen to earn a place in your day." />
        <div className="product-grid">{featured.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>

      <section className="section soft-section">
        <div className="page-shell"><SectionHeading eyebrow="Freshly found" title="New arrivals" copy="The latest additions to our evolving collection." action={<Link className="text-link" to="/shop?sort=newest">See new arrivals <ArrowRight /></Link>} /><ProductRail products={newest} /></div>
      </section>

      <section className="section page-shell flash-section">
        <div className="flash-copy"><span className="eyebrow text-saffron">Limited quantity</span><h2>The uncommon price drop.</h2><p>Short-run offers on a few of our most talked-about finds. Once they’re gone, they may not return at this price.</p><Countdown /><Link className="light-button" to="/shop?filter=featured">Shop flash sale <ArrowRight /></Link></div>
        <div className="flash-products">{products.filter((product) => product.discount >= 50).slice(0, 2).map((product) => <Link to={`/product/${product.slug}`} key={product.slug}><img src={product.image} alt={product.name} /><span><Rating rating={product.rating} reviews={product.reviews} light /><strong>{product.name}</strong><small>Only {product.stock} left</small></span></Link>)}</div>
      </section>

      <section className="section page-shell"><SectionHeading eyebrow="Loved for a reason" title="Best sellers" copy="The products customers return to and recommend." /><div className="product-grid">{best.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>

      <section className="section why-section"><div className="page-shell"><SectionHeading eyebrow="The UniQraft standard" title="A better way to discover products." /><div className="reason-grid">{reasons.map(([Icon, title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section page-shell"><SectionHeading eyebrow="Real notes from real orders" title="What our customers say" /><div className="testimonial-grid">{testimonials.map(([name, review, initials], index) => <article key={name} className={index === 1 ? 'featured-testimonial' : ''}><div className="quote-mark">“</div><Rating rating="5.0" /><p>{review}</p><div className="customer"><span>{initials}</span><div><strong>{name}</strong><small>Verified customer</small></div></div></article>)}</div></section>

      <section className="section faq-section" id="faq"><div className="page-shell faq-grid"><div><span className="eyebrow">Good to know</span><h2>Questions, answered clearly.</h2><p>Need something else? Our support team is happy to help.</p><Link className="secondary-button" to="/contact">Talk to support</Link></div><FaqList /></div></section>

      <section className="support-strip"><div className="page-shell support-grid">{[[Headphones, 'WhatsApp support', `Chat on ${siteConfig.phone}`], [MailIcon, 'Email support', siteConfig.email], [Clock3, 'Business hours', siteConfig.businessHours], [BadgeCheck, 'Average response', siteConfig.responseTime]].map(([Icon, title, copy]) => <div key={title}><Icon /><span><strong>{title}</strong><small>{copy}</small></span></div>)}</div></section>
    </>
  )
}

function MailIcon(props) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
}
