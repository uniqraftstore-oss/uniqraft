import { useParams } from 'react-router-dom'

const content = {
  privacy: ['Privacy Policy', 'We collect only the information needed to process orders, answer support requests, improve the shopping experience, and meet legal obligations. We do not sell personal information. Payment details are processed by secure third-party providers.'],
  refund: ['Refund Policy', 'Eligible unused products can be requested for return within seven days of delivery. Products must be in original condition and packaging. Approved refunds are issued to the original payment method after inspection.'],
  shipping: ['Shipping Policy', 'Orders are typically dispatched within 24–48 business hours and delivered in 3–7 business days. Delivery time varies by pin code, product availability, weather, and courier operations. Tracking details are shared after dispatch.'],
  terms: ['Terms & Conditions', 'By using this website, you agree to provide accurate order information, use the service lawfully, and review product details before purchase. Product availability, pricing, and promotions may change without notice.'],
}

export default function PolicyPage() {
  const { type } = useParams(); const [title, text] = content[type] || content.terms
  return <div className="page-shell policy-page"><span className="eyebrow">UniQraft policies</span><h1>{title}</h1><p className="updated">Last updated: July 22, 2026</p><article><h2>Our commitment</h2><p>{text}</p><h2>Questions and support</h2><p>If you need clarification or help with an order, contact uniqraftstore@gmail.com. We aim to respond within one business day.</p><h2>Fair use and changes</h2><p>We may update this policy as our services evolve. Material changes are reflected on this page with a revised effective date.</p></article></div>
}
