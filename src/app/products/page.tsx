import { Suspense } from "react";
import { Catalog, CatalogLoading } from "@/components/catalog";
import { PageIntro, ContactBanner } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Products",
  "Browse F7 Developer's original games, eight Android apps, and web projects. Find useful tools for work, creativity, learning, and everyday life.",
  "/products/",
);
export default function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ideas, out in the world"
        title="The things we make"
        text="Games for your imagination. Apps for your everyday. Web projects for your curiosity."
      />
      <Suspense fallback={<CatalogLoading />}>
        <Catalog mode="products" />
      </Suspense>
      <ContactBanner />
    </>
  );
}
