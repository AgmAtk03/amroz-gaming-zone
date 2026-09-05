import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@/components/app-shell";
import { HomeView } from "@/components/home-view";
import { PayFlow } from "@/components/pay-flow";
import { PaySuccess } from "@/components/pay-success";
import { ShopView } from "@/components/shop-view";
import { detectSitePage } from "@/lib/site-page";
import type { SitePage } from "@/lib/routes";

declare global {
  interface Window {
    amrozDemo?: { booted: true; page: SitePage; mode: "client" };
  }
}

function markBooted(page: SitePage) {
  document.documentElement.dataset.amrozHydrated = "1";
  window.amrozDemo = { booted: true, page, mode: "client" };
}

function App() {
  const page = detectSitePage();

  useEffect(() => {
    markBooted(page);
  }, [page]);

  if (page === "pay") {
    return (
      <AppShell page="pay">
        <PayFlow />
      </AppShell>
    );
  }
  if (page === "success") {
    return (
      <AppShell page="success">
        <PaySuccess />
      </AppShell>
    );
  }
  if (page === "shop") {
    return (
      <AppShell page="shop">
        <ShopView />
      </AppShell>
    );
  }
  return (
    <AppShell page="home">
      <HomeView />
    </AppShell>
  );
}

function mount() {
  const existing = document.getElementById("amroz-root");
  const root = existing ?? document.createElement("div");
  if (!existing) {
    root.id = "amroz-root";
    root.className = "flex min-h-full flex-1 flex-col";
    document.body.replaceChildren(root);
  } else {
    root.replaceChildren();
  }
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

mount();
