"use client";

import { useState } from "react";
import { Wordmark } from "@/components/brand";
import { nav, whatsAppHref } from "@/lib/content";
import { homeHref, navHref, type SitePage } from "@/lib/routes";

export function Header({ page = "home" }: { page?: SitePage }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark href={homeHref(page)} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href.slice(1), page)}
              className="rounded-md px-3 py-2 text-sm text-muted transition hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsAppHref("Hi Amroz — I want to book a booth.")}
            className="hidden rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-ink glow-btn transition sm:inline-flex"
          >
            Book a booth
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-text lg:hidden"
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
        <div
          id="mobile-nav"
          className="border-t border-line bg-ink-2 px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={navHref(item.href.slice(1), page)}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-text hover:bg-panel"
              >
                {item.label}
              </a>
            ))}
            <a
              href={navHref("book", page)}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-cyan px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Book a booth
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
