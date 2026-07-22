# UniQraft — Unique Products

A premium, mobile-first ecommerce storefront for UniQraft, built as editable React source and configured for Netlify deployment.

## Technology

- React and Vite
- Tailwind CSS with a custom responsive design system
- React Router for storefront pages
- Framer Motion for page and product interactions
- Lucide React icons
- Netlify Forms for contact, newsletter, and order submissions
- Browser local storage for cart, wishlist, comparison, theme, and recently viewed products

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build`. Netlify uses the configuration in `netlify.toml` and publishes the `dist` directory.

## Edit products

All catalog data lives in `src/data/products.js`. Add, remove, or edit one object in the `catalog` array. Every exported product is automatically given a slug, description, specifications, rating, reviews, gallery, stock metadata, and a calculated discount.

Competitor prices are stored in each product’s `prices` object. The highest available competitor value becomes the original price. `uniqraftPrice` becomes the selling price. When the supplied workbook did not contain a UniQraft price, the source uses a clearly documented editable fallback based on 84% of MRP.

The original workbook is preserved in `reference/Product Price On E-commerce Platform.xlsx`.

## Edit store settings

Update `src/data/siteConfig.js` for the WhatsApp number, phone, email, social links, business hours, shipping threshold, and GST rate. Replace the editable WhatsApp and Facebook placeholders before launch.

Update category names and icons in `src/data/categories.js`. The supplied logo is stored at `src/assets/uniqraft-logo.png`.

## Netlify Forms

The contact, newsletter, and order forms submit through Netlify Forms. Their build-time form declarations live in `public/__forms.html`. The Netlify Forms feature marker is already enabled in `.netlify/features/netlify-forms`.

## SEO

Base metadata and social cards are in `index.html`. Route titles and canonical URLs are updated by `src/components/Layout.jsx`. Product pages add Schema.org product markup. Crawling files live in `public/robots.txt` and `public/sitemap.xml`.
