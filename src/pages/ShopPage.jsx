import { useMemo, useState } from 'react'
import { ArrowRightLeft, Search, SlidersHorizontal, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { useStore } from '../context/StoreContext'
import { formatCurrency } from '../utils/format'

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { compare, toggleCompare } = useStore()
  const query = params.get('q') || ''
  const category = params.get('category') || ''
  const brand = params.get('brand') || ''
  const sort = params.get('sort') || 'featured'
  const rating = Number(params.get('rating') || 0)
  const maxPrice = Number(params.get('maxPrice') || 8000)
  const special = params.get('filter') || ''
  const brands = [...new Set(products.map((product) => product.brand))]

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    setParams(next)
  }

  const results = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = !query || `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(query.toLowerCase())
      const matchesSpecial = !special || product[special]
      return matchesQuery && (!category || product.category === category) && (!brand || product.brand === brand) && product.rating >= rating && product.price <= maxPrice && matchesSpecial
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'priceLow') return a.price - b.price
      if (sort === 'priceHigh') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'newest') return Number(b.newArrival) - Number(a.newArrival)
      if (sort === 'popular') return b.reviews - a.reviews
      if (sort === 'bestSeller') return Number(b.bestSeller) - Number(a.bestSeller)
      return Number(b.featured) - Number(a.featured)
    })
  }, [query, category, brand, sort, rating, maxPrice, special])

  const filters = <aside className={`shop-filters ${filtersOpen ? 'open' : ''}`}><div className="filter-title"><strong>Filters</strong><button onClick={() => setFiltersOpen(false)}><X /></button></div><label>Search<div className="filter-input"><Search /><input value={query} onChange={(event) => update('q', event.target.value)} placeholder="Search products" /></div></label><label>Category<select value={category} onChange={(event) => update('category', event.target.value)}><option value="">All categories</option>{categories.map(({ name }) => <option key={name}>{name}</option>)}</select></label><label>Brand<select value={brand} onChange={(event) => update('brand', event.target.value)}><option value="">All brands</option>{brands.map((name) => <option key={name}>{name}</option>)}</select></label><label>Price up to <strong>{formatCurrency(maxPrice)}</strong><input type="range" min="200" max="8000" step="100" value={maxPrice} onChange={(event) => update('maxPrice', event.target.value)} /></label><label>Minimum rating<select value={rating} onChange={(event) => update('rating', event.target.value)}><option value="0">All ratings</option><option value="4">4 stars & up</option><option value="4.5">4.5 stars & up</option></select></label><div className="quick-filters"><button className={special === 'featured' ? 'active' : ''} onClick={() => update('filter', special === 'featured' ? '' : 'featured')}>Featured</button><button className={special === 'bestSeller' ? 'active' : ''} onClick={() => update('filter', special === 'bestSeller' ? '' : 'bestSeller')}>Best sellers</button><button className={special === 'newArrival' ? 'active' : ''} onClick={() => update('filter', special === 'newArrival' ? '' : 'newArrival')}>New arrivals</button></div><button className="clear-button" onClick={() => setParams({})}>Clear all filters</button></aside>

  return (
    <div className="page-shell shop-page">
      <div className="page-intro"><span className="eyebrow">The complete edit</span><h1>Shop unique products</h1><p>Explore every practical, clever and conversation-starting find in the UniQraft collection.</p></div>
      <div className="shop-toolbar"><span><strong>{results.length}</strong> products found</span><button className="filter-toggle" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /> Filters</button><select value={sort} onChange={(event) => update('sort', event.target.value)}><option value="featured">Featured</option><option value="popular">Popularity</option><option value="bestSeller">Best sellers</option><option value="priceLow">Price: Low to high</option><option value="priceHigh">Price: High to low</option><option value="rating">Highest rated</option><option value="newest">Newest first</option></select></div>
      <div className="shop-layout">{filters}<div>{results.length ? <div className="product-grid shop-products">{results.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="empty-state"><Search /><h2>No uncommon finds yet</h2><p>Try removing a filter or searching for something broader.</p><button className="primary-button" onClick={() => setParams({})}>Reset filters</button></div>}</div></div>
      {compare.length > 0 && <div className="compare-tray"><span><ArrowRightLeft /><strong>Compare products</strong><small>{compare.length}/3 selected</small><Link to="/compare">Compare now</Link></span><div>{compare.map((product) => <button key={product.slug} onClick={() => toggleCompare(product)}><img src={product.image} alt="" /><span>{product.name}</span><X /></button>)}</div></div>}
    </div>
  )
}
