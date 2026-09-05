import { catalogCategories } from "@/lib/catalog";
import { categoryDeliveryLabel } from "@/lib/content";
import { shopPageHref, type SitePage } from "@/lib/routes";

export function CategoryBrowse({ from = "home" }: { from?: SitePage }) {
  return (
    <section id="categories" className="py-5 sm:py-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-gold uppercase">Shop</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Pick a category</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {catalogCategories.map((cat) => {
            const delivery = categoryDeliveryLabel(cat.id);
            return (
              <li key={cat.id}>
                <a
                  href={shopPageHref(from, { cat: cat.id })}
                  className="photo-card press-card flex h-full flex-col rounded-2xl p-3"
                >
                  <p className="text-sm font-semibold">{cat.label}</p>
                  {delivery ? (
                    <p className="mt-1 text-[11px] font-semibold text-gold">{delivery}</p>
                  ) : null}
                  <p className={`text-[11px] text-muted ${delivery ? "mt-0.5" : "mt-1"}`}>
                    {cat.blurb}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
