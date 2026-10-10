import type { MetadataRoute } from "next";
import { products, productPath, updates } from "@/lib/data";
import { siteOrigin } from "@/lib/seo";

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
  ];
}
