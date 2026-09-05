# Amroz Gaming Zone

Kathmandu **marketplace** demo — instant digital top-ups and same-day physical gear from **Pepsicola, Ward 32**. Not a booth-booking venue.

## Live demo (SHA-pinned githack)

Branch CDNs go stale. Open **one** `live-demo` commit SHA. HTML, CSS, `_next` media, and `amroz-client.js` all live in that same tree — no second assets commit.

Rebuild with `npm run export:githack` (relative `./_next` + a client-only React boot). Do **not** pin HTML at SHA B to `_next` at SHA A. A commit cannot contain its own hash, so absolute CDN `assetPrefix` always desyncs.

**Current export:** see the latest `live-demo` commit after publish.

Use **rawcdn** (production). `raw.githack.com` may show a one-time “Open the page” interstitial.

## Saved IDs + one-tap reorder (v1)

- Save up to **5** player/game IDs per hub, each with a short label (`main`, `smurf`).
- Persist on this device (`localStorage`). Account sync is later.
- Checkout: hub → **UID first** (last-used default) → pack → confirm (hub + **masked** ID + price) → mock pay. Reorder still skips to confirm.
- No saved ID: enter once, **Save for next time?** defaults yes.
- Home **Buy again** shows the last 3 digital orders. One tap to confirm, one tap to pay.
- Order history and WhatsApp shares use a masked ID. Full UID never goes in a share URL.
- Edit / delete saved IDs on the checkout ID step — no page leave.
- Member price still applies on reorder.

## Stack

- Next.js App Router (Vercel / local `next dev`)
- Static githack export: Tailwind CSS from Next + **client-only** `amroz-client.js` (no RSC hydration)
- Tailwind CSS
- Client-only DEMO checkout (mock Khalti / eSewa) — unique **txn + order ID**
- Photography: Pexels (licensed) + generated product-style stills. No official game logos.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Rebuild the public static tree with `npm run export:githack`, then publish the `out/` folder to the `live-demo` branch.
