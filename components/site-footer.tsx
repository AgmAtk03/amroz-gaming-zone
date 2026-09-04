import { DemoBadge, Wordmark } from "@/components/brand";
import { SocialLinks } from "@/components/social";
import { site } from "@/lib/content";
import { homeHref, type SitePage } from "@/lib/routes";

export function SiteFooter({ page = "home" }: { page?: SitePage }) {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Wordmark href={homeHref(page)} />
          <p className="mt-3 max-w-sm text-sm text-muted">
            PlayStation club at Pepsicola / football ground. Demo site — not
            affiliated with other Kathmandu gaming shops.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Connect</p>
          <SocialLinks className="mt-3" />
          <p className="mt-3 text-xs text-muted">
            Social URLs are placeholders. <DemoBadge className="ml-1" />
          </p>
        </div>
        <div className="text-sm text-muted">
          <p>{site.phoneDisplay}</p>
          <p>{site.email}</p>
          <p className="mt-4 text-xs">
            © {new Date().getFullYear()} {site.name}. Demo marketing site.
          </p>
        </div>
      </div>
    </footer>
  );
}
