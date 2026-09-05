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

function staticHref(from: SitePage, to: SitePage, query = "") {
  const target = staticFile[to];
  if (from === "home") return target + query;
  if (from === "shop" || from === "pay") return `../${target}` + query;
  return `../../${target}` + query;
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

export type PayQuery = {
  hub?: string;
  sku?: string;
  pack?: string;
  sid?: string;
  reorder?: string;
  bundle?: string;
  oid?: string;
};

export function payHref(from: SitePage, query?: PayQuery) {
  const params = new URLSearchParams();
  if (query?.hub) params.set("hub", query.hub);
  if (query?.sku) params.set("sku", query.sku);
  if (query?.pack) params.set("pack", query.pack);
  if (query?.sid) params.set("sid", query.sid);
  if (query?.reorder) params.set("reorder", query.reorder);
  if (query?.bundle) params.set("bundle", query.bundle);
  if (query?.oid) params.set("oid", query.oid);
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
  return from === "success" ? `../../index.html#${hash}` : `../index.html#${hash}`;
}

export function reorderHref(
  from: SitePage,
  input: { hub: string; pack: string; sid: string; oid?: string },
) {
  return payHref(from, {
    hub: input.hub,
    pack: input.pack,
    sid: input.sid,
    oid: input.oid,
    reorder: "1",
  });
}
