import { slugify } from '../utils/format'

const categoryImages = {
  Electronics: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=82',
  Home: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=82',
  Kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=82',
  Beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=82',
  Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=82',
  Lifestyle: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=82',
  Accessories: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1200&q=82',
  Gifts: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=82',
  Office: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=82',
  Kids: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=82',
  Travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=82',
  Health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=82',
  'Smart Gadgets': 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=82',
  'Home Decor': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82',
}

const galleryImages = [
  'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=82',
]

const highestNumber = (value) => {
  if (!value || /not|too/i.test(String(value))) return 0
  const values = String(value).match(/\d+(?:\.\d+)?/g)?.map(Number) || []
  return Math.max(0, ...values)
}

const createProduct = ({ name, category, image: productImage, brand = 'UniQraft Select', prices, uniqraftPrice, ...flags }) => {
  const originalPrice = Math.max(...Object.values(prices).map(highestNumber))
  const fallbackPrice = Math.max(99, Math.round((originalPrice * 0.84) / 10) * 10 - 1)
  const price = uniqraftPrice || fallbackPrice
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const image = productImage || categoryImages[category] || categoryImages.Lifestyle

  return {
    slug: slugify(name),
    name,
    category,
    image,
    brand,
    description: `${name} is selected for practical everyday use, dependable performance and a distinctive design. It is quality-checked by UniQraft before dispatch.`,
    specifications: {
      'In the box': `1 × ${name}`,
      Material: category === 'Fashion' ? 'Mixed premium materials' : 'Durable, quality-tested construction',
      Care: 'Wipe clean and store in a dry place',
      Warranty: '7-day replacement assurance',
    },
    price,
    originalPrice,
    competitorPrices: prices,
    discount,
    rating: flags.rating || Number((4.1 + ((name.length % 8) / 10)).toFixed(1)),
    reviews: flags.reviews || 18 + ((name.length * 13) % 240),
    badge: flags.badge || (discount >= 30 ? 'Great value' : flags.newArrival ? 'Just in' : 'Curated pick'),
    image,
    gallery: [image, ...galleryImages],
    stock: flags.stock || 7 + ((name.length * 7) % 34),
    featured: Boolean(flags.featured),
    bestSeller: Boolean(flags.bestSeller),
    newArrival: Boolean(flags.newArrival),
  }
}

