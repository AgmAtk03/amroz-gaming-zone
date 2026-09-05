import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isStaticExport =
  isGithubPages || process.env.STATIC_EXPORT === "1";

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
};

export default nextConfig;
