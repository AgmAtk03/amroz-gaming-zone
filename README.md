# Amroz Gaming Zone

Marketing demo site for **Amroz Gaming Zone** — a PlayStation club at Pepsicola / football ground, Kathmandu.

## Live demo

- **Public HTTPS (no login):** https://raw.githack.com/AgmAtk03/amroz-gaming-zone/live-demo/index.html
- **Shop:** https://raw.githack.com/AgmAtk03/amroz-gaming-zone/live-demo/shop/index.html
- **Vercel production:** https://amroz-ward32-dristi-astra.vercel.app/
- **GitHub Pages** (after enabling Pages): https://agmatk03.github.io/amroz-gaming-zone/

Prefer **SHA-pinned** githack URLs (branch CDN can go stale):

`https://raw.githack.com/AgmAtk03/amroz-gaming-zone/<SHA>/index.html`

## Screens

- Home — hero, play, shop, Amroz Members, booth passes, events, photos, FAQ, reviews, booking, visit
- Shop — 5 Fantech SKUs + 7 digital hubs + Members DEMO card
- Hubs — `/shop/freefire` `/shop/pubg` `/shop/mlbb` `/shop/valorant` `/shop/roblox` `/shop/psn` `/shop/steam`
- DEMO pay — `/pay?sku=…` (Player ID when needed → mock Khalti / eSewa)
- DEMO success — `/pay/done`
- WhatsApp Confirm on gear, hubs, and checkout

Digital codes / top-ups: **Same-day · within 2 hours** (Kathmandu).  
Fantech: **Same-day delivery or pickup at Pepsicola / football ground** — not a 2-hour claim on gear.

Checkout is owner-pitch mock only — large DEMO banner, sample NPR, no live payment keys.

## Local

```bash
npm install
npm run dev
```

Rebuild the public CDN branch with `npm run export:githack`, then publish `out/` to `live-demo`.
