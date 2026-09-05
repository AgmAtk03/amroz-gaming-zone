export function Wordmark({
  compact = false,
  href = "/",
  inverse = false,
}: {
  compact?: boolean;
  href?: string;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      aria-label="Amroz Gaming Zone home"
    >
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect x="1.5" y="1.5" width="33" height="33" rx="9" fill={inverse ? "#ffffff" : "#fa7b24"} />
        <path
          d="M9 26 L18 9 L27 26"
          stroke="#0f1419"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M13 18.5 H23" stroke="#0f1419" strokeWidth="2" />
      </svg>
      <span className="leading-tight">
        <span className={`block text-[15px] font-semibold ${inverse ? "text-paper" : "text-ink"}`}>
          Amroz
        </span>
        <span
          className={`block text-[11px] ${inverse ? "text-paper/70" : "text-muted"} ${compact ? "hidden sm:block" : ""}`}
        >
          Gaming Zone
        </span>
      </span>
    </a>
  );
}

export function InstantBadge({
  className = "",
  children = "Instant Delivery",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-instant px-2 py-0.5 text-[10px] font-semibold tracking-wide text-paper ${className}`}
    >
      {children}
    </span>
  );
}
