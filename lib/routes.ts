export const isStaticPages = process.env.NEXT_PUBLIC_STATIC_PAGES === "1";

export type SitePage = "home" | "shop" | "checkout" | "success";

const pagePath = {
  home: "/",
  shop: "/shop",
  checkout: "/checkout",
  success: "/checkout/success",
} as const;

const staticFile = {
  home: "index.html",
  shop: "shop/index.html",
  checkout: "checkout/index.html",
  success: "checkout/success/index.html",
} as const;

const staticDepth: Record<SitePage, number> = {
  home: 0,
  shop: 1,
  checkout: 1,
  success: 2,
};

function staticHref(from: SitePage, to: SitePage, query = "") {
  const prefix = staticDepth[from] === 0 ? "./" : "../".repeat(staticDepth[from]);
  return `${prefix}${staticFile[to]}${query}`;
}

function appHref(to: SitePage, query = "") {
  return `${pagePath[to]}${query}`;
}

function href(from: SitePage, to: SitePage, query = "") {
  return isStaticPages ? staticHref(from, to, query) : appHref(to, query);
}

export function homeHref(from: SitePage = "home") {
  return href(from, "home");
}

export function shopPageHref(from: SitePage = "home") {
  return href(from, "shop");
}

export function checkoutHref(from: SitePage, hub?: string) {
  const query = hub ? `?hub=${encodeURIComponent(hub)}` : "";
  return href(from, "checkout", query);
}

export function successHref(from: SitePage, query: string) {
  return href(from, "success", query ? `?${query}` : "");
}

export function navHref(hash: string, from: SitePage) {
  if (hash === "shop") {
    if (from === "home") return "#shop";
    return shopPageHref(from);
  }
  if (from === "home") return `#${hash}`;
  if (!isStaticPages) return `/#${hash}`;
  return `../index.html#${hash}`;
}
