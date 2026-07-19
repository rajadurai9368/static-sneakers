# STATIC — Streetwear Sneaker Website

A static, multi-page marketing site. No build step, no dependencies — pure HTML, CSS and vanilla JS. Ready for GitHub Pages or any static host.

## Structure
```
index.html         Landing (hero, lineup, lookbook, cart)
about.html         Manifesto + brand timeline
team.html          The studio
projects.html      The Drops (releases)
contact.html       Contact form + info
robots.txt · sitemap.xml · favicon.ico · favicon.svg
/css   style.css, responsive.css
/js    main.js
/assets  images + video
/images  (drop extra imagery here)
/fonts   (optional self-hosted fonts)
```

## Deploy on GitHub Pages
1. Create a repo and upload these files (keep the folder structure).
2. Repo **Settings → Pages → Source: Deploy from branch**, pick `main` / root.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Before going live
- Replace `static-worldwide.example.com` in `sitemap.xml`, `robots.txt`, and the `<link rel="canonical">` / Open Graph tags with your real domain.
- Fonts load from the Google Fonts CDN. To remove that dependency, add self-hosted font files to `/fonts` and update the `@font-face` / `<link>` references.
- The cart, newsletter and contact form are front-end demos (no server) — wire them to your backend/checkout when ready.
