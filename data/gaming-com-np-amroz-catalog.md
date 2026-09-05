# gaming.com.np → Amroz catalog inventory

**Source:** https://gaming.com.np (and `/shop`)  
**Scraped:** 2026-09-06 (Australia/Sydney)  
**Scope:** Structure + product/hub names + URL paths only. No prices, no logo/asset copying, no denomination lists (those stay “shown on product page”).

**Site shape for Amroz:**  
Top-level **Categories** (site tabs) → **game/product hubs** (cards) → packs on hub product pages.

**Note:** Catalog is digital-only (no physical consoles/gear). Amroz adds PS5/gear separately.

## Top-level categories
| Amroz Category | Path prefix | Hub count |
|---|---|---|
| Top Up | `/topup/` | **81** |
| Voucher | `/voucher/` | **13** |
| Gift Card | `/gift-card/` | **10** |
| Subscription | `/subscription/` | **7** |

## Top Up hubs (81)
Weekly Diamond Pass MLBB; Mobile Legends (Nepal); Mobile Legends (Nepal) - Second Pack; Double Diamond MLBB; Mobile Legends (Global); Free Fire (Nepal); PUBG Mobile (GLOBAL); ROBLOX; Special Offer - Mobile Legends; eFootball PES 2026 (Android); eFootball PES 2026 (iOS); Mobile Legends (Indonesia); Poppo Live; CLASH OF CLANS OFFERS; Free Fire Level Up Package; Free Fire Evo Access Tokens; Genshin Impact; Blood Strike; Blood Strike Pass; Delta Force (Global); Delta Force Packs; Free Fire (Indonesia); Free Fire (Malaysia); Dragon Raja (SEA); Call of Duty Mobile; Goddess of Victory Nikke; Honor of Kings; Identity V; LifeAfter; Mirage Perfect Skyline; Mobile Legends (MY/SG); Moonlight Blade M; Tower of Fantasy GLOBAL; Tower of Fantasy SEA; Valorant (PH); Bigo Live; Limited Elite Bundle MLBB; Super Sus; Mobile Legends (Russia); Zepeto; Farlight84; Tiktok Coins; Wuthering Waves; Pokemon Go; Genshin Impact Battle Pass; Lords Mobile; Blockman Go; Standoff 2; Immortal Taoists; Honkai Star Rail Battle Pass; Free Fire Level Up Pass; Udemy; Brawl Stars Pass; Clash of Clans; Score Match; FC Mobile; Honkai Impact 3rd SEA; Last Island of Survival; Chess.com; Mini World CREATA; Clash Royale; Fortnite; War Robots; Starmaker; Starmaker Instant; Magic Chess Go Go; Marvel Rivals; Mobile Legends (Philippines); Punishing Gray Raven; Squad Busters; Once Human; Genshin x Miliastra; New Mobile Legends Nepal; Love and Deepspace; Super Value Pass MLBB; Free Fire LATAM; Telegram Stars; Whiteout Survival; Freefire Vietnam; Lineage2M; Teen Patti Gold.

## Voucher hubs (13)
Steam Wallet USD; Steam Wallet INR; GTA V (PC); Minecraft Java+Bedrock; Valorant Points; Black Myth Wukong Steam Gift; Tekken 8; PlayStation Store Wallet INR; Windows Activation; Microsoft Office; TryHackMe; iTunes Gift Card IN; NoPing Subscription.

## Gift Card hubs (10)
Bigo Live Gift Card; Garena Shell ID; Garena Shell MY; Nintendo eShop US; Razer Pin MY; Roblox Gift Card US; Tango; Discord Nitro; iTunes Gift Card US; PlayStation Network Card US.

## Subscription hubs (7)
Netflix Premium; Crunchyroll; YouTube Premium; Surfshark VPN; Duolingo Super; Prime Video; Zoom.

## Header carousel feel (recreate under Amroz)
Swiper loop, centered, ~2.5s autoplay, 0.5s slide. Themes to inspire Amroz slideshow: game promos + **must include Pre-order GTA 6 now with Amroz Gaming**; also PS5 / Top-ups / Gaming gear highlight slides.

## Dead paths to skip
where-winds-meet topup 404; honkai-star-rail main topup 404 (BP hub ok).

## Amroz IA
Categories → one card per hub → packs only after click. Deduplicate MLBB/FF regional variants as sub-options under one game where AgmBizz rule “no double category” applies — prefer one Free Fire / one MLBB card with region/pack choice inside.
