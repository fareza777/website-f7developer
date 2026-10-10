import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  AndroidLogoIcon,
  CubeIcon,
  RadarIcon,
} from "./icons";
import {
  type Product,
  type Update,
  formatDate,
  iconPath,
  productPath,
  products,
  webProjects,
} from "@/lib/data";

export function SectionHeading({
  title,
  text,
  href,
  label,
}: {
  title: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <ArrowUpRightIcon size={18} />
        </Link>
      )}
    </div>
  );
}

export function GameCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <article className="game-card">
      <Link
        href={productPath(product)}
        className="game-image-link"
        aria-label={`Discover ${product.name}`}
      >
        <Image
          src={iconPath(product)}
          alt={`${product.name} official artwork`}
          width={800}
          height={800}
          priority={priority}
          className="game-art"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRightIcon size={23} />
        </span>
      </Link>
      <div className="game-meta">
        <span>{product.genre}</span>
        <span>
          <AndroidLogoIcon size={14} /> Android
        </span>
      </div>
      <h3>
        <Link href={productPath(product)}>{product.name}</Link>
      </h3>
      <p className="game-subtitle">{product.subtitle}</p>
      <p className="game-description">{product.description}</p>
    </article>
  );
}

export function AppCard({ product }: { product: Product }) {
  return (
    <article className="app-card">
      <Link
        href={productPath(product)}
        aria-label={`Discover ${product.name}`}
        className="app-card-top"
      >
        <Image
          src={iconPath(product)}
          alt={`${product.name} icon`}
          width={72}
          height={72}
          className="app-icon"
        />
        <ArrowUpRightIcon size={20} />
      </Link>
      <span className="app-genre">{product.genre}</span>
      <h3>
        <Link href={productPath(product)}>{product.name}</Link>
      </h3>
      <p>{product.description}</p>
      <Link href={productPath(product)} className="app-card-link">
        Discover app <ArrowRightIcon size={16} />
      </Link>
    </article>
  );
}

export function WebProjects({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`web-grid${compact ? " web-grid-compact" : ""}`}>
      {webProjects.map((project) => (
        <a
          href={project.url}
          key={project.slug}
          target="_blank"
          rel="noopener noreferrer"
          className={`web-card web-${project.slug}`}
        >
          <div className="web-card-top">
            <span>{project.genre}</span>
            <ArrowUpRightIcon size={25} />
          </div>
          <div className="web-identity">
            {project.icon === "cube" ? (
              <CubeIcon weight="light" size={72} />
            ) : (
              <RadarIcon weight="light" size={72} />
            )}
            <span>{project.name}</span>
          </div>
          <h3>{project.label}</h3>
          <p>{project.description}</p>
          <span className="web-url">
            {new URL(project.url).hostname}
            <ArrowRightIcon size={16} />
          </span>
        </a>
      ))}
    </div>
  );
}

export function UpdateCard({ update }: { update: Update }) {
  const product = products.find((p) => p.slug === update.productSlug)!;
  return (
    <article className="update-card">
      <Link href={`/updates/${update.slug}/`} className="update-image">
        <Image
          src={iconPath(product)}
          alt={`${product.name} artwork`}
          width={800}
          height={800}
          sizes="(max-width: 767px) 100vw, 33vw"
        />
        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRightIcon size={22} />
        </span>
      </Link>
      <div className="update-meta">
        <span>{product.name}</span>
        <time dateTime={update.date}>{formatDate(update.date)}</time>
      </div>
      <h3>
        <Link href={`/updates/${update.slug}/`}>{update.title}</Link>
      </h3>
      <p>{update.summary}</p>
      <Link className="text-link" href={`/updates/${update.slug}/`}>
        Read update <ArrowRightIcon size={16} />
      </Link>
    </article>
  );
}

export function ContactBanner() {
  return (
    <section
      className="contact-banner container"
      aria-labelledby="contact-title"
    >
      <div>
        <span className="eyebrow">Contact</span>
        <h2 id="contact-title">
          Good things start
          <br />
          with a conversation<span>.</span>
        </h2>
        <p>Game feedback, product support, or a big idea. We’re listening.</p>
      </div>
      <Link
        className="round-link"
        href="/contact/"
        aria-label="Contact F7 Developer"
      >
        <ArrowUpRightIcon weight="light" size={56} />
      </Link>
    </section>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro container">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>
        {title}
        <span>.</span>
      </h1>
      <p>{text}</p>
      {children}
    </div>
  );
}
