"use client";

import { publicHref, useSitePage } from "@/lib/site-page";

export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const page = useSitePage();
  return (
    // Static githack export — next/image remote rewrite is unreliable on SHA CDNs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={publicHref(src, page)}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
