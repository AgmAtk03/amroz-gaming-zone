# Amroz Gaming Zone

Kathmandu shop — **Instant Delivery** top-ups and same-day gaming gear from **Pepsicola, Ward 32**.

## Live shop (SHA-pinned githack)

Branch CDNs go stale. Open **one** `live-demo` commit SHA. HTML, CSS, `_next` media, and `amroz-client.js` all live in that same tree — no second assets commit.

**Current export:** `cae6a1c3ec20773b4c864db5ce908ee2c5dea956`

Use **rawcdn** (production). `raw.githack.com` may show a one-time “Open the page” interstitial.

- Home: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/cae6a1c3ec20773b4c864db5ce908ee2c5dea956/index.html
- Shop: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/cae6a1c3ec20773b4c864db5ce908ee2c5dea956/shop/index.html
- Pay: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/cae6a1c3ec20773b4c864db5ce908ee2c5dea956/pay/index.html
- Free Fire: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/cae6a1c3ec20773b4c864db5ce908ee2c5dea956/pay/index.html?hub=freefire
- Success: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/cae6a1c3ec20773b4c864db5ce908ee2c5dea956/pay/success/index.html

Same SHA on `raw.githack.com` (replace the host).

## Shop

- Header: logo, search, game chips, cart, Instant Delivery
- Home leads with Instant Delivery, then a 7-game top-up grid (Free Fire, PUBG, MLBB, Valorant, Roblox, PS Store, Steam)
- Physical gear sits below
- Checkout: hub → UID first (last-used default) → pack → confirm → Pay with Khalti / eSewa
- Saved IDs, Buy again, member price still apply
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
