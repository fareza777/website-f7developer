import { notFound } from "next/navigation";
import { apps } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return apps.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = apps.find((p) => p.slug === slug);
  return p ? pageMetadata(p.name, p.description, `/products/${slug}/`) : {};
}
export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = apps.find((p) => p.slug === slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
