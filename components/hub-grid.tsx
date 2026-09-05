import { GameArt } from "@/components/game-art";
import { featuredHubs, hubsInCategory, type Hub } from "@/lib/catalog";
import { categoryDeliveryLabel, INSTANT_DELIVERY } from "@/lib/content";
import { payHref, type SitePage } from "@/lib/routes";

export function HubGrid({
  from = "home",
  compact = false,
  category,
  featured = false,
}: {
  from?: SitePage;
  compact?: boolean;
  category?: string | null;
  featured?: boolean;
}) {
  const list: readonly Hub[] = featured
    ? featuredHubs
    : category
      ? hubsInCategory(category)
      : featuredHubs;
  const delivery = categoryDeliveryLabel(category) ?? (featured || !category ? INSTANT_DELIVERY : null);

  return (
    <section id="topups" className={compact ? "py-4" : "py-6 sm:py-8"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">
              {delivery ?? (featured ? "Popular games" : "Games")}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              One card per game. Packs after you tap.
            </h2>
          </div>
          <p className="hidden text-xs text-muted sm:block">{list.length} games</p>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((hub, i) => (
            <li key={hub.id} className="hub-card" style={{ animationDelay: `${i * 35}ms` }}>
              <a
                href={payHref(from, { hub: hub.id })}
                className="photo-card press-card flex flex-col overflow-hidden"
              >
                <div className="photo-shimmer relative aspect-square overflow-hidden">
                  <GameArt src={hub.photo} name={hub.name} short={hub.short} alt={hub.name} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight">{hub.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{hub.kind}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
