export const isStaticPages = process.env.NEXT_PUBLIC_STATIC_PAGES === "1";

export type SitePage = "home" | "shop";

export function homeHref(from: SitePage = "home") {
  if (!isStaticPages) return "/";
  return from === "shop" ? "../index.html" : "./index.html";
}

export function shopPageHref(from: SitePage = "home") {
  if (!isStaticPages) return "/shop";
  return from === "shop" ? "./index.html" : "./shop/index.html";
}

export function navHref(hash: string, from: SitePage) {
  if (hash === "shop") return "#shop";
  if (from === "home") return `#${hash}`;
  if (!isStaticPages) return `/#${hash}`;
  return `../index.html#${hash}`;
}
