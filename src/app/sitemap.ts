import type { MetadataRoute } from "next";
import { products, productPath, updates } from "@/lib/data";
import { siteOrigin } from "@/lib/seo";
import {
  getDiscoverEditions,
  discoveryPath,
  editionPath,
} from "@/lib/discover";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  const pages = [
    "/",
    "/games/",
    "/products/",
    "/studio/",
    "/updates/",
    "/contact/",
    "/privacy/",
    "/discover/",
    "/discover/archive/",
    "/discover/about/",
  ];
  return [
    ...pages.map((path) => ({ url: new URL(path, siteOrigin).href })),
    ...products.map((product) => ({
      url: new URL(productPath(product), siteOrigin).href,
      lastModified: product.updated,
    })),
    ...updates.map((update) => ({
      url: new URL(`/updates/${update.slug}/`, siteOrigin).href,
      lastModified: update.date,
    })),
    ...getDiscoverEditions().flatMap((edition) => [
      {
        url: new URL(editionPath(edition.date), siteOrigin).href,
        lastModified: edition.date,
      },
      ...edition.entries.map((entry) => ({
        url: new URL(discoveryPath(entry), siteOrigin).href,
        lastModified: edition.date,
      })),
    ]),
  ];
}
