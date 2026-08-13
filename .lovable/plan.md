# LUMÉRA — Luxury Fashion E‑Commerce (Front‑End)

A complete, premium fashion storefront built in one pass: editorial visual language, real working commerce logic (cart, wishlist, search, filters, checkout), and full responsiveness.

## Brand & Design System

- Palette: ivory `#FAF8F4`, ink black, soft beige, warm taupe, subtle gray — defined as OKLCH semantic tokens in `src/styles.css` (no hardcoded colors in components).
- Typography: an elegant high-contrast serif for headings (editorial display) paired with a clean geometric sans for body/UI, loaded via `<link>` in the root route.
- Motion: fade/rise on scroll-into-view, image hover zoom, quiet button and card transitions, animated drawers and modals. Restrained, luxury-paced.
- Layout language: generous whitespace, hairline borders, wide editorial imagery, uppercase letterspaced labels, sticky slim navigation.

## Pages (all real routes, no dead ends)

| Route | Content |
|---|---|
| `/` | Announcement bar, hero, New Arrivals, Featured Collection, Best Sellers, Seasonal edit, promo banner, brand story, testimonials, social gallery, newsletter, footer |
| `/shop` | Full catalog with category nav, search, filters (category, size, color, price), sorting, product grid |
| `/new-arrivals` | Editorial banner + newest products with filters and sorting |
| `/collections` | Five fictional collections with editorial imagery; Explore links into filtered shop |
| `/collections/$slug` | Collection hero + its products |
| `/product/$id` | Gallery with thumbnails, options, quantity, add to cart / buy now / wishlist, info accordion, related + recently viewed |
| `/cart` | Line items, quantity controls, remove, totals, continue shopping, checkout |
| `/checkout` | Validated customer form, shipping + payment UI, order summary, place order |
| `/order-confirmation` | Order number, summary, continue shopping |
| `/wishlist` | Saved items, remove, move to cart, empty state |
| `/account` | Profile, orders, wishlist, addresses, settings, simulated sign in/out |
| `/about` | Story, philosophy, design approach, sustainability, craftsmanship, values, CTA |
| `/contact` | Contact details, validated form with success state, FAQ accordion |
| `/faq`, `/shipping-returns`, `/privacy`, `/terms` | Real content pages so every footer link resolves |

## Functionality

- **Cart & wishlist**: React context + `localStorage` persistence; badge counts update everywhere; toast notifications on add/remove.
- **Search**: full-screen overlay from the search icon, live matching on name, category, and keywords, with a designed empty state.
- **Filters & sorting**: client-side, combinable, reflected in URL search params so filtered collection links work.
- **Product options**: size/color selection required before add-to-cart; quantity stepper; quick-view modal from any card.
- **Recently viewed**: tracked in localStorage, shown on product pages.
- **Forms**: checkout and contact validated with clear inline errors and accessible labels.
- **Mobile**: hamburger drawer nav, responsive grids, tap-friendly targets, no horizontal overflow.

## Product Data

~28 fictional products (Noir Satin Dress, Élan Tailored Blazer, Atelier Wide-Leg Trousers, Muse Structured Bag, Lumière Silk Scarf, etc.) across Dresses, Tops, Bottoms, Outerwear, Accessories, with id, description, price, sale price, sizes, colors, rating, collection tags, and multiple images. Imagery generated as editorial fashion photography assets.

## Technical Notes

- TanStack Start file routes under `src/routes/`, `<Link>` for all navigation, per-route `head()` metadata (unique title/description/og).
- Shared UI in `src/components/` (ProductCard, QuickView, FilterPanel, CartDrawer, Accordion, SectionReveal), data in `src/data/products.ts`, state in `src/context/`.
- shadcn primitives + sonner toasts, semantic tokens only, no backend — everything front-end with localStorage.
- Final pass: click through every route, link, filter, and form; verify no 404s, no console errors, no overflow on mobile.
