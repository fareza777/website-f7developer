"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import {
  AndroidLogoIcon,
  ArrowUpRightIcon,
  GameControllerIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  XIcon,
} from "@/components/icons";
import type { Discovery } from "@/lib/discover";
import { filterDiscover } from "@/lib/discover-core.mjs";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("f7:discover-filter", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("f7:discover-filter", callback);
  };
}
const snapshot = () => window.location.search;
const serverSnapshot = () => "";
function RouteSync() {
  const params = useSearchParams();
  useEffect(() => {
    window.dispatchEvent(new Event("f7:discover-filter"));
  }, [params]);
  return null;
}

function DiscoveryCard({ entry, index }: { entry: Discovery; index: number }) {
  return (
    <article
      className={`discovery-card discovery-card-${entry.kind}`}
      data-kind={entry.kind}
    >
      <Link
        href={`/discover/products/${entry.slug}/`}
        className="discovery-card-link"
        aria-label={`Discover ${entry.name}`}
      >
        <div
          className={`discovery-art${entry.asset.presentation === "contain" ? " discovery-art-contain" : ""}`}
        >
          <Image
            src={entry.asset.path}
            alt={entry.asset.alt}
            width={720}
            height={450}
            sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
            className="discovery-art-image"
          />
          <span className="discovery-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="discovery-art-arrow">
            <ArrowUpRightIcon size={22} />
          </span>
        </div>
        <div className="discovery-card-copy">
          <div className="discovery-meta">
            <span>
              {entry.kind === "game" ? (
                <GameControllerIcon size={17} />
              ) : (
                <AndroidLogoIcon size={17} />
              )}
              {entry.category}
            </span>
            <span>
              {entry.price.model === "unknown"
                ? "Check price"
                : entry.price.label}
            </span>
          </div>
          <h3>{entry.name}</h3>
          <p className="discovery-developer">By {entry.developer}</p>
          <p className="discovery-summary">{entry.summary}</p>
          <div className="discovery-insight">
            <SparkleIcon size={18} />
            <p>
              <span>F7 INSIGHT</span>
              {entry.insight}
            </p>
          </div>
          <div className="discovery-card-bottom">
            <span
              className={
                entry.release.kind === "new-release" ? "discovery-new" : ""
              }
            >
              {entry.release.kind === "new-release"
                ? "New release"
                : "Newly discovered"}
            </span>
            <span>
              {entry.kind === "app"
                ? entry.distribution.some(
                    (link) => link.label === "Google Play",
                  )
                  ? "Google Play"
                  : entry.distribution[0].label
                : entry.platforms.slice(0, 2).join(" · ")}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function DiscoverCatalog({ entries }: { entries: Discovery[] }) {
  const search = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const params = new URLSearchParams(search);
  const rawKind = params.get("kind") || "all";
  const kind = ["game", "app"].includes(rawKind) ? rawKind : "all";
  const categories = [
    ...new Set(
      entries
        .filter((entry) => kind === "all" || entry.kind === kind)
        .map((entry) => entry.category),
    ),
  ].sort();
  const rawCategory = params.get("category") || "all";
  const category = categories.includes(rawCategory) ? rawCategory : "all";
  const query = (params.get("q") || "").slice(0, 160);
  const visible = filterDiscover(entries, {
    kind,
    category,
    query,
  }) as Discovery[];
  const filtered = kind !== "all" || category !== "all" || query !== "";
  function update(
    changes: { kind?: string; category?: string; q?: string },
    reset = false,
  ) {
    const next = reset
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value && value !== "all") next.set(key, value);
      else next.delete(key);
    }
    const suffix = next.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${suffix ? `?${suffix}` : ""}${window.location.hash}`,
    );
    window.dispatchEvent(new Event("f7:discover-filter"));
  }
  return (
    <div className="discover-catalog" id="daily-picks">
      <Suspense fallback={null}>
        <RouteSync />
      </Suspense>
      <div className="discover-section-heading">
        <div>
          <span className="discover-kicker">THE DAILY SELECTION</span>
          <h2>
            Daily Picks<span>.</span>
          </h2>
        </div>
        <p>
          Made by independents.
          <br />
          Found for the curious.
        </p>
      </div>
      <div className="discover-toolbar">
        <div
          className="discover-kind"
          role="group"
          aria-label="Filter discoveries"
        >
          {(
            [
              ["all", "All picks"],
              ["game", "Games"],
              ["app", "Apps"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={kind === value}
              onClick={() => update({ kind: value, category: "all" })}
            >
              {value === "game" && <GameControllerIcon size={19} />}
              {value === "app" && <AndroidLogoIcon size={19} />}
              {label}
              <span>
                {value === "all"
                  ? entries.length
                  : entries.filter((entry) => entry.kind === value).length}
              </span>
            </button>
          ))}
        </div>
        <div className="discover-search">
          <MagnifyingGlassIcon size={21} aria-hidden="true" />
          <label htmlFor="discover-search" className="sr-only">
            Search this edition
          </label>
          <input
            type="search"
            id="discover-search"
            placeholder="Find your next discovery…"
            value={query}
            maxLength={160}
            onChange={(event) => update({ q: event.target.value })}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => update({ q: "" })}>
              <XIcon size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="discover-filter-row">
        <div className="discover-category">
          <label htmlFor="discover-category">Category</label>
          <select
            id="discover-category"
            value={category}
            onChange={(event) => update({ category: event.target.value })}
          >
            <option value="all">All categories</option>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <p role="status" aria-live="polite">
          {visible.length} of {entries.length} picks{filtered && " match"}
        </p>
        {filtered && (
          <button className="discover-clear" onClick={() => update({}, true)}>
            Clear filters <XIcon size={16} />
          </button>
        )}
      </div>
      <noscript>
        <p className="discover-noscript">
          All picks are available below. Enable JavaScript to use search and
          filters.
        </p>
      </noscript>
      {visible.length ? (
        <div className="discover-grid">
          {visible.map((entry) => (
            <DiscoveryCard
              key={entry.slug}
              entry={entry}
              index={entries.findIndex(
                (candidate) => candidate.slug === entry.slug,
              )}
            />
          ))}
        </div>
      ) : (
        <div className="discover-empty">
          <MagnifyingGlassIcon size={36} />
          <h3>No discoveries match yet.</h3>
          <p>Try another keyword or give all picks a look.</p>
          <button
            className="button button-primary"
            onClick={() => update({}, true)}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
