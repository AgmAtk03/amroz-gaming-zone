import { trustBadges } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="Trust" className="border-b border-line bg-paper-2/80">
      <ul className="chip-row mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-6">
        {trustBadges.map((badge) => (
          <li
            key={badge.title}
            className="min-w-[10.5rem] rounded-xl border border-line bg-panel px-3 py-2 sm:min-w-0"
          >
            <p className="text-xs font-semibold">{badge.title}</p>
            <p className="text-[11px] text-muted">{badge.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
