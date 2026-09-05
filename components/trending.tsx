import { InstantBadge } from "@/components/brand";
import { Photo } from "@/components/photo";
import { getHub, getPack, homeTrending } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function TrendingStrip({ from = "home" }: { from?: SitePage }) {
  return (
    <section id="trending" className="py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-instant uppercase">Popular packs</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Selling this week</h2>
        <ul className="shelf-scroll mt-4 flex snap-x gap-3 overflow-x-auto pb-1">
          {homeTrending.map((row) => {
            const hub = getHub(row.hubId);
            const pack = hub ? getPack(hub, row.packId) : undefined;
            if (!hub || !pack) return null;
            return (
              <li key={pack.id} className="w-[11.5rem] shrink-0 snap-start">
                <a
                  href={payHref(from, { hub: hub.id, pack: pack.id })}
                  className="photo-card flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative h-24">
                    <Photo src={hub.photo} alt="" />
                    <InstantBadge className="absolute top-2 left-2" />
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[11px] text-muted">{hub.name}</p>
                    <p className="mt-0.5 text-sm font-semibold leading-tight">{pack.label}</p>
                    <p className="mt-auto pt-2 text-sm text-gold">NPR {pack.price}</p>
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
