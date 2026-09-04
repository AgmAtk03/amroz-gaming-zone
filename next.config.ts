import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const staticCdn = process.env.STATIC_CDN;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: "/amroz-gaming-zone",
        assetPrefix: "/amroz-gaming-zone",
      }
    : {}),
  ...(staticCdn
    ? {
        output: "export" as const,
        trailingSlash: true,
        assetPrefix: staticCdn,
      }
    : {}),
};

export default nextConfig;
