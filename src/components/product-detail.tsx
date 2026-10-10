import Image from "next/image";
import Link from "next/link";
import { Gallery } from "./gallery";
import {
  AndroidLogoIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
  GooglePlayLogoIcon,
} from "./icons";
import { GameCard, AppCard, ContactBanner } from "./ui";
import {
  type Product,
  products,
  iconPath,
  playUrl,
  formatDate,
} from "@/lib/data";

export function ProductDetail({ product }: { product: Product }) {
  const isGame = product.category === "Games";
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);
  return (
    <>
      <section
        className={`product-hero container${isGame ? "" : " product-hero-app"}`}
      >
        <div className="product-hero-copy">
          <Link
            href={isGame ? "/games/" : "/products/?category=Apps"}
            className="back-link"
          >
            <ArrowLeftIcon size={17} />
            {isGame ? "All games" : "All apps"}
          </Link>
          <span className="eyebrow">{product.genre}</span>
          <h1>
            {product.name}
            <span>.</span>
          </h1>
          <p className="product-subtitle">{product.subtitle}</p>
          <p className="product-intro">{product.description}</p>
          <a
            className="button button-primary"
            href={playUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GooglePlayLogoIcon size={21} />
            Get on Google Play
            <ArrowUpRightIcon size={18} />
          </a>
          <span className="product-platform">
            <AndroidLogoIcon size={18} />
            Available on Android
          </span>
        </div>
        <div className="product-art">
          <Image
            src={iconPath(product)}
            alt={`${product.name} official artwork`}
            width={800}
            height={800}
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="container product-information">
        <div className="product-story">
          <h2>
            {isGame
              ? "Your next adventure starts here."
              : "A better way to get things done."}
          </h2>
          <p>{product.story}</p>
          <h3>{isGame ? "Inside the game" : "What you can do"}</h3>
          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>
                <CheckIcon size={20} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <aside className="product-facts">
          <h3>Product details</h3>
          <dl>
            <div>
              <dt>Developer</dt>
              <dd>F7 Developer</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{product.genre}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Android</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>
                <time dateTime={product.updated}>
                  {formatDate(product.updated)}
                </time>
              </dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>On Google Play</dd>
            </div>
          </dl>
          <a
            className="text-link"
            href={playUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View store listing
            <ArrowUpRightIcon size={17} />
          </a>
          <p>
            Device compatibility, pricing, and availability are shown on Google
            Play.
          </p>
        </aside>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <h2>A closer look</h2>
            <p>Official screenshots from the Google Play listing.</p>
          </div>
        </div>
        <Gallery
          slug={product.slug}
          name={product.name}
          count={product.screenshots}
        />
      </section>
      <section className="section container related-section">
        <h2>{isGame ? "More worlds to discover" : "More from the studio"}</h2>
        <div className={isGame ? "games-grid" : "apps-grid related-apps"}>
          {related.map((p) =>
            isGame ? (
              <GameCard key={p.slug} product={p} />
            ) : (
              <AppCard key={p.slug} product={p} />
            ),
          )}
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
