import { InstantBadge } from "@/components/brand";
import { Photo } from "@/components/photo";
import { hubs } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function HubGrid({
  from = "home",
  compact = false,
}: {
  from?: SitePage;
  compact?: boolean;
}) {
  return (
    <section id="topups" className={compact ? "py-4" : "py-6 sm:py-8"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-instant uppercase">
              Instant Delivery
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Game top-ups</h2>
          </div>
          <p className="hidden text-xs text-muted sm:block">NPR · eSewa & Khalti</p>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {hubs.map((hub) => {
            const fromPack = hub.packs.reduce((cheapest, pack) => {
              const n = Number(pack.price.replace(/,/g, ""));
              const c = Number(cheapest.price.replace(/,/g, ""));
              return n < c ? pack : cheapest;
            });
            return (
              <li key={hub.id}>
                <a
                  href={payHref(from, { hub: hub.id })}
                  className="photo-card flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Photo src={hub.photo} alt={`${hub.name} top-up`} />
                    <InstantBadge className="absolute top-2 left-2" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold leading-tight">{hub.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{hub.kind}</p>
                    <p className="mt-2 text-sm font-semibold text-gold">
                      from NPR {fromPack.price}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
