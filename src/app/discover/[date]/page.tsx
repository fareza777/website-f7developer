import { notFound } from "next/navigation";
import { getDiscoverEditions, discoverDate, editionPath } from "@/lib/discover";
import { pageMetadata } from "@/lib/seo";
import { EditionView } from "@/components/discover/edition";

export const dynamicParams = false;
export function generateStaticParams() {
  return getDiscoverEditions().map((edition) => ({ date: edition.date }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const edition = getDiscoverEditions().find(
    (candidate) => candidate.date === date,
  );
  if (!edition) return {};
  return pageMetadata(
    `Discover — ${discoverDate(date)}`,
    edition.intro,
    editionPath(date),
  );
}
export default async function DatedDiscoverPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const editions = getDiscoverEditions();
  const edition = editions.find((candidate) => candidate.date === date);
  if (!edition) notFound();
  return (
    <EditionView
      edition={edition}
      dates={editions.map((candidate) => candidate.date)}
    />
  );
}
