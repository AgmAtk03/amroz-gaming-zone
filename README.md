# Amroz Gaming Zone

Marketing demo site for **Amroz Gaming Zone** — a Kathmandu Ward 32 PlayStation club and electronics hangout.

## Live demo

- **Public HTTPS (no login):** https://raw.githack.com/AgmAtk03/amroz-gaming-zone/live-demo/index.html
- **Shop page (githack):** https://raw.githack.com/AgmAtk03/amroz-gaming-zone/live-demo/shop/index.html
- **Vercel production:** https://amroz-ward32-dristi-astra.vercel.app/ — Dristi Astra Hobby team. If this URL shows a Vercel login, disable **Deployment Protection → Vercel Authentication** on project `amroz-ward32`.
- **GitHub Pages** (after enabling Pages in repo settings): https://agmatk03.github.io/amroz-gaming-zone/

## Stack

- Next.js App Router
- Tailwind CSS
- Vercel (Dristi Astra) + static `live-demo` branch

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Hours, phone, membership rates, reviews, gallery tiles, and social URLs are **demo placeholders** unless marked otherwise. Shop guide prices are unlabeled NPR placeholders — only the contact number carries a demo badge until a real WhatsApp line is set.

Rebuild the public CDN branch with `npm run export:githack`, then publish the `out/` folder to `live-demo`.
