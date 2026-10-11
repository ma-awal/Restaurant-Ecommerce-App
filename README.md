# Flame and Grill Smokehouse - Next.js + Tailwind CSS

Full website built from the design mockup. Content lives in JSON files, animations are smooth scroll-reveal, layout is fully responsive.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build: `npm run build` then `npm start`.

Requirements: Node.js 18.17 or newer. Internet is needed the first time (npm packages and Google Fonts).

## Pages

| URL | What it is |
| --- | --- |
| `/` | Home: hero, features, menu highlights, how it works, about, location and hours |
| `/menu` | Full menu with category tabs and search (`/menu?category=burgers` also works) |
| `/about` | Story and values |
| `/contact` | Contact details and working form |
| `/checkout` | Pickup / delivery checkout (cash payment) |
| `/privacy`, `/terms` | Legal pages |

Working features: cart drawer (saved in the browser), add to cart toast, menu search overlay, delivery postcode checker, order and contact forms, today's opening hours highlighted.

## Folder structure

```
src/
  app/                 Routes (pages), layout, global CSS, API routes
    api/orders         Receives checkout orders
    api/contact        Receives contact messages
  components/
    ui/                Reusable pieces: Button, Container, Icon, Reveal, SectionHeading, PageHeader
    layout/            Header, Footer, SearchOverlay, LegalPage
    sections/          Home page sections (Hero, FeatureStrip, MenuHighlights, ...)
    menu/              MenuCard, MenuBrowser
    cart/              CartDrawer, Toast, AddToCartButton
    checkout/          CheckoutForm
    contact/           ContactForm
  context/CartContext  Cart state (add, remove, quantity, order mode)
  data/                ALL TEXT CONTENT as JSON
  lib/                 Small helpers (menu lookup, price format)
public/images/         All photos and logos
```

## Editing content (no code needed)

| What | File |
| --- | --- |
| Name, phone, email, address, opening hours, social links, delivery postcodes and fee, header and footer links | `src/data/site.json` |
| Hero text, feature strip, how-it-works steps, about text, location section | `src/data/home.json` |
| Menu categories and dishes (name, description, price, image, show on home) | `src/data/menu.json` |
| About page story | `src/data/about.json` |
| Privacy and terms text | `src/data/legal.json` |

### Add a new dish

Add an object to `items` in `src/data/menu.json`:

```json
{
  "id": "beef-short-rib",
  "name": "Beef Short Rib",
  "description": "Slow smoked for 12 hours",
  "price": 22,
  "category": "smoked-meats",
  "image": "/images/beef-short-rib.jpg",
  "highlight": false
}
```

Put the photo in `public/images/`. Set `"highlight": true` to show it in Menu Highlights on the home page. Use `"image": null` to show a placeholder.

### Change colours and fonts

- Colours: `tailwind.config.js` (`brand` is the orange, `ink` are the dark shades)
- Fonts: `src/app/layout.jsx`

### Scroll animations

Wrap anything in `<Reveal variant="up" delay={100}>`. Variants: `up`, `down`, `left`, `right`, `zoom`, `fade`. Animations switch off automatically for visitors who prefer reduced motion.

## Notes

- The photos were cut from the mockup image, so they are lower resolution. Replace the files in `public/images/` with original high-quality photos using the same file names and nothing else needs to change.
- Dishes without a photo, sample prices for extra dishes, delivery postcodes and delivery fee are sample data. Edit them in the JSON files.
- Orders and contact messages are currently printed in the terminal (server log) by `src/app/api/orders/route.js` and `src/app/api/contact/route.js`. Connect an email service or database there when you go live.
- Social links in `site.json` point to the main sites. Replace with the real profile URLs.
- Privacy and terms text is a simple placeholder. Have it reviewed before launch.
