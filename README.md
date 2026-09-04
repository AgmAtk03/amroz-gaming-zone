# Amroz Gaming Zone

Gaming **service** demo for Kathmandu — instant digital top-ups and same-day physical gear from **Pepsicola, Ward 32**. Not a booth-booking venue.

## Live demo (SHA-pinned githack)

Branch CDNs go stale. Open the **`live-demo` commit SHA**, not the branch name.

**Current export:** `7f429f03b7acabfda736cbb512150cb511cc4af7`

- Home: https://raw.githack.com/AgmAtk03/amroz-gaming-zone/7f429f03b7acabfda736cbb512150cb511cc4af7/index.html
- Shop: https://raw.githack.com/AgmAtk03/amroz-gaming-zone/7f429f03b7acabfda736cbb512150cb511cc4af7/shop/index.html
- Pay: https://raw.githack.com/AgmAtk03/amroz-gaming-zone/7f429f03b7acabfda736cbb512150cb511cc4af7/pay/index.html
- Success: https://raw.githack.com/AgmAtk03/amroz-gaming-zone/7f429f03b7acabfda736cbb512150cb511cc4af7/pay/success/index.html

- **GitHub Pages** (after Pages is enabled on `main`): https://agmatk03.github.io/amroz-gaming-zone/
- **Vercel production:** https://amroz-ward32-dristi-astra.vercel.app/

## Stack

- Next.js App Router (static export for githack / Pages)
- Tailwind CSS
- Client-only DEMO checkout (mock Khalti / eSewa) and desk chat

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Rebuild the public static tree with `npm run export:githack`, then publish the `out/` folder to the `live-demo` branch. Assets are rewritten to **relative** paths so a SHA-pinned githack URL loads CSS/JS from the same commit.
