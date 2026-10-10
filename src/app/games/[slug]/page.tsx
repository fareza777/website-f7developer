import { notFound } from "next/navigation";
import { games } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return games.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = games.find((p) => p.slug === slug);
  return p ? pageMetadata(p.name, p.description, `/games/${slug}/`) : {};
}
export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = games.find((p) => p.slug === slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
