export const isStaticPages = process.env.NEXT_PUBLIC_STATIC_PAGES === "1";

export type SitePage = "home" | "shop" | "pay" | "success";

const pagePath = {
  home: "/",
  shop: "/shop",
  pay: "/pay",
  success: "/pay/success",
} as const;

const staticFile = {
  home: "index.html",
  shop: "shop/index.html",
  pay: "pay/index.html",
  success: "pay/success/index.html",
} as const;

const staticDepth: Record<SitePage, number> = {
  home: 0,
  shop: 1,
  pay: 1,
  success: 2,
};

function staticHref(from: SitePage, to: SitePage, query = "") {
  const prefix = staticDepth[from] === 0 ? "./" : "../".repeat(staticDepth[from]);
  return `${prefix}${staticFile[to]}${query}`;
}

function href(from: SitePage, to: SitePage, query = "") {
  return isStaticPages ? staticHref(from, to, query) : `${pagePath[to]}${query}`;
}

export function homeHref(from: SitePage = "home") {
  return href(from, "home");
}

export function shopPageHref(from: SitePage = "home") {
  return href(from, "shop");
}

export function payHref(
  from: SitePage,
  query?: { hub?: string; sku?: string; pack?: string },
) {
  const params = new URLSearchParams();
  if (query?.hub) params.set("hub", query.hub);
  if (query?.sku) params.set("sku", query.sku);
  if (query?.pack) params.set("pack", query.pack);
  const q = params.toString();
  return href(from, "pay", q ? `?${q}` : "");
}

export function successHref(from: SitePage, query: string) {
  return href(from, "success", query ? `?${query}` : "");
}

export function navHref(hash: string, from: SitePage) {
  if (hash === "shop") return shopPageHref(from);
  if (from === "home") return `#${hash}`;
  if (!isStaticPages) return `/#${hash}`;
  return `../index.html#${hash}`;
}
