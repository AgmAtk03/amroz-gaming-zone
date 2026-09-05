"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/photo";
import { site, venue, venueSlides, whatsAppHref } from "@/lib/content";

const INTERVAL_MS = 3200;

export function VisitZone() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const book = whatsAppHref(venue.bookText);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % venueSlides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section
      id="zone"
      className="zone-strip border-t border-line bg-paper-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-xs font-semibold tracking-wide text-gold uppercase">Pepsicola floor</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{venue.title}</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          {venue.place}. {venue.placeLine}
        </p>
        <p className="mt-1 text-xs text-muted">
          {venue.hours.map((h) => `${h.days} ${h.time}`).join(" · ")}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {venue.rates.map((rate) => (
            <li
              key={rate.label}
              className="rounded-xl border border-line bg-panel px-3 py-2.5"
            >
              <p className="text-[11px] text-muted">{rate.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-gold">{rate.price}</p>
            </li>
          ))}
        </ul>

        <div className="zone-viewport relative mt-5 overflow-hidden">
          <div
            className="zone-track flex gap-3"
            style={{ transform: `translateX(calc(-${i} * (86% + 0.75rem)))` }}
          >
            {venueSlides.map((slide, idx) => (
              <article
                key={slide.id}
                className={`zone-card relative h-52 w-[86%] shrink-0 overflow-hidden rounded-2xl sm:h-60 ${
                  idx === i ? "zone-card-on" : ""
                }`}
              >
                <Photo src={slide.photo} alt="" className="zone-still" />
                <div className="zone-wash absolute inset-0" />
                <div className="zone-scan pointer-events-none absolute inset-0" />
                <span className="absolute top-3 right-3 inline-flex rounded-full border border-gold/60 bg-paper/85 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-gold uppercase">
                  {slide.stamp}
                </span>
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-wide text-gold uppercase">
                    {slide.kicker}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                    {slide.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-[13px] text-ink-soft">{slide.line}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-1.5">
          {venueSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={idx === i ? "true" : undefined}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-7 bg-gold" : "w-2.5 bg-line"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href={book}
            className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
          >
            {venue.bookLabel}
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="thumb-btn inline-flex items-center justify-center rounded-xl border border-line bg-panel px-5 text-sm font-semibold"
          >
            Call the desk
          </a>
        </div>
        <p className="mt-3 text-[11px] text-muted">
          Digital shop stays above — Instant Delivery top-ups and 2 Hour Delivery gear. This strip is
          the physical floor.
        </p>
      </div>
    </section>
  );
}
