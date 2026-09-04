import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { HubPacks } from "@/components/hub-packs";
import { SiteFooter } from "@/components/site-footer";
import { digitalHubs, hubBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return digitalHubs.map((hub) => ({ hub: hub.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hub: string }>;
}): Promise<Metadata> {
  const { hub: slug } = await params;
  const hub = hubBySlug(slug);
  if (!hub) return { title: "Hub | Amroz" };
  return {
    title: `${hub.name} | Amroz DEMO top-up`,
    description: `${hub.blurb} Sample NPR. Not live pay.`,
  };
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ hub: string }>;
}) {
  const { hub: slug } = await params;
  const hub = hubBySlug(slug);
  if (!hub) notFound();

  return (
    <>
      <Header page="hub" />
      <main className="flex-1">
        <HubPacks hub={hub} />
      </main>
      <SiteFooter page="hub" />
    </>
  );
}
