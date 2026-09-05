"use client";

import { useEffect, useState } from "react";

/**
 * Query string from the document URL, after mount.
 *
 * `useSearchParams` CSR-bails on static export (`BAILOUT_TO_CLIENT_SIDE_RENDERING`)
 * and then waits for an RSC refetch. raw.githack never serves that refetch, so
 * checkout stays on “Loading checkout…” and Account never hydrates.
 */
export function usePageSearchParams(): URLSearchParams | null {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const read = () => setParams(new URLSearchParams(window.location.search));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return params;
}
