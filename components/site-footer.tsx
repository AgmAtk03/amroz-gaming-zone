import { Wordmark } from "@/components/brand";
import { site, whatsAppHref } from "@/lib/content";
import { homeHref, type SitePage } from "@/lib/routes";

export function SiteFooter({ page = "home" }: { page?: SitePage }) {
  return (
    <footer id="contact" className="border-t border-line bg-paper-2">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Wordmark href={homeHref(page)} />
          <p className="mt-3 max-w-sm text-sm text-muted">{site.addressLine}</p>
          <p className="mt-1 text-sm text-muted">Instant Delivery top-ups. Same-day gear.</p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={whatsAppHref("Hi Amroz — I need a top-up or same-day gear.")}
            className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
          >
            WhatsApp the shop
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="thumb-btn inline-flex items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Pepsicola, Ward 32, Kathmandu.
      </p>
    </footer>
  );
}
