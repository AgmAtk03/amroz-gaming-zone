# Amroz Gaming Zone

Kathmandu **marketplace** demo — instant digital top-ups and same-day physical gear from **Pepsicola, Ward 32**. Not a booth-booking venue.

## Live demo (SHA-pinned githack)

Branch CDNs go stale. Open the **`live-demo` commit SHA**, not the branch name.

**Current export:** `0899d9e791e3502f14e4de5bec618b25bbd10c16`  
Assets (`_next`) pin to `00a42d38ef1b3c72ceb2e4491e53ad97bc34f038`.

Use **rawcdn** (production). `raw.githack.com` may show a one-time “Open the page” interstitial.

- Home: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/0899d9e791e3502f14e4de5bec618b25bbd10c16/index.html
- Shop: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/0899d9e791e3502f14e4de5bec618b25bbd10c16/shop/index.html
- Pay: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/0899d9e791e3502f14e4de5bec618b25bbd10c16/pay/index.html
- Success: https://rawcdn.githack.com/AgmAtk03/amroz-gaming-zone/0899d9e791e3502f14e4de5bec618b25bbd10c16/pay/success/index.html

Same SHA on `raw.githack.com` (replace the host).

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

- Next.js App Router (static export for githack / Pages)
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
