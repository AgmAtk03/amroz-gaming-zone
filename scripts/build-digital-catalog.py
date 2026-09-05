#!/usr/bin/env python3
"""Build data/catalog.json — Gaming Center Nepal coverage, one card per game."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def npr(n: int) -> str:
    return f"{n:,}"


def member(n: int) -> str:
    return npr(max(1, round(n * 0.95)))


def packs(prefix: str, rows: list) -> list[dict]:
    out = []
    for i, row in enumerate(rows):
        label, amount, unit, price = row[:4]
        popular = bool(row[4]) if len(row) > 4 else False
        out.append(
            {
                "id": f"{prefix}-{str(amount).replace(',', '').replace(' ', '').lower()}",
                "label": label,
                "amount": str(amount),
                "unit": unit,
                "price": npr(int(price)),
                "memberPrice": member(int(price)),
                "popular": popular,
                "marginRank": i + 1,
            }
        )
    return out


def uid(
    id_,
    name,
    short,
    kind,
    blurb,
    label,
    hint,
    placeholder,
    pack_rows,
    *,
    photo="",
    featured=False,
    category="topups",
    merged=None,
):
    return {
        "id": id_,
        "category": category,
        "kind": kind,
        "name": name,
        "short": short,
        "blurb": blurb,
        "idLabel": label,
        "idHint": hint,
        "idPlaceholder": placeholder,
        "fulfillMode": "uid",
        "tone": "gold",
        "fulfillment": f"{kind} pending on this ID",
        "photo": photo,
        "featured": featured,
        "marginRank": 3 if featured else 8,
        "mergedFrom": merged or [],
        "packs": packs(id_, pack_rows),
    }


def account(
    id_,
    name,
    short,
    kind,
    blurb,
    label,
    hint,
    placeholder,
    pack_rows,
    password_label,
    password_why,
    *,
    photo="",
    featured=False,
    category="vouchers",
    merged=None,
):
    row = uid(
        id_,
        name,
        short,
        kind,
        blurb,
        label,
        hint,
        placeholder,
        pack_rows,
        photo=photo,
        featured=featured,
        category=category,
        merged=merged,
    )
    row["fulfillMode"] = "account"
    row["passwordLabel"] = password_label
    row["passwordWhy"] = password_why
    row["fulfillment"] = f"{kind} pending on this account"
    return row


def code(
    id_,
    name,
    short,
    kind,
    blurb,
    pack_rows,
    *,
    photo="",
    featured=False,
    category="gift-cards",
    merged=None,
):
    row = uid(
        id_,
        name,
        short,
        kind,
        blurb,
        "Email or WhatsApp",
        "Where we send the code. No account password.",
        "980… or you@mail.com",
        pack_rows,
        photo=photo,
        featured=featured,
        category=category,
        merged=merged,
    )
    row["fulfillMode"] = "code"
    row["fulfillment"] = f"{kind} code pending"
    return row


MLBB_MERGED = [
    "Weekly Diamond Pass MLBB",
    "Mobile Legends (Nepal)",
    "Mobile Legends (Nepal) - Second Pack",
    "Double Diamond MLBB",
    "Mobile Legends (Global)",
    "Special Offer - Mobile Legends",
    "Mobile Legends (Indonesia)",
    "Limited Elite Bundle MLBB",
    "Mobile Legends (Malaysia/Singapore)",
    "Mobile Legends (Russia)",
    "Mobile Legends (Philippines)",
    "New - Mobile Legends (Nepal)",
    "Super Value Pass MLBB",
]

FF_MERGED = [
    "Free Fire (Nepal)",
    "Free Fire Level Up Package - New",
    "Free Fire - Evo Access Tokens (NP/BD)",
    "Free Fire (Indonesia)",
    "Free Fire (Malaysia)",
    "Free Fire Level Up Pass",
    "Free Fire (LATAM)",
    "Freefire Vietnam",
]

hubs = [
    uid(
        "mlbb",
        "Mobile Legends",
        "ML",
        "Diamonds",
        "One MLBB card. Pick Nepal, weekly pass, or a bundle after you tap in.",
        "Player ID",
        "Player ID. Zone ID optional. No game password.",
        "12345678 (1234)",
        [
            ("86 diamonds", "86", "diamonds", 180),
            ("172 diamonds", "172", "diamonds", 360, True),
            ("Weekly pass", "weekly", "pass", 220, True),
            ("344 diamonds", "344", "diamonds", 720),
            ("706 diamonds", "706", "diamonds", 1500),
            ("Elite bundle", "elite", "bundle", 890),
        ],
        photo="/images/hub-mlbb.jpg",
        featured=True,
        merged=MLBB_MERGED,
    ),
    uid(
        "freefire",
        "Free Fire",
        "FF",
        "Diamonds",
        "Diamonds, weekly, level-up, and Evo — one Free Fire card.",
        "Player ID",
        "Free Fire UID — digits only. No game password.",
        "123456789",
        [
            ("100 diamonds", "100", "diamonds", 150),
            ("310 diamonds", "310", "diamonds", 450, True),
            ("Weekly", "weekly", "pass", 180, True),
            ("520 diamonds", "520", "diamonds", 750),
            ("Level-up pass", "level", "pass", 399),
            ("Evo access", "evo", "token", 250),
            ("1,080 diamonds", "1080", "diamonds", 1500),
        ],
        photo="/images/hub-freefire.jpg",
        featured=True,
        merged=FF_MERGED,
    ),
    uid(
        "pubg",
        "PUBG Mobile",
        "PUBG",
        "UC",
        "UC on your character ID. Pay, then play.",
        "Character ID",
        "PUBG character ID — digits only. No game password.",
        "5123456789",
        [
            ("60 UC", "60", "UC", 150),
            ("325 UC", "325", "UC", 750, True),
            ("660 UC", "660", "UC", 1500),
            ("1,800 UC", "1800", "UC", 3900),
        ],
        photo="/images/hub-pubg.jpg",
        featured=True,
        merged=["PUBG Mobile (GLOBAL)"],
    ),
    uid(
        "roblox",
        "Roblox",
        "RBX",
        "Robux",
        "Robux on your username. Gift-card packs live here too.",
        "Roblox username",
        "Exact username — not the display name. No password.",
        "amroz_player",
        [
            ("80 Robux", "80", "Robux", 160),
            ("400 Robux", "400", "Robux", 750, True),
            ("800 Robux", "800", "Robux", 1450),
            ("US gift card $10", "gc10", "card", 1650),
        ],
        photo="/images/hub-roblox.jpg",
        featured=True,
        merged=["ROBLOX", "Roblox Gift Card (US)"],
    ),
    uid(
        "valorant",
        "Valorant",
        "VAL",
        "VP",
        "VP on your Riot ID. PH and points packs in one place.",
        "Riot ID",
        "Name#TAG as you type it in-game. No password.",
        "amroz#NP1",
        [
            ("475 VP", "475", "VP", 450, True),
            ("1,000 VP", "1000", "VP", 900),
            ("2,050 VP", "2050", "VP", 1800),
            ("3,650 VP", "3650", "VP", 3200),
        ],
        photo="/images/hub-valorant.jpg",
        featured=True,
        merged=["Valorant (PH)-INSTANT", "Valorant Points"],
    ),
    uid(
        "genshin",
        "Genshin Impact",
        "GI",
        "Genesis",
        "Crystals and battle pass. One Genshin card.",
        "UID + server",
        "In-game UID and server. No password.",
        "800123456 (Asia)",
        [
            ("60 crystals", "60", "crystals", 180),
            ("300 crystals", "300", "crystals", 750, True),
            ("Battle pass", "bp", "pass", 1450),
            ("980 crystals", "980", "crystals", 2200),
        ],
        featured=True,
        merged=["Genshin Impact", "Genshin Impact Battle Pass", "Genshin Impact x Miliastra Wonderland"],
    ),
    uid(
        "honor-of-kings",
        "Honor of Kings",
        "HOK",
        "Tokens",
        "Tokens and weekly cards. One Honor of Kings card.",
        "Player ID",
        "Honor of Kings player ID. No game password.",
        "123456789",
        [
            ("16+1 tokens", "16", "tokens", 35),
            ("80+8 tokens", "80", "tokens", 160, True),
            ("Weekly card", "weekly", "card", 220),
            ("400+32 tokens", "400", "tokens", 810),
        ],
        featured=True,
        merged=["Honor of Kings"],
    ),
    uid(
        "call-of-duty",
        "Call of Duty Mobile",
        "COD",
        "CP",
        "COD Points on your UID.",
        "Player ID",
        "COD Mobile player ID. No password.",
        "123456789",
        [
            ("80 CP", "80", "CP", 180),
            ("400 CP", "400", "CP", 750, True),
            ("800 CP", "800", "CP", 1450),
            ("2,000 CP", "2000", "CP", 3500),
        ],
        featured=True,
        merged=["Call of Duty Mobile"],
    ),
    uid(
        "efootball",
        "eFootball",
        "PES",
        "Coins",
        "Android or iOS packs after you tap in.",
        "Konami ID",
        "Konami ID. No game password.",
        "konami_id",
        [
            ("100 coins · Android", "100a", "coins", 220, True),
            ("550 coins · Android", "550a", "coins", 990),
            ("100 coins · iOS", "100i", "coins", 240),
            ("550 coins · iOS", "550i", "coins", 1050),
        ],
        merged=["eFootball PES 2026 (Android Only)", "(IOS Only) eFootball PES 2026"],
    ),
    uid(
        "blood-strike",
        "Blood Strike",
        "BS",
        "Gold",
        "Gold and pass in one Blood Strike card.",
        "Player ID",
        "Blood Strike UID. No password.",
        "123456789",
        [
            ("60 gold", "60", "gold", 160),
            ("300 gold", "300", "gold", 720, True),
            ("Strike pass", "pass", "pass", 890),
            ("680 gold", "680", "gold", 1550),
        ],
        merged=["Blood Strike", "Blood Strike - Pass"],
    ),
    uid(
        "delta-force",
        "Delta Force",
        "DF",
        "Credits",
        "Global credits and event packs.",
        "Player ID",
        "Delta Force UID. No password.",
        "123456789",
        [
            ("60 credits", "60", "credits", 170),
            ("300 credits", "300", "credits", 740, True),
            ("Event pack", "event", "pack", 990),
            ("980 credits", "980", "credits", 2100),
        ],
        merged=["Delta Force (Global)", "Delta Force (Global) - Packs"],
    ),
    uid(
        "tower-of-fantasy",
        "Tower of Fantasy",
        "ToF",
        "Tanium",
        "Global or SEA — pick the pack after you tap in.",
        "UID + server",
        "UID and Global or SEA. No password.",
        "123456789 (Global)",
        [
            ("60 tanium · Global", "60g", "tanium", 180),
            ("300 tanium · Global", "300g", "tanium", 750, True),
            ("60 tanium · SEA", "60s", "tanium", 180),
            ("300 tanium · SEA", "300s", "tanium", 750),
        ],
        merged=["Tower of Fantasy (GLOBAL)", "Tower of Fantasy (SEA)"],
    ),
    uid(
        "honkai-star-rail",
        "Honkai: Star Rail",
        "HSR",
        "Oneiric",
        "Oneiric shards and battle pass.",
        "UID + server",
        "UID and server. No password.",
        "800123456 (Asia)",
        [
            ("60 shards", "60", "shards", 180),
            ("300 shards", "300", "shards", 750, True),
            ("Battle pass", "bp", "pass", 1450),
            ("980 shards", "980", "shards", 2200),
        ],
        merged=["Honkai: Star Rail", "Honkai: Star Rail Battle Pass"],
    ),
    uid(
        "clash-of-clans",
        "Clash of Clans",
        "COC",
        "Gems",
        "Gems and offer packs. One Clash card.",
        "Player tag",
        "Player tag like #ABC123. No password.",
        "#ABC123XY",
        [
            ("80 gems", "80", "gems", 180),
            ("500 gems", "500", "gems", 890, True),
            ("Offer pack", "offer", "pack", 650),
            ("1,200 gems", "1200", "gems", 1990),
        ],
        merged=["CLASH OF CLANS OFFERS", "Clash of Clans"],
    ),
    uid(
        "starmaker",
        "Starmaker",
        "SM",
        "Coins",
        "Coins in one Starmaker card.",
        "User ID",
        "Starmaker user ID. No password.",
        "123456789",
        [
            ("100 coins", "100", "coins", 160),
            ("500 coins", "500", "coins", 720, True),
            ("1,000 coins", "1000", "coins", 1350),
        ],
        merged=["Starmaker Topup", "[Instant] Starmaker Topup"],
    ),
    uid(
        "bigo",
        "Bigo Live",
        "Bigo",
        "Diamonds",
        "Direct top-up. Gift-card packs sit with gift cards? No — diamonds here.",
        "Bigo ID",
        "Bigo user ID. No password.",
        "123456789",
        [
            ("100 diamonds", "100", "diamonds", 180),
            ("500 diamonds", "500", "diamonds", 820, True),
            ("1,000 diamonds", "1000", "diamonds", 1550),
        ],
        merged=["Bigo Live (Direct Topup)"],
    ),
    uid("poppo", "Poppo Live", "Poppo", "Coins", "Live coins on your Poppo ID.", "User ID", "Poppo user ID. No password.", "123456789", [("100 coins", "100", "coins", 170), ("500 coins", "500", "coins", 780, True), ("1,200 coins", "1200", "coins", 1750)], merged=["Poppo Live"]),
    uid("dragon-raja", "Dragon Raja", "DR", "Coupons", "SEA coupons on your UID.", "UID", "Dragon Raja UID. No password.", "123456789", [("60 coupons", "60", "coupons", 190), ("300 coupons", "300", "coupons", 790, True), ("980 coupons", "980", "coupons", 2300)], merged=["Dragon Raja (SEA)"]),
    uid("nikke", "NIKKE", "NIKKE", "Gems", "Goddess of Victory gems.", "Player ID", "NIKKE player ID. No password.", "123456789", [("60 gems", "60", "gems", 180), ("300 gems", "300", "gems", 750, True), ("980 gems", "980", "gems", 2200)], merged=["Goddess of Victory: Nikke (Global)"]),
    uid("identity-v", "Identity V", "IDV", "Echoes", "Echoes on your UID.", "Player ID", "Identity V ID. No password.", "123456789", [("60 echoes", "60", "echoes", 180), ("300 echoes", "300", "echoes", 750, True), ("680 echoes", "680", "echoes", 1600)], merged=["Identity V"]),
    uid("life-after", "LifeAfter", "LA", "Golds", "Golds on your UID.", "Player ID", "LifeAfter ID. No password.", "123456789", [("60 golds", "60", "golds", 170), ("300 golds", "300", "golds", 740, True)], merged=["LifeAfter"]),
    uid("mirage", "Mirage: Perfect Skyline", "MPS", "Crystals", "Crystals on your UID.", "Player ID", "Mirage UID. No password.", "123456789", [("60 crystals", "60", "crystals", 180), ("300 crystals", "300", "crystals", 750, True)], merged=["Mirage:Perfect Skyline"]),
    uid("moonlight-blade", "Moonlight Blade M", "MBM", "Ingots", "Ingots on your UID.", "Player ID", "Moonlight Blade ID. No password.", "123456789", [("60 ingots", "60", "ingots", 180), ("300 ingots", "300", "ingots", 750, True)], merged=["Moonlight Blade M"]),
    uid("super-sus", "Super Sus", "SUS", "Gems", "Gems on your UID.", "Player ID", "Super Sus ID. No password.", "123456789", [("60 gems", "60", "gems", 160), ("300 gems", "300", "gems", 720, True)], merged=["Super Sus"]),
    uid("zepeto", "Zepeto", "ZEP", "Zems", "Zems on your username.", "Zepeto username", "Exact username. No password.", "amroz_zep", [("80 zems", "80", "zems", 190), ("400 zems", "400", "zems", 820, True)], merged=["Zepeto"]),
    uid("farlight84", "Farlight 84", "FL84", "Diamonds", "Diamonds on your UID.", "Player ID", "Farlight UID. No password.", "123456789", [("60 diamonds", "60", "diamonds", 170), ("300 diamonds", "300", "diamonds", 740, True)], merged=["Farlight84"]),
    uid("tiktok", "TikTok Coins", "TT", "Coins", "Coins on your TikTok username.", "TikTok username", "Exact username. No password.", "amroz_tt", [("70 coins", "70", "coins", 160), ("350 coins", "350", "coins", 720, True), ("700 coins", "700", "coins", 1350)], merged=["Tiktok Coins"]),
    uid("wuthering-waves", "Wuthering Waves", "WuWa", "Lunite", "Lunite on your UID.", "UID + server", "UID and server. No password.", "800123456", [("60 lunite", "60", "lunite", 180), ("300 lunite", "300", "lunite", 750, True), ("980 lunite", "980", "lunite", 2200)], merged=["Wuthering Waves"]),
    uid("pokemon-go", "Pokémon GO", "PGO", "Coins", "PokéCoins on your trainer.", "Trainer code", "Trainer code. No password.", "1234 5678 9012", [("100 coins", "100", "coins", 190), ("550 coins", "550", "coins", 890, True)], merged=["Pokemon Go"]),
    uid("lords-mobile", "Lords Mobile", "LM", "Gems", "Gems on your kingdom ID.", "Player ID", "Lords Mobile ID. No password.", "123456789", [("100 gems", "100", "gems", 180), ("500 gems", "500", "gems", 820, True)], merged=["Lords Mobile"]),
    uid("blockman-go", "Blockman Go", "BMG", "Gems", "Gems on your UID.", "Player ID", "Blockman Go ID. No password.", "123456789", [("60 gems", "60", "gems", 160), ("300 gems", "300", "gems", 720, True)], merged=["Blockman Go"]),
    uid("standoff-2", "Standoff 2", "SO2", "Gold", "Gold on your UID.", "Player ID", "Standoff 2 ID. No password.", "123456789", [("100 gold", "100", "gold", 180), ("500 gold", "500", "gold", 820, True)], merged=["Standoff 2"]),
    uid("immortal-taoists", "Immortal Taoists", "IT", "Jade", "Jade on your UID.", "Player ID", "Immortal Taoists ID. No password.", "123456789", [("60 jade", "60", "jade", 170), ("300 jade", "300", "jade", 740, True)], merged=["Immortal Taoists - Idle Manga"]),
    uid("brawl-stars", "Brawl Stars", "BS", "Gems", "Gems and pass offers.", "Player tag", "Player tag. No password.", "#ABC123", [("30 gems", "30", "gems", 220), ("80 gems", "80", "gems", 520, True), ("Brawl pass", "pass", "pass", 990)], merged=["Brawl Star Pass and Offers"]),
    uid("score-match", "Score Match", "SM", "Cash", "Cash on your UID.", "Player ID", "Score Match ID. No password.", "123456789", [("100 cash", "100", "cash", 170), ("500 cash", "500", "cash", 760, True)], merged=["Score Match"]),
    uid("fc-mobile", "FC Mobile", "FC", "Points", "FC points on your EA ID.", "EA ID", "EA account ID. No password.", "ea_id", [("40 points", "40", "points", 180), ("120 points", "120", "points", 520, True), ("520 points", "520", "points", 1990)], merged=["FC Mobile"]),
    uid("honkai-impact", "Honkai Impact 3rd", "HI3", "Crystals", "SEA crystals on your UID.", "UID + server", "UID and SEA server. No password.", "123456789", [("60 crystals", "60", "crystals", 180), ("300 crystals", "300", "crystals", 750, True)], merged=["Honkai Impact 3rd (SEA)"]),
    uid("last-island", "Last Island of Survival", "LIOS", "Gold", "Gold on your UID.", "Player ID", "Last Island ID. No password.", "123456789", [("60 gold", "60", "gold", 170), ("300 gold", "300", "gold", 740, True)], merged=["Last Island of Survival"]),
    uid("chess-com", "Chess.com", "Chess", "Membership", "Premium time on your username.", "Chess.com username", "Exact username. No password.", "amroz_chess", [("1 month", "1m", "month", 890, True), ("3 months", "3m", "month", 2290), ("1 year", "1y", "year", 6990)], merged=["Chess.com"]),
    uid("mini-world", "Mini World: CREATA", "MW", "Mini", "Mini coins on your UID.", "Player ID", "Mini World ID. No password.", "123456789", [("60 mini", "60", "mini", 160), ("300 mini", "300", "mini", 720, True)], merged=["Mini World:CREATA"]),
    uid("clash-royale", "Clash Royale", "CR", "Gems", "Gems on your player tag.", "Player tag", "Player tag. No password.", "#ABC123", [("80 gems", "80", "gems", 180), ("500 gems", "500", "gems", 890, True)], merged=["Clash Royale"]),
    uid("fortnite", "Fortnite", "FN", "V-Bucks", "V-Bucks on your Epic ID.", "Epic username", "Epic username. No password.", "amroz_fn", [("1,000 V-Bucks", "1000", "vbucks", 990, True), ("2,800 V-Bucks", "2800", "vbucks", 2490), ("5,000 V-Bucks", "5000", "vbucks", 3990)], featured=True, merged=["Fortnite"]),
    uid("war-robots", "War Robots", "WR", "Gold", "Gold on your UID.", "Player ID", "War Robots ID. No password.", "123456789", [("100 gold", "100", "gold", 190), ("500 gold", "500", "gold", 850, True)], merged=["War Robots"]),
    uid("magic-chess", "Magic Chess: Go Go", "MC", "Diamonds", "Diamonds on your ML ID.", "Player ID", "Player ID. Zone optional. No password.", "12345678 (1234)", [("50 diamonds", "50", "diamonds", 160), ("150 diamonds", "150", "diamonds", 420, True), ("500 diamonds", "500", "diamonds", 1250)], merged=["Magic Chess: Go Go"]),
    uid("marvel-rivals", "Marvel Rivals", "MR", "Lattice", "Lattice on your UID.", "Player ID", "Marvel Rivals ID. No password.", "123456789", [("300 lattice", "300", "lattice", 450, True), ("500 lattice", "500", "lattice", 720), ("1,000 lattice", "1000", "lattice", 1350)], merged=["Marvel Rivals"]),
    uid("gray-raven", "Punishing: Gray Raven", "PGR", "Black cards", "Black cards on your UID.", "Player ID", "PGR UID. No password.", "123456789", [("60 cards", "60", "cards", 180), ("300 cards", "300", "cards", 750, True)], merged=["Punishing: Gray Raven"]),
    uid("squad-busters", "Squad Busters", "SB", "Gems", "Gems on your player tag.", "Player tag", "Player tag. No password.", "#ABC123", [("80 gems", "80", "gems", 180), ("170 gems", "170", "gems", 380, True)], merged=["Squad Busters"]),
    uid("once-human", "Once Human", "OH", "Crate", "Crates on your UID.", "Player ID", "Once Human ID. No password.", "123456789", [("60 crate", "60", "crate", 190), ("300 crate", "300", "crate", 790, True)], merged=["Once Human"]),
    uid("love-and-deepspace", "Love and Deepspace", "LADS", "Gems", "Gems on your UID.", "Player ID", "Love and Deepspace ID. No password.", "123456789", [("60 gems", "60", "gems", 180), ("300 gems", "300", "gems", 750, True)], merged=["Love and Deepspace"]),
    uid("telegram-stars", "Telegram Stars", "TG", "Stars", "Stars on your Telegram username.", "Telegram username", "Username with @. No password.", "@amroz", [("50 stars", "50", "stars", 190), ("250 stars", "250", "stars", 850, True)], merged=["Telegram Stars"]),
    uid("whiteout-survival", "Whiteout Survival", "WOS", "Gems", "Gems on your UID.", "Player ID", "Whiteout Survival ID. No password.", "123456789", [("100 gems", "100", "gems", 180), ("500 gems", "500", "gems", 820, True)], merged=["Whiteout Survival"]),
    uid("lineage2m", "Lineage2M", "L2M", "NCoin", "NCoin on your UID.", "Player ID", "Lineage2M ID. No password.", "123456789", [("60 ncoin", "60", "ncoin", 190), ("300 ncoin", "300", "ncoin", 790, True)], merged=["Lineage2M"]),
    uid("where-winds-meet", "Where Winds Meet", "WWM", "Jade", "Jade on your UID.", "Player ID", "Where Winds Meet ID. No password.", "123456789", [("60 jade", "60", "jade", 180), ("300 jade", "300", "jade", 750, True)], merged=["Where Winds Meet"]),
    account(
        "steam",
        "Steam",
        "STM",
        "USD / INR wallet",
        "Steam wallet on your account. USD and INR packs after you tap in.",
        "Steam username",
        "The Steam account the wallet should land on.",
        "amroz_steam",
        [
            ("$5 USD", "5", "USD", 750, True),
            ("$10 USD", "10", "USD", 1450),
            ("₹500 INR", "500inr", "INR", 890),
            ("$20 USD", "20", "USD", 2850),
        ],
        "Steam password",
        "We sign in once to add the wallet. Password is not saved on this phone.",
        photo="/images/hub-steam.jpg",
        featured=True,
        category="vouchers",
        merged=["Steam Wallet Code (USD)", "Steam Wallet Code (INR)"],
    ),
    account(
        "psn",
        "PlayStation Store",
        "PS",
        "Wallet",
        "PS Store credit. INR and US packs after you tap in.",
        "PSN Online ID",
        "The Online ID we should credit.",
        "amroz_psn",
        [
            ("NPR 1,000 credit", "1000", "wallet", 1000, True),
            ("NPR 2,000 credit", "2000", "wallet", 2000),
            ("US $10 card", "10us", "USD", 1650),
            ("NPR 5,000 credit", "5000", "wallet", 5000),
        ],
        "PlayStation password",
        "We sign in once to drop store credit. Password is not saved on this phone.",
        photo="/images/hub-psn.jpg",
        featured=True,
        category="vouchers",
        merged=["PlayStation Store Wallet Code (INR)", "PlayStation Network Card (US)"],
    ),
    code("gta-5", "GTA V", "GTA5", "Steam gift", "GTA V Steam gift. Code after pay.", [("Standard", "std", "key", 2490, True), ("Premium", "prem", "key", 3990)], category="vouchers", merged=["Grand Theft Auto V (GTA 5)"]),
    code("minecraft", "Minecraft", "MC", "Java + Bedrock", "Java and Bedrock edition key.", [("Java + Bedrock", "both", "key", 3490, True)], category="vouchers", merged=["Minecraft Java and Bedrock Edition"]),
    code("wukong", "Black Myth: Wukong", "BMW", "Steam gift", "Steam gift after pay.", [("Standard", "std", "key", 5990, True)], category="vouchers", merged=["Black Myth: Wukong Steam Gift"]),
    code("tekken-8", "Tekken 8", "T8", "Steam gift", "Tekken 8 Steam gift.", [("Standard", "std", "key", 5490, True)], category="vouchers", merged=["Tekken 8"]),
    code("windows", "Windows key", "WIN", "Activation", "Windows activation for Nepal.", [("Home", "home", "key", 1990, True), ("Pro", "pro", "key", 3490)], category="vouchers", merged=["Windows Activation Key (Nepal)"]),
    code("office", "Microsoft Office", "OFF", "License", "Office license key.", [("Personal", "per", "key", 4990, True), ("Professional", "pro", "key", 8990)], category="vouchers", merged=["Microsoft Office"]),
    code("tryhackme", "TryHackMe", "THM", "Voucher", "TryHackMe voucher code.", [("1 month", "1m", "month", 1490, True), ("1 year", "1y", "year", 9990)], category="vouchers", merged=["TryHackMe"]),
    code("noping", "NoPing", "NP", "Subscription code", "NoPing code after pay.", [("1 month", "1m", "month", 890, True), ("1 year", "1y", "year", 6990)], category="vouchers", merged=["NoPing Subscription Code"]),
    code("udemy", "Udemy", "UD", "Course credit", "Udemy credit after pay.", [("1 course", "1", "course", 890, True), ("5 courses", "5", "course", 3490)], category="vouchers", merged=["Udemy"]),
    code(
        "itunes",
        "iTunes / App Store",
        "iOS",
        "Gift card",
        "US and India cards after you tap in.",
        [("US $10", "10us", "USD", 1650, True), ("US $25", "25us", "USD", 3990), ("IN ₹500", "500in", "INR", 890)],
        category="gift-cards",
        merged=["iTunes Gift Card (IN)", "iTunes Gift Card (US)"],
    ),
    code("nintendo", "Nintendo eShop", "NSW", "Gift card", "US eShop card.", [("$10", "10", "USD", 1650, True), ("$25", "25", "USD", 3990), ("$50", "50", "USD", 7790)], merged=["Nintendo eShop Gift Card (US)"]),
    code("razer", "Razer Gold", "RZ", "Pin", "Razer pin (MY).", [("RM 10", "10", "MYR", 390, True), ("RM 50", "50", "MYR", 1690)], merged=["Razer Pin Direct Top Up (MY)"]),
    code("garena-shell", "Garena Shell", "GS", "Shells", "ID or MY after you tap in.", [("ID 50", "50id", "shell", 220, True), ("ID 150", "150id", "shell", 620), ("MY 50", "50my", "shell", 240)], merged=["Garena Shell (ID)", "Garena Shell (MY)"]),
    code("bigo-card", "Bigo gift card", "BigoGC", "Gift card", "Bigo gift card code.", [("$10", "10", "USD", 1650, True), ("$25", "25", "USD", 3990)], merged=["Bigo Live Gift Card"]),
    code("tango", "Tango", "Tango", "Coins card", "Tango gift card.", [("$10", "10", "USD", 1650, True)], merged=["Tango"]),
    code("discord", "Discord Nitro", "Nitro", "Nitro", "Nitro gift after pay.", [("1 month", "1m", "month", 1290, True), ("1 year", "1y", "year", 9990)], merged=["Discord Nitro"]),
    code("netflix", "Netflix", "NF", "Premium", "Netflix premium time.", [("1 month", "1m", "month", 1490, True), ("3 months", "3m", "month", 4290)], category="subscriptions", merged=["Netflix Premium Subscription"]),
    code("crunchyroll", "Crunchyroll", "CR", "Premium", "Crunchyroll premium.", [("1 month", "1m", "month", 990, True), ("1 year", "1y", "year", 7990)], category="subscriptions", merged=["Crunchyroll Premium"]),
    code("youtube", "YouTube Premium", "YT", "Premium", "YouTube Premium time.", [("1 month", "1m", "month", 890, True), ("1 year", "1y", "year", 7990)], category="subscriptions", merged=["YouTube Premium"]),
    code("surfshark", "Surfshark", "VPN", "VPN", "Surfshark VPN code.", [("1 month", "1m", "month", 690, True), ("1 year", "1y", "year", 3990)], category="subscriptions", merged=["Surfshark VPN"]),
    code("duolingo", "Duolingo Super", "Duo", "Super", "Duolingo Super time.", [("1 month", "1m", "month", 790, True), ("1 year", "1y", "year", 5990)], category="subscriptions", merged=["Duolingo Super"]),
    code("prime-video", "Prime Video", "Prime", "Premium", "Prime Video time.", [("1 month", "1m", "month", 499, True), ("1 year", "1y", "year", 4990)], category="subscriptions", merged=["Prime Video"]),
    code("zoom", "Zoom", "Zoom", "Pro", "Zoom Pro time.", [("1 month", "1m", "month", 1490, True), ("1 year", "1y", "year", 12990)], category="subscriptions", merged=["Zoom"]),
]

# Fix leftover joke blurb
for h in hubs:
    if h["id"] == "bigo":
        h["blurb"] = "Bigo diamonds on your ID. Pay, then go live."

categories = [
    {"id": "topups", "label": "Top-ups", "blurb": "Diamonds, UC, VP — one card per game."},
    {"id": "vouchers", "label": "Vouchers", "blurb": "Steam, PS Store, PC keys."},
    {"id": "gift-cards", "label": "Gift cards", "blurb": "iTunes, Nintendo, Discord, more."},
    {"id": "subscriptions", "label": "Subs", "blurb": "Netflix, YouTube, VPN."},
    {"id": "gear", "label": "Gear", "blurb": "Fantech, PS5, 2 hour delivery."},
]

ids = [h["id"] for h in hubs]
assert len(ids) == len(set(ids)), "duplicate hub ids"

payload = {
    "source": "https://gaming.com.np/",
    "note": "Gaming Center Nepal catalog folded into unique games. Same product never listed twice. Packs only after tap-in. Amroz gear lives in catalog.ts.",
    "categories": categories,
    "hubs": hubs,
}

out = ROOT / "data" / "catalog.json"
out.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n")
print(f"wrote {out} hubs={len(hubs)} cats={len(categories)}")
for cat in categories:
    n = sum(1 for h in hubs if h["category"] == cat["id"])
    print(f"  {cat['id']}: {n}")
