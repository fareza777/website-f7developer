import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findDiscovery,
  getDiscoverEditions,
  discoverDate,
  discoveryPath,
  editionPath,
} from "@/lib/discover";
import { pageMetadata } from "@/lib/seo";
import { ArrowLeftIcon, CheckIcon, SparkleIcon } from "@/components/icons";
import {
  DiscoverNav,
  DiscoverFootnote,
  ExternalLink,
} from "@/components/discover/shared";

export const dynamicParams = false;
export function generateStaticParams() {
  return getDiscoverEditions().flatMap((edition) =>
    edition.entries.map((entry) => ({ slug: entry.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findDiscovery(slug);
  return found
    ? pageMetadata(
        `${found.entry.name} — F7 Discover`,
        found.entry.summary,
        discoveryPath(found.entry),
      )
    : {};
}
export default async function DiscoveryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findDiscovery(slug);
  if (!found) notFound();
  const { entry, date } = found;
  return (
    <div className="discover-page">
      <DiscoverNav active="detail" />
      <article className="container discover-detail">
        <Link href={editionPath(date)} className="discover-back">
          <ArrowLeftIcon size={18} /> Back to the {discoverDate(date, true)}{" "}
          edition
        </Link>
        <div className={`discover-detail-hero discover-detail-${entry.kind}`}>
          <div className="discover-detail-copy">
            <span className="discover-kicker">
              {entry.kind === "game" ? "INDIE GAME" : "ANDROID APP"} /{" "}
              {entry.category}
            </span>
            <h1>
              {entry.name}
              <span>.</span>
            </h1>
            <p className="discover-detail-developer">By {entry.developer}</p>
            <p className="discover-detail-summary">{entry.summary}</p>
            <div className="discover-detail-actions">
              <ExternalLink
                href={entry.officialUrl}
                className="button button-primary"
              >
                Visit official website
              </ExternalLink>
            </div>
            <div className="discover-detail-badges">
              <span>
                <CheckIcon size={17} /> Sources checked{" "}
                {discoverDate(entry.verification.verifiedAt, true)}
              </span>
              <span>
                {entry.release.kind === "new-release"
                  ? "New release"
                  : "Newly discovered"}
              </span>
            </div>
          </div>
          <div className="discover-detail-art">
            <Image
              src={entry.asset.path}
              alt={entry.asset.alt}
              fill
              priority
              sizes="(max-width: 800px) 90vw, 45vw"
            />
          </div>
        </div>
        <div className="discover-detail-grid">
          <div className="discover-detail-main">
            <section className="discover-insight-panel">
              <div>
                <SparkleIcon size={25} />
                <h2>The F7 Insight</h2>
              </div>
              <p>{entry.insight}</p>
            </section>
            <section className="discover-features">
              <span className="discover-kicker">WHAT MAKES IT INTERESTING</span>
              <h2>A closer look.</h2>
              <ul>
                {entry.features.map((feature, i) => (
                  <li key={feature}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="discover-evidence">
              <h2>Sources & credits</h2>
              <p>
                Verified against the sources below. Features, pricing, and
                availability may change; check the creator’s current information
                before installing or buying.
              </p>
              <ul>
                {entry.verification.sources.map((source, i) => (
                  <li key={`${source.url}-${i}`}>
                    <ExternalLink href={source.url}>
                      {source.label}
                    </ExternalLink>
                    <span>Checked {discoverDate(source.accessedAt, true)}</span>
                  </li>
                ))}
              </ul>
              <div className="discover-credits">
                <h3>Artwork acknowledgments</h3>
                <p>{entry.asset.attribution}</p>
                <p>
                  <ExternalLink href={entry.asset.sourceUrl}>
                    Original image
                  </ExternalLink>
                  <ExternalLink href={entry.asset.licenseUrl}>
                    {entry.asset.license}
                  </ExternalLink>
                  {entry.asset.noticePath && (
                    <a href={entry.asset.noticePath}>Full license notice</a>
                  )}
                </p>
              </div>
            </section>
          </div>
          <aside className="discover-facts">
            <h2>At a glance</h2>
            <dl>
              <div>
                <dt>Developer</dt>
                <dd>{entry.developer}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{entry.category}</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd>{entry.platforms.join(" · ")}</dd>
              </div>
              <div>
                <dt>Price at discovery</dt>
                <dd>
                  {entry.price.label}
                  <ExternalLink href={entry.price.sourceUrl}>
                    Price source
                  </ExternalLink>
                </dd>
              </div>
              <div>
                <dt>Discovered</dt>
                <dd>
                  <time dateTime={date}>{discoverDate(date)}</time>
                </dd>
              </div>
              <div>
                <dt>Discovery source</dt>
                <dd>
                  <ExternalLink href={entry.discoverySource.url}>
                    {entry.discoverySource.name}
                  </ExternalLink>
                </dd>
              </div>
              <div>
                <dt>Release status</dt>
                <dd>
                  {entry.release.kind === "new-release" ? (
                    <>
                      Originally launched {discoverDate(entry.release.date!)}.{" "}
                      <ExternalLink href={entry.release.evidenceUrl!}>
                        Launch evidence
                      </ExternalLink>
                    </>
                  ) : (
                    "An existing product, newly discovered by F7. This is not a new-release claim."
                  )}
                </dd>
              </div>
            </dl>
            <div className="discover-distribution">
              <h3>Get it from the source</h3>
              {entry.distribution.map((link) => (
                <ExternalLink key={link.url} href={link.url}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
            <p className="discover-independent-note">
              Made by {entry.developer}. Independently selected by F7 Developer.
            </p>
          </aside>
        </div>
      </article>
      <DiscoverFootnote />
    </div>
  );
}
