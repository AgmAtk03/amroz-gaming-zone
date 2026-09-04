"use client";

import { FormEvent, useMemo, useState } from "react";
import { DemoBadge } from "@/components/brand";
import { hubs, physical } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

type Lang = "en" | "ne";
type Msg = { role: "bot" | "user"; text: string; lang: Lang; href?: string; hrefLabel?: string };

function detectLang(text: string): Lang {
  if (/[\u0900-\u097F]/.test(text)) return "ne";
  if (
    /\b(kati|cha|chha|chahincha|garnu|garna|chahe|ho|huncha|paisa|sasto|topup|top up)\b/i.test(
      text,
    )
  ) {
    return "ne";
  }
  return "en";
}

function reply(
  text: string,
  from: SitePage,
): { text: string; lang: Lang; href?: string; hrefLabel?: string } {
  const lang = detectLang(text);
  const q = text.toLowerCase();

  const hitHub = hubs.find(
    (hub) =>
      q.includes(hub.id) ||
      q.includes(hub.name.toLowerCase()) ||
      q.includes(hub.short.toLowerCase()) ||
      (hub.id === "freefire" && q.includes("free fire")) ||
      (hub.id === "psn" && (q.includes("ps store") || q.includes("playstation"))) ||
      (hub.id === "steam" && q.includes("steam")),
  );

  const hitItem = physical.find(
    (item) =>
      q.includes(item.name.toLowerCase()) ||
      q.includes(item.sku.toLowerCase()) ||
      q.includes(item.kind.toLowerCase()) ||
      (q.includes("fantech") && item.group === "fantech") ||
      (q.includes("mouse") && item.kind.toLowerCase().includes("mouse")) ||
      (q.includes("headset") && item.kind === "Headset") ||
      ((q.includes("keyboard") || q.includes("atom")) && item.id === "ft-atom87") ||
      (q.includes("dualsense") && item.id === "ps5-dualsense"),
  );

  if (hitHub) {
    return {
      lang,
      href: payHref(from, { hub: hitHub.id }),
      hrefLabel: lang === "ne" ? `${hitHub.name} pack kholnus` : `Open ${hitHub.name} packs`,
      text:
        lang === "ne"
          ? `${hitHub.name} — ${hitHub.blurb} Pack choose garera ID pathaunus. Instant digital.`
          : `${hitHub.name}: ${hitHub.blurb} Open the pack list and drop the ID. Instant digital.`,
    };
  }

  if (hitItem) {
    return {
      lang,
      text:
        lang === "ne"
          ? `${hitItem.name} shelf ma cha. Same-day Pepsicola Ward 32, usually 2 hours. WhatsApp fallback ni huncha.`
          : `${hitItem.name} is on the physical shelf. Same-day from Pepsicola Ward 32, usually within two hours. WhatsApp if you want a human.`,
    };
  }

  if (/\b(help|product|find|khoj|chahin|sallah|ke cha|what do)\b/i.test(q) || q.length < 3) {
    return {
      lang,
      text:
        lang === "ne"
          ? "Kehi khojna madat chahinchha? Free Fire, PUBG, MLBB, Valorant, Roblox, PS Store, Steam — ya Fantech / PS5 gear. Naam lekhnu hola."
          : "Want help finding a product? I can point you to Free Fire, PUBG, MLBB, Valorant, Roblox, PS Store, Steam, or the physical shelf.",
    };
  }

  return {
    lang,
    text:
      lang === "ne"
        ? "Maile tyo product bheteina. Game ko naam ya 'mouse', 'headset', 'PS5' lekhnus. Yo DEMO desk ho."
        : "I did not match that. Try a game name, or mouse / headset / PS5. This is a DEMO desk.",
  };
}

const starters = [
  { en: "Free Fire", ne: "Free Fire", send: "Free Fire" },
  { en: "Physical gear", ne: "Physical gear", send: "fantech mouse" },
  { en: "PS Store", ne: "PS Store", send: "PS Store" },
];

export function ChatWidget({ from = "home" }: { from?: SitePage }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      lang: "en",
      text: "Amroz desk (DEMO). English or Nepali is fine. Want help finding a product?",
    },
  ]);

  const lastLang = useMemo(() => msgs.filter((m) => m.role === "user").at(-1)?.lang ?? "en", [msgs]);

  function pushUser(text: string) {
    const lang = detectLang(text);
    const bot = reply(text, from);
    setMsgs((prev) => [
      ...prev,
      { role: "user", text, lang },
      { role: "bot", text: bot.text, lang: bot.lang, href: bot.href, hrefLabel: bot.hrefLabel },
    ]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    pushUser(text);
  }

  return (
    <>
      <section id="desk" className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel px-4 py-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Desk chat</p>
              <DemoBadge />
            </div>
            <p className="font-serif mt-1 text-lg font-semibold">Need a hand finding something?</p>
            <p className="mt-1 text-sm text-muted">Nepali or English. Points you to a pack or the shelf.</p>
          </div>
          <button
            type="button"
            className="thumb-btn shrink-0 rounded-full bg-ink px-4 text-sm font-semibold text-paper"
            onClick={() => setOpen(true)}
          >
            Open chat
          </button>
        </div>
      </section>

      {open ? null : (
        <button
          type="button"
          className="fixed right-4 bottom-20 z-40 thumb-btn rounded-full bg-ink px-4 text-sm font-semibold text-paper shadow-lg sm:bottom-4"
          onClick={() => setOpen(true)}
        >
          Chat
        </button>
      )}

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md px-3 pb-3 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-[22rem] sm:px-0">
          <div className="flex h-[min(32rem,78vh)] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Amroz desk</p>
                <p className="text-[11px] text-muted">DEMO · no paid API</p>
              </div>
              <button
                type="button"
                className="h-10 w-10 rounded-full border border-line text-ink"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
              {msgs.map((msg, i) => (
                <div
                  key={`${i}-${msg.text.slice(0, 12)}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-ink text-paper"
                      : "bg-paper-2 text-ink"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.href ? (
                    <a
                      href={msg.href}
                      className="mt-2 inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper"
                    >
                      {msg.hrefLabel ?? "Open"}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 px-3 pb-2">
              {starters.map((s) => (
                <button
                  key={s.send}
                  type="button"
                  className="rounded-full border border-line px-3 py-1.5 text-xs"
                  onClick={() => pushUser(s.send)}
                >
                  {lastLang === "ne" ? s.ne : s.en}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lastLang === "ne" ? "Khojne kura lekhnu…" : "Ask for a product…"}
                className="min-h-11 flex-1 rounded-full border border-line bg-paper px-4 text-sm outline-none focus:border-ink"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-pine px-4 text-sm font-semibold text-paper"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
