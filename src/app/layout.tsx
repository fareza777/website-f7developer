import type { Metadata, Viewport } from "next";
import { Archivo, Geist } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteOrigin } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin || "http://localhost:3000"),
  title: {
    default: "F7 Developer | Small Studio. Big Ideas.",
    template: "%s | F7 Developer",
  },
  description:
    "Independent game and software studio from Indonesia. Discover Shardfall, Aeonfall, Shadow Depths, Android apps, and web projects by F7 Developer.",
  applicationName: "F7 Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "F7 Developer",
    title: "F7 Developer | Small Studio. Big Ideas.",
    description: "Independent games. Useful software. Ideas brought to life.",
    images: [
      {
        url: "/images/social.jpg",
        width: 1200,
        height: 630,
        alt: "F7 Developer original dark fantasy studio artwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "F7 Developer | Small Studio. Big Ideas.",
    images: ["/images/social.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
