# UniQraft Project Guide

## Architecture

This is a client-rendered React + Vite ecommerce storefront. `src/App.jsx` owns route registration and `src/components/Layout.jsx` provides the persistent header, footer, page transitions, floating controls, metadata updates, and toast layer.

## Key directories

- `src/pages/`: Route-level screens for home, catalog, product details, cart, checkout, account, contact, policies, comparison, and errors.
- `src/components/`: Shared presentation and interaction components.
- `src/context/StoreContext.jsx`: Cart, wishlist, comparison, recently viewed, theme, and toast actions.
- `src/data/products.js`: Single source of truth for all product data and pricing calculations.
- `src/data/siteConfig.js`: Editable contact, social, WhatsApp, shipping, and tax settings.
- `src/data/categories.js`: Category labels, icons, and visual tones.
- `public/__forms.html`: Static Netlify Forms declarations. Keep fields synchronized with React forms.
- `reference/`: Original source documents supplied for the catalog.

## Conventions

- Keep source human-readable and avoid generated or minified files.
- Add products only through the `catalog` array in `src/data/products.js`.
- Keep shared business settings in `src/data/siteConfig.js`; do not duplicate contact values in components.
- Use `formatCurrency` and `slugify` from `src/utils/format.js`.
- Reuse `ProductCard`, `ProductRail`, `SectionHeading`, and `Rating` before creating variants.
- Preserve mobile-first behavior and accessible labels for icon-only controls.
- Use transform and opacity for motion; respect the reduced-motion rule in `src/index.css`.

## Non-obvious decisions

The source workbook contains some blank UniQraft prices and some selling prices above competitor MRP. Blank selling prices use an explicit 84%-of-MRP fallback in `createProduct`; sourced prices are otherwise preserved. Discounts never display below zero.

Orders, contact messages, and newsletter subscriptions use Netlify Forms. Cart, wishlist, comparison, recently viewed items, and theme preference intentionally use local storage as requested and do not require an account.

Product photography uses category-matched royalty-free remote images so the source remains lightweight. Replace a product’s `image` and `gallery` values when exact photography becomes available.
