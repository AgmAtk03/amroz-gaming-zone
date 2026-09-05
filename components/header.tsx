"use client";

import { Wordmark } from "@/components/brand";
import { PayMarks } from "@/components/pay-marks";
import { homeHref, navHref, payHref, shopPageHref, type SitePage } from "@/lib/routes";
import { useSavedStore } from "@/lib/saved-ids";

export function Header({
  page = "home",
  sticky = true,
  onOpenAccount,
  onOpenCart,
}: {
  page?: SitePage;
  sticky?: boolean;
  onOpenAccount?: () => void;
  onOpenCart?: () => void;
}) {
  const store = useSavedStore();
  const badge = Math.min(store.orders.length, 9);

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-line bg-paper/92 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:h-16 sm:px-6">
        <Wordmark href={homeHref(page)} compact />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Desktop">
          <a href={homeHref(page)} className="rounded-xl px-3 py-2 text-sm text-muted hover:text-ink">
            Home
          </a>
          <a href={shopPageHref(page)} className="rounded-xl px-3 py-2 text-sm text-muted hover:text-ink">
            Shop
          </a>
          <a href={navHref("contact", page)} className="rounded-xl px-3 py-2 text-sm text-muted hover:text-ink">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="hidden relative h-10 items-center rounded-xl border border-line px-3 text-xs font-medium text-ink-soft md:inline-flex"
          >
            Cart
            {badge ? (
              <span className="ml-1.5 inline-flex min-w-5 justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-paper">
                {badge}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={onOpenAccount}
            className="hidden h-10 items-center rounded-xl border border-line px-3 text-xs font-medium text-ink-soft md:inline-flex"
          >
            Account
          </button>
          <a
            href={payHref(page)}
            className="thumb-btn inline-flex items-center rounded-xl bg-gold px-3 text-sm font-semibold text-paper sm:px-4"
          >
            Top up
          </a>
        </div>
      </div>
      <div className="hidden border-t border-line px-6 py-1.5 md:block">
        <div className="mx-auto flex max-w-5xl justify-end">
          <PayMarks />
        </div>
      </div>
    </header>
  );
}
