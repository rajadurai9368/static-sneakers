# STATIC — Sneaker Brand Landing Page

A streetwear sneaker brand landing page for **STATIC**. Soft, muted-street aesthetic
with a sticky nav, video hero, product lineup, add-to-bag cart drawer, lookbook,
drop feature, manifesto, and newsletter signup.

Built as plain **HTML / CSS / vanilla JavaScript** and bundled with
[Vite](https://vitejs.dev/) — no framework, no runtime dependencies.

## Tech stack

- HTML5 + CSS3 (custom properties, grid/flex, responsive, reduced-motion aware)
- Vanilla JavaScript, split into small ES modules
- Vite for the dev server and production build
- Google Fonts: Bricolage Grotesque (display) + Hanken Grotesk (body)

## Project structure

```
.
├── index.html            # Page markup (Vite entry point)
├── public/
│   └── assets/           # Static assets served as-is (images, video, logo)
├── src/
│   ├── main.js           # App entry — imports styles + wires up modules
│   ├── styles.css        # All styles (design tokens in :root)
│   └── js/
│       ├── imageFallback.js  # Hide broken images gracefully
│       ├── footerYear.js     # Current year in footer
│       ├── mobileMenu.js      # Mobile menu toggle
│       ├── scrollReveal.js    # Reveal-on-scroll (IntersectionObserver)
│       ├── filterChips.js     # Product filter chips
│       ├── toast.js           # Toast feedback helper
│       ├── cart.js            # Cart state + slide-out drawer
│       └── newsletter.js      # Newsletter signup validation
├── package.json
├── vite.config.js
└── .gitignore
```

## Getting started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

## Editing

- **Colors, spacing, fonts** — edit the design tokens in the `:root` block at the
  top of `src/styles.css`.
- **Products** — duplicate a `<li class="card">` in `index.html`; the `data-name`,
  `data-price`, and `data-img` attributes on the Add-To-Bag button feed the cart.
- **Assets** — drop replacements into `public/assets/` keeping the same file names,
  or update the paths in `index.html`.

## Deployment

Any static host works (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Run
`npm run build` and deploy the generated `dist/` folder. The Vite `base` is set to
`./` so the build works from a subpath (e.g. GitHub Pages project sites).

## License

Demo project — brand name and copy are fictional.
