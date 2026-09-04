"use client";

import { useState } from "react";
import { Wordmark } from "@/components/brand";
import { nav } from "@/lib/content";
import { homeHref, navHref, payHref, shopPageHref, type SitePage } from "@/lib/routes";

export function Header({
  page = "home",
  sticky = true,
}: {
  page?: SitePage;
  sticky?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-line bg-paper/90 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Wordmark href={homeHref(page)} compact />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href.slice(1), page)}
              className="rounded-md px-3 py-2 text-sm text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
            >
              {item.label}
            </a>
          ))}
          <a
            href={shopPageHref(page)}
            className="rounded-md px-3 py-2 text-sm text-muted hover:text-ink"
          >
            Shop
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={payHref(page)}
            className="thumb-btn inline-flex items-center rounded-full bg-ink px-4 text-sm font-semibold text-paper"
          >
            Top up
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-line bg-panel px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={navHref(item.href.slice(1), page)}
                onClick={() => setOpen(false)}
                className="thumb-btn flex items-center rounded-md px-3 text-base text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={shopPageHref(page)}
              onClick={() => setOpen(false)}
              className="thumb-btn flex items-center rounded-md px-3 text-base text-ink"
            >
              Shop
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
