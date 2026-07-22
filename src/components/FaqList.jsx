import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

const faqs = [
  ['Do you offer Cash on Delivery?', 'Yes. Cash on Delivery is available on eligible pin codes and products. Availability appears during checkout.'],
  ['How long does shipping take?', 'Most orders arrive in 3–7 business days. Remote locations may need a little longer.'],
  ['Can I return products?', 'Eligible unused products can be returned within seven days of delivery in their original packaging.'],
  ['How can I contact support?', 'Reach us by WhatsApp, email, phone, live chat, or the contact form.'],
  ['Are payments secure?', 'Yes. Payment details are handled through secure payment providers and are never stored by UniQraft.'],
  ['How do I track my order?', 'A tracking link is shared by email or WhatsApp once your order is dispatched.'],
]

export default function FaqList() {
  const [open, setOpen] = useState(0)
  return <div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{String(index + 1).padStart(2, '0')}</span>{question}{open === index ? <Minus /> : <Plus />}</button>{open === index && <p>{answer}</p>}</div>)}</div>
}
