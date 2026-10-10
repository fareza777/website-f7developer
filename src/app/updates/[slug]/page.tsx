import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  updates,
  products,
  formatDate,
  iconPath,
  playUrl,
  productPath,
} from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { UpdateCard } from "@/components/ui";

export const dynamicParams = false;
export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = updates.find((u) => u.slug === slug);
  return u ? pageMetadata(u.title, u.summary, `/updates/${slug}/`) : {};
}
export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = updates.find((u) => u.slug === slug);
  if (!update) notFound();
  const product = products.find((p) => p.slug === update.productSlug)!;
  return (
    <>
      <article className="container article-page">
        <Link className="back-link" href="/updates/">
          <ArrowLeftIcon size={17} />
          All updates
        </Link>
        <div className="article-meta">
          <span>{product.name}</span>
          <time dateTime={update.date}>{formatDate(update.date)}</time>
        </div>
        <h1>{update.title}</h1>
        <p className="article-summary">{update.summary}</p>
        <div className="article-image">
          <Image
            src={iconPath(product)}
            alt={`${product.name} official artwork`}
            width={800}
            height={800}
            priority
          />
        </div>
        <div className="article-body">
          {update.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>What’s changed</h2>
          <ul>
            {update.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <a
            className="button button-primary"
            href={playUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Play
            <ArrowUpRightIcon size={18} />
          </a>
          <p className="article-source">
            Based on the official Google Play release notes dated{" "}
            {formatDate(update.date)}.{" "}
            <a
              href={playUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the store listing.
            </a>
          </p>
          <Link className="text-link" href={productPath(product)}>
            Discover {product.name}
            <ArrowUpRightIcon size={18} />
          </Link>
        </div>
      </article>
      <section className="section container">
        <h2 className="related-heading">More from the studio</h2>
        <div className="updates-grid">
          {updates
            .filter((u) => u.slug !== slug)
            .slice(0, 3)
            .map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
        </div>
      </section>
    </>
  );
}
