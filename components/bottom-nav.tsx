"use client";

import { homeHref, shopPageHref, type SitePage } from "@/lib/routes";
import { useSavedStore } from "@/lib/saved-ids";

export function BottomNav({
  page,
  onCart,
  onAccount,
}: {
  page: SitePage;
  onCart: () => void;
  onAccount: () => void;
}) {
  const store = useSavedStore();
  const cartCount = Math.min(store.orders.length, 9);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper-2/95 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-4">
        <li>
          <a
            href={homeHref(page)}
            aria-current={page === "home" ? "page" : undefined}
            className={`flex h-full flex-col items-center justify-center gap-0.5 text-[11px] ${
              page === "home" ? "text-gold" : "text-muted"
            }`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href={shopPageHref(page)}
            aria-current={page === "shop" ? "page" : undefined}
            className={`flex h-full flex-col items-center justify-center gap-0.5 text-[11px] ${
              page === "shop" ? "text-gold" : "text-muted"
            }`}
          >
            Shop
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={onCart}
            className="flex h-full w-full flex-col items-center justify-center gap-0.5 text-[11px] text-muted"
          >
            Cart
            {cartCount ? (
              <span className="rounded-full bg-gold px-1.5 text-[10px] font-semibold text-paper">
                {cartCount}
              </span>
            ) : null}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onAccount}
            className="flex h-full w-full flex-col items-center justify-center gap-0.5 text-[11px] text-muted"
          >
            Account
          </button>
        </li>
      </ul>
    </nav>
  );
}
