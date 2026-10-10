import Link from "next/link";
import { getDiscoverEditions, discoverDate, editionPath } from "@/lib/discover";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRightIcon } from "@/components/icons";
import { DiscoverNav, DiscoverFootnote } from "@/components/discover/shared";

export const metadata = pageMetadata(
  "Discover Archive",
  "Explore every published F7 Discover edition by date. Independent games, useful Android apps, and original F7 insights.",
  "/discover/archive/",
);
export default function DiscoverArchivePage() {
  const editions = getDiscoverEditions();
  const months = [
    ...new Set(editions.map((edition) => edition.date.slice(0, 7))),
  ];
  return (
    <div className="discover-page">
      <DiscoverNav active="archive" />
      <section className="container discover-editorial-header">
        <span className="discover-kicker">CURIOSITY HAS A HISTORY</span>
        <h1>
          The archive<span>.</span>
        </h1>
        <p>
          Good discoveries don’t expire. Revisit every published edition, one
          day at a time.
        </p>
        <span>
          {editions.length} published{" "}
          {editions.length === 1 ? "edition" : "editions"}
        </span>
      </section>
      <div className="container discover-archive">
        {months.map((month) => (
          <section key={month}>
            <h2>
              {new Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(`${month}-01T00:00:00Z`))}
            </h2>
            <div>
              {editions
                .filter((edition) => edition.date.startsWith(month))
                .map((edition) => (
                  <Link
                    key={edition.date}
                    href={editionPath(edition.date)}
                    className="discover-archive-entry"
                  >
                    <div className="discover-archive-day">
                      <strong>{edition.date.slice(-2)}</strong>
                      <span>
                        {new Intl.DateTimeFormat("en-GB", {
                          weekday: "short",
                          timeZone: "UTC",
                        }).format(new Date(edition.date))}
                      </span>
                    </div>
                    <div>
                      <time dateTime={edition.date}>
                        {discoverDate(edition.date)}
                      </time>
                      <h3>{edition.title}</h3>
                      <p>
                        {
                          edition.entries.filter(
                            (entry) => entry.kind === "game",
                          ).length
                        }{" "}
                        games ·{" "}
                        {
                          edition.entries.filter(
                            (entry) => entry.kind === "app",
                          ).length
                        }{" "}
                        Android apps
                      </p>
                    </div>
                    <ArrowUpRightIcon size={25} />
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
      <DiscoverFootnote />
    </div>
  );
}
