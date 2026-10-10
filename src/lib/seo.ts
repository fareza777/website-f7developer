import type { Metadata } from "next";

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(siteOrigin
      ? { alternates: { canonical: new URL(path, siteOrigin).href } }
      : {}),
    openGraph: {
      title: `${title} | F7 Developer`,
      description,
      type: "website",
      siteName: "F7 Developer",
      images: [
        {
          url: "/images/social.jpg",
          width: 1200,
          height: 630,
          alt: "F7 Developer original studio artwork",
        },
      ],
      ...(siteOrigin ? { url: new URL(path, siteOrigin).href } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | F7 Developer`,
      description,
      images: ["/images/social.jpg"],
    },
  };
}
