import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  RadarIcon,
} from "@/components/icons";

export function DiscoverNav({
  active = "latest",
}: {
  active?: "latest" | "archive" | "about" | "detail";
}) {
  return (
    <nav className="discover-nav container" aria-label="Discover navigation">
      <Link className="discover-wordmark" href="/discover/">
        <RadarIcon size={21} /> F7 Discover<span>Curated by F7</span>
      </Link>
      <div>
        <Link
          href="/discover/"
          aria-current={active === "latest" ? "page" : undefined}
        >
          Daily picks
        </Link>
        <Link
          href="/discover/archive/"
          aria-current={active === "archive" ? "page" : undefined}
        >
          Archive
        </Link>
        <Link
          href="/discover/about/"
          aria-current={active === "about" ? "page" : undefined}
        >
          Our approach
        </Link>
      </div>
    </nav>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRightIcon size={17} aria-hidden="true" />
    </a>
  );
}

export function DiscoverFootnote() {
  return (
    <aside className="discover-footnote container">
      <div>
        <RadarIcon size={27} />
        <p>
          <strong>Independent minds. Shared spotlight.</strong>
          <br />
          These discoveries belong to their creators. F7 adds the perspective.
        </p>
      </div>
      <Link href="/discover/about/" className="text-link">
        How we curate <ArrowRightIcon size={18} />
      </Link>
    </aside>
  );
}
