"use client";

import { createContext, useContext } from "react";
import { isStaticPages, type SitePage } from "@/lib/routes";

export const SitePageContext = createContext<SitePage>("home");

export function useSitePage() {
  return useContext(SitePageContext);
}

/** Root-absolute public files become same-tree relative URLs on the static export. */
export function publicHref(src: string, from: SitePage = "home") {
  if (!src.startsWith("/")) return src;
  if (!isStaticPages) return src;
  const rest = src.replace(/^\//, "");
  if (from === "home") return `./${rest}`;
  if (from === "shop" || from === "pay") return `../${rest}`;
  return `../../${rest}`;
}

export function detectSitePage(pathname = window.location.pathname): SitePage {
  const path = pathname.replace(/\/index\.html$/, "/");
  if (path.includes("/pay/success")) return "success";
  if (path.includes("/pay")) return "pay";
  if (path.includes("/shop")) return "shop";
  return "home";
}
