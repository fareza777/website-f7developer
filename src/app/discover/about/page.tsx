import { pageMetadata } from "@/lib/seo";
import {
  DiscoverNav,
  DiscoverFootnote,
  ExternalLink,
} from "@/components/discover/shared";

export const metadata = pageMetadata(
  "How F7 Discover Curates",
  "Our approach to independent discovery: original insights, primary sources, official distribution, artwork permissions, and honest release labels.",
  "/discover/about/",
);
const principles = [
  [
    "A daily aim, a quality standard.",
    "We aim for seven indie games and seven Android apps per edition. A smaller verified selection is worth more than a filled quota. Candidates with incomplete facts or image permissions stay in our internal review queue.",
  ],
  [
    "Discovery is not a release date.",
    "Newly discovered means new to F7 Discover, even if a product has been around for years. New release is reserved for an original launch within 30 days, supported by a primary source. A recent update does not qualify.",
  ],
  [
    "The creator gets the credit.",
    "Every pick links to its developer, original discovery source, and official distribution. Product images come from official sources with documented reuse permission or a compatible license. Credits and license links appear on each detail page.",
  ],
  [
    "Useful context, original words.",
    "F7 summaries, highlights, and insights are written for this selection. We verify factual claims against developer websites, official repositories, documentation, or other primary evidence. We do not republish articles or store descriptions.",
  ],
  [
    "Official ways to get it.",
    "We prefer Android apps with developer-confirmed Google Play listings. Alternatives are clearly labelled, such as F-Droid or official GitHub releases. We never link to untrusted APK mirrors, fetch APK binaries, or use the Google Play API.",
  ],
  [
    "A respectful research process.",
    "Discovery leads can come from indie communities, launch sites, public repositories, and permitted feeds. We respect source terms and access restrictions, skip blocked pages, and avoid aggressive scraping. Each publication records when its sources were checked.",
  ],
];
export default function DiscoverAboutPage() {
  return (
    <div className="discover-page">
      <DiscoverNav active="about" />
      <section className="container discover-editorial-header">
        <span className="discover-kicker">THE THINKING BEHIND THE PICKS</span>
        <h1>
          Curiosity.
          <br />
          With care<span>.</span>
        </h1>
        <p>
          F7 Discover is our way of giving independent creators a little more
          room to be found.
        </p>
      </section>
      <div className="container discover-method">
        <div className="discover-method-intro">
          <h2>
            Human curiosity.
            <br />
            Assisted research.
          </h2>
          <p>
            Our scheduled, AI-assisted research prepares daily candidates.
            Publication checks require complete evidence, artwork rights, and a
            unique product identity. The same product cannot be picked again on
            a later day.
          </p>
          <p>
            Independent discoveries are separate from F7 Developer’s own games
            and software. Inclusion is an editorial selection, not a partnership
            or an endorsement by the creator.
          </p>
        </div>
        <div className="discover-principles">
          {principles.map(([title, text], i) => (
            <section key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </section>
          ))}
        </div>
        <div className="discover-corrections">
          <span className="discover-kicker">KEEPING THE RECORD ACCURATE</span>
          <h2>Found something we should fix?</h2>
          <p>
            If you are a creator, rights holder, or reader with a correction,
            email us with the product name and a primary source. We review
            factual corrections and artwork requests.
          </p>
          <a
            href="mailto:fajar.mreza@gmail.com?subject=F7%20Discover%20correction"
            className="button button-primary"
          >
            Send a correction
          </a>
          <p>
            Research notes:{" "}
            <ExternalLink href="https://github.com/fareza777/website-f7developer/tree/main/docs/discover">
              Our published source policy
            </ExternalLink>
          </p>
        </div>
      </div>
      <DiscoverFootnote />
    </div>
  );
}
