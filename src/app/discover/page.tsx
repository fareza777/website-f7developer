import { getDiscoverEditions } from "@/lib/discover";
import { pageMetadata } from "@/lib/seo";
import { EditionView } from "@/components/discover/edition";

export const metadata = pageMetadata(
  "F7 Discover — Indie Games & Android Apps",
  "Discover independent games and useful Android apps from around the world, with original F7 insights, verified sources, and official links.",
  "/discover/",
);
export default function DiscoverPage() {
  const editions = getDiscoverEditions();
  return editions[0] ? (
    <EditionView
      edition={editions[0]}
      dates={editions.map((edition) => edition.date)}
      latest
    />
  ) : (
    <section className="container section">
      <h1>F7 Discover</h1>
      <p>Our first verified edition is on its way.</p>
    </section>
  );
}
