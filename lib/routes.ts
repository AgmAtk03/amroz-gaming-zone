export const isStaticPages = process.env.NEXT_PUBLIC_STATIC_PAGES === "1";

export type SitePage = "home" | "shop" | "hub" | "pay" | "done";

function ups(from: SitePage) {
  if (from === "home") return "";
  if (from === "shop" || from === "pay") return "../";
  return "../../";
}

function filePath(path: string) {
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  return clean ? `${clean}/index.html` : "index.html";
}

export function href(path: string, from: SitePage = "home") {
  if (!isStaticPages) return path || "/";
  return `${ups(from)}${filePath(path)}`;
}

export function homeHref(from: SitePage = "home") {
  return href("/", from);
}

export function shopPageHref(from: SitePage = "home") {
  return href("/shop", from);
}

export function hubHref(slug: string, from: SitePage = "home") {
  return href(`/shop/${slug}`, from);
}

export function payHref(sku: string, from: SitePage = "home") {
  const base = href("/pay", from);
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}sku=${encodeURIComponent(sku)}`;
}

export function payDoneHref(from: SitePage = "pay") {
  return href("/pay/done", from);
}

export function navHref(hash: string, from: SitePage) {
  if (from === "home") {
    if (hash === "shop") return "#shop";
    return `#${hash}`;
  }
  if (!isStaticPages) {
    if (hash === "shop") return "/shop";
    return `/#${hash}`;
  }
  if (hash === "shop") return `${ups(from)}shop/index.html`;
  return `${ups(from)}index.html#${hash}`;
}
