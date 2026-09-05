"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AccountDrawer } from "@/components/account-drawer";
import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import type { SitePage } from "@/lib/routes";
import { SitePageContext } from "@/lib/site-page";

export function AppShell({
  page = "home",
  children,
}: {
  page?: SitePage;
  children: ReactNode;
}) {
  const [panel, setPanel] = useState<"cart" | "account" | null>(null);

  return (
    <SitePageContext.Provider value={page}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-gold focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="flex min-h-full flex-1 flex-col has-tabbar">
        <div className="sticky top-0 z-50">
          <Header
            page={page}
            sticky={false}
            onOpenAccount={() => setPanel("account")}
            onOpenCart={() => setPanel("cart")}
          />
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter page={page} />
      </div>
      <AccountDrawer page={page} panel={panel} onClose={() => setPanel(null)} />
      <BottomNav
        page={page}
        onCart={() => setPanel((p) => (p === "cart" ? null : "cart"))}
        onAccount={() => setPanel((p) => (p === "account" ? null : "account"))}
      />
    </SitePageContext.Provider>
  );
}
