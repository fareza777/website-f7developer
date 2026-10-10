import { Suspense } from "react";
import { Catalog, CatalogLoading } from "@/components/catalog";
import { PageIntro, ContactBanner } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Updates",
  "The latest game updates and product releases from F7 Developer. Read what's changed in Shardfall, Aeonfall, Shadow Depths, and AI Work Studio.",
  "/updates/",
);
export default function UpdatesPage() {
  return (
    <>
      <PageIntro
        eyebrow="From the studio"
        title="Always building"
        text="The latest releases, improvements, and little things that make our products better."
      />
      <Suspense fallback={<CatalogLoading />}>
        <Catalog mode="updates" />
      </Suspense>
      <ContactBanner />
    </>
  );
}
