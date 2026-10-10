import { Suspense } from "react";
import { Catalog, CatalogLoading } from "@/components/catalog";
import { PageIntro, ContactBanner } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Games",
  "Explore five original Android games from F7 Developer, from dark fantasy card strategy to roguelike and puzzle RPG adventures.",
  "/games/",
);
export default function GamesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Made to be played"
        title="Find your next world"
        text="Card battles. Dungeon depths. One more run. Discover the games we love to make."
      />
      <Suspense fallback={<CatalogLoading />}>
        <Catalog mode="games" />
      </Suspense>
      <ContactBanner />
    </>
  );
}
