import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteOrigin
      ? { sitemap: new URL("/sitemap.xml", siteOrigin).href, host: siteOrigin }
      : {}),
  };
}
