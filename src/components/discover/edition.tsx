import Image from "next/image";
import Link from "next/link";
import type { DiscoverEdition } from "@/lib/discover";
import { discoverDate, discoveryPath, editionPath } from "@/lib/discover";
import {
  AndroidLogoIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GameControllerIcon,
  RadarIcon,
} from "@/components/icons";
import { DiscoverCatalog } from "./catalog";
import { DiscoverNav, DiscoverFootnote } from "./shared";

export function EditionView({
  edition,
  dates,
  latest = false,
}: {
  edition: DiscoverEdition;
  dates: string[];
  latest?: boolean;
}) {
  const lead =
    edition.entries.find((entry) => entry.kind === "game") ||
    edition.entries[0];
  const app = edition.entries.find((entry) => entry.kind === "app");
  const games = edition.entries.filter((entry) => entry.kind === "game").length;
  const apps = edition.entries.length - games;
  const index = dates.indexOf(edition.date);
  return (
    <div className="discover-page">
      <DiscoverNav active={latest ? "latest" : "archive"} />
      <section
        className="discover-hero container"
        aria-labelledby="discover-title"
      >
        <div className="discover-hero-copy">
          <div className="discover-edition-label">
            <span className="discover-live-dot" />
            {latest ? "LATEST EDITION" : "FROM THE ARCHIVE"}
            <span>{discoverDate(edition.date, true)}</span>
          </div>
          <h1 id="discover-title">
            F7 Discover<span>.</span>
          </h1>
          <p className="discover-tagline">
            Independent ideas.
            <br />
            <em>Extraordinary finds.</em>
          </p>
          <p className="discover-intro">
            Your daily detour into indie games and Android apps from creators
            around the world. Small teams. Fresh thinking. Worth your time.
          </p>
          <div className="discover-hero-actions">
            <a href="#daily-picks" className="button button-primary">
              Explore the picks <ArrowRightIcon size={19} />
            </a>
            <Link href="/discover/archive/" className="text-link">
              Browse archive <ArrowUpRightIcon size={18} />
            </Link>
          </div>
          <div className="discover-daily-count">
            <span>
              <GameControllerIcon size={21} />
              <strong>{String(games).padStart(2, "0")}</strong> Indie games
            </span>
            <span>
              <AndroidLogoIcon size={21} />
              <strong>{String(apps).padStart(2, "0")}</strong> Android apps
            </span>
          </div>
        </div>
        <div className="discover-hero-visual">
          <div className="discover-visual-top">
            <RadarIcon size={19} />
            <span>A SIGNAL WORTH FOLLOWING</span>
            <span>F7 / {String(dates.length - index).padStart(3, "0")}</span>
          </div>
          <Link
            href={discoveryPath(lead)}
            className="discover-hero-feature"
            aria-label={`Featured discovery: ${lead.name}`}
          >
            <Image
              src={lead.asset.path}
              alt={lead.asset.alt}
              fill
              priority
              sizes="(max-width: 800px) 90vw, 45vw"
            />
            <div className="discover-feature-shade" />
            <span className="discover-feature-label">IN THE SPOTLIGHT</span>
            <div className="discover-feature-title">
              <span>
                {lead.category} ·{" "}
                {lead.price.model === "unknown"
                  ? "Check price"
                  : lead.price.label}
              </span>
              <h2>{lead.name}</h2>
              <p>Meet your next obsession.</p>
            </div>
            <ArrowUpRightIcon size={28} className="discover-feature-arrow" />
          </Link>
          {app && (
            <Link href={discoveryPath(app)} className="discover-app-feature">
              <Image
                src={app.asset.path}
                alt={app.asset.alt}
                width={64}
                height={64}
              />
              <div>
                <span>AND SOMETHING FOR YOUR EVERYDAY</span>
                <strong>{app.name}</strong>
                <p>{app.category} · Android</p>
              </div>
              <ArrowUpRightIcon size={24} />
            </Link>
          )}
        </div>
      </section>
      <div className="discover-edition-strip">
        <div className="container">
          <span>
            <RadarIcon size={18} /> Curiosity, with a little quality control.
          </span>
          <p>
            Original insights <i /> Verified sources <i /> Official links
          </p>
        </div>
      </div>
      <section
        className="container discover-selection"
        aria-label="Daily discoveries"
      >
        <div className="discover-date-line">
          <p>
            EDITION /{" "}
            <time dateTime={edition.date}>{discoverDate(edition.date)}</time>
          </p>
          <Link href="/discover/about/">
            How these picks are checked <ArrowUpRightIcon size={16} />
          </Link>
        </div>
        {(games < 7 || apps < 7) && (
          <p className="discover-partial">
            A smaller edition, selected with care. Our daily aim is 7 games + 7
            apps; only verified discoveries make the cut.
          </p>
        )}
        <DiscoverCatalog entries={edition.entries} />
        <nav
          className="discover-edition-pagination"
          aria-label="Edition navigation"
        >
          <div>
            {dates[index + 1] && (
              <Link href={editionPath(dates[index + 1])}>
                ← Previous edition{" "}
                <span>{discoverDate(dates[index + 1], true)}</span>
              </Link>
            )}
          </div>
          <Link href="/discover/archive/">
            All editions <ArrowUpRightIcon size={18} />
          </Link>
          <div>
            {dates[index - 1] && (
              <Link href={editionPath(dates[index - 1])}>
                Next edition →{" "}
                <span>{discoverDate(dates[index - 1], true)}</span>
              </Link>
            )}
          </div>
        </nav>
      </section>
      <DiscoverFootnote />
    </div>
  );
}