// Price columns mirror the supplied sheet: Flipkart, Amazon, Meesho and JioMart.
// Rows with a missing UniQraft price use an editable 84%-of-MRP fallback.
const catalog = [
  { name: 'Mini Air Humidifier', category: 'Home', image: '/product/Air humidifier.png', prices: { Flipkart: 258, Amazon: 189, Meesho: 249, JioMart: 369 }, uniqraftPrice: 299, featured: true, bestSeller: true },
  { name: 'Kids Camera Toy', category: 'Kids', image: '/product/kids camera.png', prices: { Flipkart: 405, Amazon: 500, Meesho: 536, JioMart: 899 }, newArrival: true },
  { name: 'Scarlett Super Hand Mixer', category: 'Kitchen', image: '/product/Scarlett 7-Speed Electric Hand Mixer.png', brand: 'Scarlett', prices: { Flipkart: 498, Amazon: '434-553', Meesho: 534, JioMart: 498 }, uniqraftPrice: 459, featured: true },
  { name: 'Automatic Electric Fruit & Vegetable Peeler', category: 'Kitchen', image: '/product/Vegetable peeler.png',prices: { Flipkart: 739, Amazon: 999, Meesho: 805, JioMart: null }, uniqraftPrice: 789, newArrival: true },
  { name: 'Educational Talking Flash Card Reader', category: 'Kids', image: '/product/Card Reader.png', prices: { Flipkart: 364, Amazon: 498, Meesho: 342, JioMart: 299 }, uniqraftPrice: 349, bestSeller: true },
  { name: 'Portable Mini Camping Stove', category: 'Travel', image: '/product/Portable campaign cylinder.png', prices: { Flipkart: 179, Amazon: 399, Meesho: 250, JioMart: null }, uniqraftPrice: 450 },
  { name: 'Turbo Jet Fan', category: 'Smart Gadgets', image: '/product/Turbo jet fan.png', prices: { Flipkart: 1000, Amazon: '989-7999', Meesho: 891, JioMart: '399-600' }, uniqraftPrice: 850, featured: true, badge: 'Flash deal' },
  { name: '3-Axis Smartphone Gimbal Stabilizer', category: 'Smart Gadgets', image: '/GIMBLE.png', prices: { Flipkart: 3900, Amazon: 6499, Meesho: 2999, JioMart: 2999 }, uniqraftPrice: 3589, bestSeller: true },
  { name: 'Cruise Ship Fluid Drift Bottle', category: 'Home Decor', image: '/product/Unsinkable cruise ship.png', prices: { Flipkart: 250, Amazon: 299, Meesho: 140, JioMart: 250 }, uniqraftPrice: 359 },
  { name: 'Anti-Lost Wrist Link for Child Safety', category: 'Kids', image: '/product/Anti-loss child safety lock.png', prices: { Flipkart: 450, Amazon: 400, Meesho: 230, JioMart: 300 }, uniqraftPrice: 359 },
  { name: 'Rechargeable Silicone Unicorn LED Night Lamp', category: 'Kids', image: '', prices: { Flipkart: 300, Amazon: '450-600', Meesho: '170-290', JioMart: '350-550' }, uniqraftPrice: 359, featured: true },
  { name: 'Nova Professional Hair Dryer', category: 'Beauty', brand: 'Nova', image: '/product/Nova Hair Dryer.png', prices: { Flipkart: 440, Amazon: 450, Meesho: 415, JioMart: 420 }, uniqraftPrice: 389, bestSeller: true },
  { name: 'Rechargeable Electric Lighter', category: 'Lifestyle', image: '/product/Electric lighter.png', prices: { Flipkart: 190, Amazon: 250, Meesho: 170, JioMart: 230 }, uniqraftPrice: 150 },
  { name: 'Electric Hair Massager', category: 'Health', image: '/product/Electric hair massager.png', prices: { Flipkart: 600, Amazon: 650, Meesho: 380, JioMart: 700 }, uniqraftPrice: 489, featured: true },
  { name: 'Wooden Perpetual Desk Calendar', category: 'Office', image: '/product/Desk Calander.png', prices: { Flipkart: 250, Amazon: 299, Meesho: 180, JioMart: 250 }, uniqraftPrice: 459 },
  { name: 'G5 Retro Handheld Game', category: 'Electronics', image: '/product/G5 Retro Handheld Game.png', prices: { Flipkart: 570, Amazon: 550, Meesho: 530, JioMart: null }, uniqraftPrice: 750 },
  { name: 'Flying Fairy Hand Sensor Doll', category: 'Kids', image: '/product/Magical Hand Sensor Control Flying Fairy Doll.png', prices: { Flipkart: '615-648', Amazon: '279-499', Meesho: '418-492', JioMart: '400-492' }, uniqraftPrice: 429, newArrival: true },
  { name: 'Quick-Dry Rubber Bath Mat', category: 'Home', image: '/product/Quick-Dry Rubber Bath Mat.png', prices: { Flipkart: 155, Amazon: 139, Meesho: 121, JioMart: 249 }, uniqraftPrice: 359 },
  { name: 'Wooden Money Saving Box', category: 'Gifts', image: '/product/Wooden Saving Box.png', prices: { Flipkart: 136, Amazon: 284, Meesho: 73, JioMart: 299 }, uniqraftPrice: 219 },
  { name: 'Stainless Steel Electric Kettle', category: 'Kitchen', image: '/product/Stainless Steel Electric Kettle.png', prices: { Flipkart: 678, Amazon: 649, Meesho: 549, JioMart: 599 }, uniqraftPrice: 489, bestSeller: true },
  { name: '3D Crystal Ball LED Light Lamp', category: 'Home Decor', image: '/product/3D Crystal Ball LED Light Lamp.png', prices: { Flipkart: 133, Amazon: 175, Meesho: 153, JioMart: 259 }, uniqraftPrice: 200, featured: true },
  { name: 'Crystal Diamond LED Table Lamp', category: 'Home Decor', image: '/product/Wellfort Crystal Diamond LED Table Lamp.png', brand: 'Wellfort', prices: { Flipkart: 319, Amazon: 299, Meesho: 155, JioMart: 249 }, uniqraftPrice: 359 },
  { name: 'Waterproof Leak Repair Tape', category: 'Home', image: '', prices: { Flipkart: 150, Amazon: 125, Meesho: 90, JioMart: 130 }, uniqraftPrice: 189 },
  { name: 'Portable Mesh Nebulizer', category: 'Health', image: '', prices: { Flipkart: 450, Amazon: 899, Meesho: 175, JioMart: 550 }, uniqraftPrice: 350, bestSeller: true },
  { name: 'Vacuum Insulated Travel Tumbler', category: 'Travel', image: '/product/Tumbler.png', prices: { Flipkart: 399, Amazon: 449, Meesho: 486, JioMart: 525 }, uniqraftPrice: 550 },
  { name: 'Green Mussel Necklace', category: 'Accessories', image: '/product/Green Mussel neckless.png', prices: { Flipkart: 400, Amazon: 450, Meesho: null, JioMart: 450 }, uniqraftPrice: 350 },
  { name: 'Alarm Padlock', category: 'Travel', image: '/product/Alarm Padlock.png', prices: { Flipkart: 268, Amazon: 299, Meesho: 259, JioMart: 275 }, uniqraftPrice: 350 },
  { name: 'Triple Screen Wi-Fi Outdoor PTZ Camera', category: 'Smart Gadgets', image: '/product/Triple Screen Wi-Fi Outdoor PTZ Security Camera.png', prices: { Flipkart: 2550, Amazon: 2800, Meesho: 1900, JioMart: 2999 }, uniqraftPrice: 4500 },
  { name: 'Electric Egg Boiler', category: 'Kitchen', image: '/product/Electric egg Boiler.png', prices: { Flipkart: 290, Amazon: 420, Meesho: 240, JioMart: 299 }, uniqraftPrice: 450 },
  { name: 'Travel Jewelry Box with LED Mirror', category: 'Travel', image: '', prices: { Flipkart: 580, Amazon: 599, Meesho: 510, JioMart: 550 }, uniqraftPrice: 599, newArrival: true },
  { name: 'Ball Bluetooth Speaker', category: 'Electronics', image: '/product/Ball Bluetooth Speaker.png',  prices: { Flipkart: 299, Amazon: 349, Meesho: 240, JioMart: 299 }, uniqraftPrice: 269 },
  { name: 'Jewelry Organizer', category: 'Accessories', image: '/product/Jewelery Organizer.png', prices: { Flipkart: 250, Amazon: 299, Meesho: 180, JioMart: 249 }, uniqraftPrice: 219 },
  { name: 'Wireless Bluetooth Speaker Lamp', category: 'Electronics', image: '/product/Blutooth speaker.png', prices: { Flipkart: 650, Amazon: 799, Meesho: 499, JioMart: null }, uniqraftPrice: 689, featured: true },
  { name: 'Night Light Star Projector Lamp', category: 'Home Decor', image: '/product/Night Light Star Lamp', prices: { Flipkart: 653, Amazon: 670, Meesho: 559, JioMart: 765 }, newArrival: true },
  { name: 'Dancing Jellyfish Toy', category: 'Kids', image: '/product/Dancing Jelly Fish Toy.png', prices: { Flipkart: 612, Amazon: 665, Meesho: 566, JioMart: 799 }, uniqraftPrice: 499, bestSeller: true },
  { name: 'Magnetic Screwdriver Set', category: 'Home', image: '/product/Magnetic screwdriver set.png', prices: { Flipkart: 135, Amazon: 149, Meesho: 143, JioMart: 149 }, uniqraftPrice: 220 },
  { name: 'Mini Body-Worn Camera', category: 'Electronics', image: '/product/Mini Body Worn Camera.png', prices: { Flipkart: 1845, Amazon: 1699, Meesho: 1200, JioMart: null }, uniqraftPrice: 2452 },
  { name: 'Inflatable Air Sofa', category: 'Lifestyle', image: '/product/Air Sofa.png', prices: { Flipkart: 1199, Amazon: 1299, Meesho: 1046, JioMart: 1250 }, uniqraftPrice: 1399 },
  { name: 'Magic Practice Copybook for Kids', category: 'Kids', image: '/product/Sank Magic Pratice Copybook for Kids.png', prices: { Flipkart: 150, Amazon: 180, Meesho: 115, JioMart: 160 }, uniqraftPrice: 130 },
  { name: 'Air Humidifier', category: 'Home', image: '/product/', prices: { Flipkart: 499, Amazon: 599, Meesho: 350, JioMart: 499 }, uniqraftPrice: 400, bestSeller: true },
  { name: 'Dancing Cactus Talking Toy', category: 'Kids', image: '/product/Dancing Cactus Talking Toy.png', prices: { Flipkart: 240, Amazon: 270, Meesho: 256, JioMart: 399 }, uniqraftPrice: 359 },
  { name: 'Mobile Phone Cooling Fan', category: 'Smart Gadgets', image: '/product/Mobile Phone Cooling Fan.png', prices: { Flipkart: 260, Amazon: 350, Meesho: 180, JioMart: null }, uniqraftPrice: 650 },
  { name: 'Electric Water Bottle Pump Dispenser', category: 'Kitchen', image: '/product/Electric Water Bottele Pump Dispenser.png', prices: { Flipkart: 250, Amazon: 299, Meesho: 220, JioMart: 479 }, uniqraftPrice: 250 },
  { name: 'Multi-Functional Digital Wall & Table Clock', category: 'Home Decor', image: '/product/Multi Functional Digital Wall & Table Clock.png', prices: { Flipkart: 300, Amazon: 350, Meesho: 280, JioMart: 320 }, uniqraftPrice: 600 },
  { name: 'Vegetable Chopper and Slicer', category: 'Kitchen', image: '/product/Vegetable Chopper And Slicer.png', prices: { Flipkart: 450, Amazon: 399, Meesho: 370, JioMart: 420 }, uniqraftPrice: 489 },
  { name: 'Wall-Mount Mobile Charging Holder', category: 'Accessories', image: '/product/Wall Mount Mobile Charging Holder.png', prices: { Flipkart: 129, Amazon: 149, Meesho: 75, JioMart: 119 }, uniqraftPrice: 90 },
  { name: 'Solar-Powered Airplane Toy', category: 'Kids', image: '/product/Solar-Powered Airplane.png', prices: { Flipkart: 240, Amazon: 350, Meesho: 240, JioMart: 320 }, uniqraftPrice: 359 },
  { name: 'Portable Folding Washing Machine', category: 'Travel', image: '/product/Folding Washing Machine.png', prices: { Flipkart: 1100, Amazon: 1199, Meesho: 850, JioMart: 1148 }, uniqraftPrice: 800, featured: true },
  { name: 'Glass Oil Dispenser', category: 'Kitchen', image: '/product/Oil Dispenser.png', prices: { Flipkart: 140, Amazon: 229, Meesho: 229, JioMart: 249 }, uniqraftPrice: 180 },
  { name: 'Bulb-Shaped Cool Mist Humidifier', category: 'Home', image: '/product/Bulb-Shaped Cool Mist Air Humidifier.png', prices: { Flipkart: 330, Amazon: 299, Meesho: 230, JioMart: 299 }, uniqraftPrice: 389 },
  { name: 'LED Ring Light', category: 'Electronics', image: '/product/LED Ring Light.png', prices: { Flipkart: 750, Amazon: 499, Meesho: 299, JioMart: 450 }, uniqraftPrice: 1459 },
  { name: 'Drive Socket Wrench & Bit Set', category: 'Home', image: '/product/Drive Socket Wrench & Bit Set.png', prices: { Flipkart: 399, Amazon: 450, Meesho: 330, JioMart: 449 } },
  { name: 'Smart Android Portable Mini Projector', category: 'Smart Gadgets', image: '/product/Smart Android Portable Mini Projector.png', prices: { Flipkart: 2960, Amazon: 3499, Meesho: 2500, JioMart: null }, featured: true },
  { name: 'Silicone Gel Socks', category: 'Health', image: '/product/Silicone Gel Socks.png', prices: { Flipkart: 153, Amazon: 249, Meesho: 129, JioMart: 261 } },
  { name: 'Stainless Steel Wire Clothesline Rope', category: 'Home', image: '/product/Stainless Steel Wire Clothesline Rope.png', prices: { Flipkart: 249, Amazon: 249, Meesho: 180, JioMart: 260 } },
  { name: 'Digital Camera for Kids and Teens', category: 'Kids', image: '/product/.png', prices: { Flipkart: 2500, Amazon: 2800, Meesho: 1200, JioMart: 2400 }, uniqraftPrice: 442, badge: 'Limited stock' },
  { name: 'Football-Shaped Smart Portable Projector', category: 'Smart Gadgets', image: '/product/Football Shaped Smart Portable Projector.png', prices: { Flipkart: 5759, Amazon: 3950, Meesho: 3800, JioMart: null }, newArrival: true },
  { name: 'Kids Instant Print Camera', category: 'Kids', image: '/product/kids camera.png', prices: { Flipkart: 1000, Amazon: 1200, Meesho: 1221, JioMart: 1199 }, newArrival: true },
  { name: 'Interactive Study Book for Kids', category: 'Kids', image: '/product/Study Book for Kids.png', prices: { Flipkart: 350, Amazon: 399, Meesho: 260, JioMart: 250 } },
  { name: 'Bluetooth Smart Audio Glasses', category: 'Smart Gadgets', image: '/product/Bluetooth Smart Audio Glasses.png', prices: { Flipkart: 680, Amazon: 749, Meesho: 599, JioMart: 699 }, newArrival: true },
  { name: 'All-Weather Raincoat', category: 'Fashion', image: '/product/Raincoat.png', prices: { Flipkart: 179, Amazon: 249, Meesho: 170, JioMart: 249 } },
  { name: 'Skeleton Wall Clock', category: 'Home Decor', image: '/product/Skeleton Wall Clock.png', prices: { Flipkart: 2800, Amazon: 4500, Meesho: 3000, JioMart: 3500 }, newArrival: true },
  { name: 'Women’s Multi-Pocket Shoulder Handbag', category: 'Fashion', image: '/product/Women Multi- Pocket Shoulder Handbag.png', prices: { Flipkart: 299, Amazon: 349, Meesho: 250, JioMart: 299 } },
  { name: 'Solar-Powered Meditating Monk Dashboard Décor', category: 'Gifts', image: '/product/Monk.png', prices: { Flipkart: 220, Amazon: 240, Meesho: 160, JioMart: 220 } },
  { name: 'Premium Windproof Umbrella', category: 'Travel', image: '/product/Umbrella.png', prices: { Flipkart: 1500, Amazon: 1800, Meesho: 350, JioMart: 600 } },
  { name: 'Hand-Shaped 4D Bionic Electric Massager', category: 'Health', image: '/product/Hand-Shaped 4D Bionic Electric Massager.png', prices: { Flipkart: 1600, Amazon: 2396, Meesho: 1505, JioMart: 1750 }, featured: true },
  { name: 'Lighthouse Moon Projector Lamp', category: 'Home Decor', image: '/product/Lightouse Moon Projector Lamp.png', prices: { Flipkart: 1350, Amazon: 1299, Meesho: 999, JioMart: 1300 }, newArrival: true },
  { name: 'Flying Orb Ball Toy', category: 'Kids', image: '/product/Flying Orb Ball Toy.png', prices: { Flipkart: 390, Amazon: 450, Meesho: 430, JioMart: 550 }, uniqraftPrice: 389, bestSeller: true },
  { name: 'OnePlus Nord Watch', category: 'Smart Gadgets', image: '/product/one Plus Nord Watch.png', brand: 'OnePlus', prices: { Flipkart: 4999, Amazon: 4999, Meesho: null, JioMart: null }, uniqraftPrice: 1499, badge: 'Best price', bestSeller: true },
  { name: 'M15 Retro Game Console', category: 'Electronics', image: '/product/M15 Retro Game.png', prices: { Flipkart: 7990, Amazon: 6149, Meesho: null, JioMart: 7490 }, uniqraftPrice: 1600, badge: 'Mega deal', featured: true },
  { name: 'Adjustable Laptop Stand', category: 'Office', image: '/product/Laptop Stand.png', prices: { Flipkart: 250, Amazon: 299, Meesho: 210, JioMart: 350 }, uniqraftPrice: 310, bestSeller: true },
]

export const products = catalog.map(createProduct)
export const productBySlug = (slug) => products.find((product) => product.slug === slug)
