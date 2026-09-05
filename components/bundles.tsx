import { Photo } from "@/components/photo";
import { bundles, getHub, getPack, getPhysical } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function BundlesRow({ from = "home" }: { from?: SitePage }) {
  return (
    <section id="bundles" className="py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Bundles</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Dual take</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Digital pack + physical SKU in one mock pay. Gear still same-day from the shelf.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {bundles.map((bundle) => {
            const hub = getHub(bundle.hubId);
            const pack = hub ? getPack(hub, bundle.packId) : undefined;
            const item = getPhysical(bundle.sku);
            return (
              <li key={bundle.id}>
                <article className="photo-card overflow-hidden rounded-2xl">
                  <div className="grid grid-cols-2">
                    <div className="h-32">
                      <Photo src={hub?.photo ?? bundle.photo} alt="" />
                    </div>
                    <div className="h-32">
                      <Photo src={item?.photo ?? bundle.photo} alt="" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{bundle.name}</h3>
                    <p className="mt-1 text-sm text-muted">{bundle.blurb}</p>
                    <p className="mt-2 text-sm">
                      NPR {bundle.price}
                      <span className="ml-2 text-xs text-muted">
                        {pack?.label} + {item?.name}
                      </span>
                    </p>
                    <a
                      href={payHref(from, { bundle: bundle.id, hub: bundle.hubId, pack: bundle.packId, sku: bundle.sku })}
                      className="thumb-btn mt-3 inline-flex w-full items-center justify-center rounded-xl bg-gold text-sm font-semibold text-paper"
                    >
                      Bundle · mock pay
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
