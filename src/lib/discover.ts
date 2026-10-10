import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

export type Discovery = {
  slug: string;
  kind: "game" | "app";
  name: string;
  developer: string;
  category: string;
  platforms: string[];
  price: {
    model: "free" | "paid" | "freemium" | "unknown";
    label: string;
    sourceUrl: string;
    checkedAt: string;
  };
  summary: string;
  features: string[];
  insight: string;
  officialUrl: string;
  discoverySource: { name: string; url: string };
  distribution: { label: string; url: string }[];
  release: {
    kind: "newly-discovered" | "new-release";
    date: string | null;
    evidenceUrl: string | null;
  };
  identity: {
    canonicalUrl: string;
    androidPackageId?: string;
    githubRepo?: string;
  };
  asset: {
    path: string;
    sourceUrl: string;
    license: string;
    licenseUrl: string;
    attribution: string;
    alt: string;
    presentation?: "cover" | "contain";
    noticePath?: string;
  };
  verification: {
    status: "verified";
    verifiedAt: string;
    sources: {
      url: string;
      label: string;
      checks: string[];
      accessedAt: string;
    }[];
  };
};
export type DiscoverEdition = {
  date: string;
  title: string;
  intro: string;
  publishedAt: string;
  entries: Discovery[];
};

// This module is imported only by server components and static route generators.
// The review queue is deliberately never read by the website.
export const getDiscoverEditions = cache((): DiscoverEdition[] => {
  const directory = path.join(process.cwd(), "content/discover/editions");
  return readdirSync(directory)
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .map(
      (file) =>
        JSON.parse(
          readFileSync(path.join(directory, file), "utf8"),
        ) as DiscoverEdition,
    )
    .sort((a, b) => b.date.localeCompare(a.date));
});
export const getLatestEdition = () => getDiscoverEditions()[0];
export const findDiscovery = (slug: string) => {
  for (const edition of getDiscoverEditions()) {
    const entry = edition.entries.find((candidate) => candidate.slug === slug);
    if (entry) return { entry, date: edition.date };
  }
  return undefined;
};
export const discoveryPath = (entry: Pick<Discovery, "slug">) =>
  `/discover/products/${entry.slug}/`;
export const editionPath = (date: string) => `/discover/${date}/`;
export function discoverDate(date: string, short = false) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: short ? "short" : "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
