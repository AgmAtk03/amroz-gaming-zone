import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const staticCdn = process.env.STATIC_CDN;
const isStaticExport =
  isGithubPages || Boolean(staticCdn) || process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  ...(isGithubPages
    ? {
        basePath: "/amroz-gaming-zone",
        assetPrefix: "/amroz-gaming-zone",
      }
    : {}),
  // STATIC_CDN is required for githack: host-root /_next 404s under
  // /<owner>/<repo>/<sha>/. Set at build time so Turbopack's chunk graph
  // and getAssetPrefix() stay in sync — do not rewrite /_next after export.
  ...(staticCdn
    ? {
        assetPrefix: staticCdn,
      }
    : {}),
};

export default nextConfig;
