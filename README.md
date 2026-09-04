# Amroz Gaming Zone

Gaming **service** demo for Kathmandu — instant digital top-ups and same-day physical gear from **Pepsicola, Ward 32**. Not a booth-booking venue.

## Live demo (SHA-pinned githack)

Branch CDNs go stale. Use the **commit SHA** on `live-demo`, not the branch name.

After each export, the latest SHA and URLs are noted in the pull request. Pattern:

```
https://raw.githack.com/AgmAtk03/amroz-gaming-zone/<LIVE_DEMO_SHA>/index.html
https://raw.githack.com/AgmAtk03/amroz-gaming-zone/<LIVE_DEMO_SHA>/shop/index.html
https://raw.githack.com/AgmAtk03/amroz-gaming-zone/<LIVE_DEMO_SHA>/pay/index.html
https://raw.githack.com/AgmAtk03/amroz-gaming-zone/<LIVE_DEMO_SHA>/pay/success/index.html
```

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
