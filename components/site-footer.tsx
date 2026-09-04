import { DemoBadge, Wordmark } from "@/components/brand";
import { SocialLinks } from "@/components/social";
import { site, whatsAppHref } from "@/lib/content";
import { homeHref, type SitePage } from "@/lib/routes";

export function SiteFooter({ page = "home" }: { page?: SitePage }) {
  return (
    <footer id="contact" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Wordmark href={homeHref(page)} inverse />
          <p className="mt-3 max-w-sm text-sm text-paper/70">
            Physical store · {site.addressLine}
          </p>
          <p className="mt-1 text-sm text-paper/70">
            Same-day pickup or drop-off, usually within two hours.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={whatsAppHref("Hi Amroz — I need a top-up or same-day gear.")}
            className="thumb-btn inline-flex items-center justify-center rounded-full bg-paper px-5 text-sm font-semibold text-ink"
          >
            Contact on WhatsApp
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="thumb-btn inline-flex items-center justify-center rounded-full border border-paper/30 px-5 text-sm font-semibold text-paper"
          >
            Call {site.phoneDisplay}
          </a>
          <p className="text-xs text-paper/50">
            Demo number. <DemoBadge className="ml-1 border-paper/20 bg-ink text-paper/70" />
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Hours</p>
          <dl className="mt-2 space-y-1 text-sm text-paper/70">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <SocialLinks className="mt-4 [&_a]:border-paper/25 [&_a]:text-paper/70" />
        </div>
      </div>
      <p className="border-t border-paper/10 px-4 py-4 text-center text-xs text-paper/45">
        © {new Date().getFullYear()} {site.name}. Gaming service — not a booth-booking venue.
      </p>
    </footer>
  );
}
