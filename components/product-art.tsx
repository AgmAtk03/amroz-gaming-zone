import type { PhysicalKind } from "@/lib/catalog";

export function ProductArt({ group }: { group: PhysicalKind }) {
  const bg =
    group === "fantech"
      ? "#3f4f3a"
      : group === "ps5"
        ? "#3a342c"
        : group === "controller"
          ? "#2f5c59"
          : "#8a7349";

  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
      <rect width="120" height="80" rx="14" fill={bg} />
      {group === "fantech" ? (
        <>
          <rect x="38" y="22" width="44" height="28" rx="12" fill="#f3eee4" />
          <circle cx="52" cy="36" r="5" fill="#1e1a16" />
          <path d="M68 28v16" stroke="#1e1a16" strokeWidth="2" />
        </>
      ) : group === "ps5" ? (
        <>
          <rect x="28" y="26" width="64" height="30" rx="14" fill="#f3eee4" />
          <circle cx="44" cy="41" r="6" fill="#1e1a16" />
          <circle cx="76" cy="41" r="6" fill="#1e1a16" />
        </>
      ) : group === "controller" ? (
        <>
          <path d="M30 44c0-10 10-16 30-16s30 6 30 16-8 16-30 16-30-6-30-16z" fill="#f3eee4" />
          <circle cx="48" cy="42" r="4" fill="#1e1a16" />
          <circle cx="72" cy="42" r="4" fill="#1e1a16" />
        </>
      ) : (
        <>
          <rect x="44" y="18" width="32" height="46" rx="6" fill="#f3eee4" />
          <rect x="50" y="24" width="20" height="28" rx="2" fill="#1e1a16" opacity="0.35" />
        </>
      )}
    </svg>
  );
}
