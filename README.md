# Amroz Gaming Zone

Kathmandu shop — **Instant Delivery** (header only) top-ups and **2 hour** gaming gear from **Pepsicola, Ward 32**.

## Live shop (SHA-pinned githack)

Branch CDNs go stale. Open **one** `live-demo` commit SHA. HTML, CSS, `_next` media, and `amroz-client.js` all live in that same tree — no second assets commit.

**Current export:** `d3fb363ec90ef497e3d383a7b33a1a7199df0b14`

Use **rawcdn** (production). `raw.githack.com` may show a one-time “Open the page” interstitial.

- Home: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/index.html
- Shop: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/shop/index.html
- Top-ups category: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/shop/index.html?cat=topups
- Pay: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/pay/index.html
- Free Fire: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/pay/index.html?hub=freefire
- Steam (login fields): https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/pay/index.html?hub=steam
- Success: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/d3fb363ec90ef497e3d383a7b33a1a7199df0b14/pay/success/index.html

Same SHA on `raw.githack.com` (replace the host).

## Shop

- Header: logo, Instant Delivery pill, search, category chips, cart — light sweep animation
- Hero carousel (2.5s Swiper-style autoplay, Amroz art only): **Pre-order GTA 6 now with Amroz Gaming**, PS5, top-ups, gear
- Catalog IA: Categories → one card per game family. Regions/packs only after tap-in. Source `data/gaming-com-np-amroz-catalog.md` → `data/catalog.json` + Amroz gear
- Checkout: UID / Riot ID / Online ID as needed. Steam & PS Store also ask account password (not saved). Mobile games stay UID-only
- Saved IDs, Buy again, member price still apply
- Gear copy is 2 hour delivery; stock chips stay
- Wallet buttons are client-only (no live API keys). Customer UI does not label them mock or demo.

## Stack

- Next.js App Router (Vercel / local `next dev`)
- Static githack export: Tailwind CSS from Next + **client-only** `amroz-client.js` (no RSC hydration)
- Photography: Pexels (licensed) + generated product-style stills. No official game logos.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Rebuild the public static tree with `npm run export:githack`, then publish the `out/` folder to the `live-demo` branch.
