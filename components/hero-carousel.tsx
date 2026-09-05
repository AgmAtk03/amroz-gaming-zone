"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/photo";
import { payHref, shopPageHref } from "@/lib/routes";

const slides = [
  {
    id: "gta6",
    kicker: "Coming soon",
    title: "Pre-order GTA 6 now with Amroz Gaming",
    line: "Hold a copy. We ping you when it drops.",
    cta: "Pre-order",
    href: payHref("home", { sku: "gta6-preorder" }),
    photo: "/images/gear-gta6.jpg",
  },
  {
    id: "ps5",
    kicker: "2 hour delivery",
    title: "PS5 console and pads, packed today",
    line: "Ask the Pepsicola shelf. Stock moves fast.",
    cta: "See PS5",
    href: shopPageHref("home", { cat: "gear" }),
    photo: "/images/gear-ps5-console.jpg",
  },
  {
    id: "topups",
    kicker: "Top-ups",
    title: "Pick a game. Pay. Play.",
    line: "Diamonds, UC, VP — one card per game.",
    cta: "Browse top-ups",
    href: shopPageHref("home", { cat: "topups" }),
    photo: "/images/hub-freefire.jpg",
  },
  {
    id: "gear",
    kicker: "Gaming gear",
    title: "Fantech and pads in 2 hours",
    line: "In stock chips stay on every card.",
    cta: "Open gear",
    href: shopPageHref("home", { cat: "gear" }),
    photo: "/images/hero.jpg",
  },
] as const;

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, []);

  const slide = slides[i];

  return (
    <section id="top" className="hero-reel relative overflow-hidden">
      <div className="relative min-h-[18.5rem] sm:min-h-[21rem]">
        {slides.map((row, idx) => (
          <div
            key={row.id}
            className={`hero-slide absolute inset-0 ${idx === i ? "is-on" : ""}`}
            aria-hidden={idx !== i}
          >
            <Photo src={row.photo} alt="" priority={idx === 0} className="hero-ken" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/70 to-paper/20" />
          </div>
        ))}
        <div className="relative mx-auto flex min-h-[18.5rem] max-w-5xl flex-col justify-end px-4 py-5 sm:min-h-[21rem] sm:px-6 sm:py-8">
          <p className="hero-copy text-xs font-semibold tracking-wide text-gold uppercase">
            {slide.kicker}
          </p>
          <h1 className="hero-copy mt-2 max-w-xl text-[1.7rem] leading-[1.12] font-semibold tracking-tight sm:text-4xl">
            {slide.title}
          </h1>
          <p className="hero-copy mt-2 max-w-md text-[15px] text-ink-soft">{slide.line}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={slide.href}
              className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
            >
              {slide.cta}
            </a>
            <a
              href={shopPageHref("home", { cat: "topups" })}
              className="thumb-btn inline-flex items-center justify-center rounded-xl border border-line bg-panel/90 px-5 text-sm font-semibold"
            >
              Shop games
            </a>
          </div>
          <div className="mt-4 flex gap-1.5">
            {slides.map((row, idx) => (
              <button
                key={row.id}
                type="button"
                aria-label={`Show ${row.title}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-gold" : "w-3 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
