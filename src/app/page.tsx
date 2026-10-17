import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  GameControllerIcon,
  AndroidLogoIcon,
  GlobeIcon,
} from "@/components/icons";
import {
  GameCard,
  AppCard,
  WebProjects,
  SectionHeading,
  UpdateCard,
  ContactBanner,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LivingHero } from "@/components/living-hero/living-hero";
import { games, apps, updates } from "@/lib/data";
import { siteOrigin } from "@/lib/seo";
import { getLatestEdition, discoveryPath, discoverDate } from "@/lib/discover";

export const metadata: Metadata = siteOrigin
  ? { alternates: { canonical: new URL("/", siteOrigin).href } }
  : {};

export default function Home() {
  const discover = getLatestEdition();
  const discoverPreview = discover
    ? [
        discover.entries.find((entry) => entry.kind === "game"),
        discover.entries.find((entry) => entry.kind === "app"),
      ].filter((entry) => entry !== undefined)
    : [];
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-art"
          src="/images/studio-world.webp"
          alt="Original F7 studio concept art: a traveler facing a ruined citadel beneath a luminous eclipse"
          fill
          priority
          sizes="100vw"
        />
        <LivingHero />
        <div className="hero-shade" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              Independent game & software studio
            </span>
            <h1 id="hero-title">
              <span className="hero-word">
                <span>F7</span>
              </span>
              <br />
              <span className="hero-word">
                <span>
                  Developer<span className="hero-dot">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-tagline">Small Studio. Big Ideas.</p>
            <p className="hero-description">
              We build worlds to explore.
              <br />
              And software that makes a difference.
            </p>
            <div className="hero-actions">
              <Link href="/games/" className="button button-primary">
                Explore games
                <ArrowUpRightIcon size={20} />
              </Link>
              <Link href="/studio/" className="hero-secondary">
                Meet the studio
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="studio-strip">
        <div className="container studio-strip-inner">
          <p>
            Built with purpose.
            <br />
            <strong>Made to be discovered.</strong>
          </p>
          <Link href="/games/">
            <GameControllerIcon size={25} />
            <span>
              <strong>05</strong> Original games
            </span>
            <ArrowUpRightIcon size={16} />
          </Link>
          <Link href="/products/?category=Apps">
            <AndroidLogoIcon size={25} />
            <span>
              <strong>08</strong> Android apps
            </span>
            <ArrowUpRightIcon size={16} />
          </Link>
          <Link href="/products/?category=Web">
            <GlobeIcon size={25} />
            <span>
              <strong>02</strong> Web projects
            </span>
            <ArrowUpRightIcon size={16} />
          </Link>
        </div>
      </div>
      <section className="section container" id="featured-games">
        <Reveal>
          <SectionHeading
            title="Featured Games"
            text="Different worlds. The same restless imagination."
            href="/games/"
            label="View all games"
          />
        </Reveal>
        <div className="games-grid">
          {games.slice(0, 3).map((game, i) => (
            <Reveal key={game.slug} delay={i * 70}>
              <GameCard product={game} />
            </Reveal>
          ))}
        </div>
        <div className="games-footnote">
          <span>
            <GameControllerIcon size={18} /> Crafted for players. Built for the
            adventure.
          </span>
          <Link href="/games/" className="text-link">
            Find your next game
            <ArrowRightIcon size={17} />
          </Link>
        </div>
      </section>
      <section className="pixelpicked-launch" aria-labelledby="dawnbound-launch-title">
        <div className="container pixelpicked-launch-inner">
          <div className="pixelpicked-launch-copy">
            <span className="eyebrow">Now live on Android</span>
            <h2 id="dawnbound-launch-title">
              Carry the flame.
              <br />
              Wake the dawn<span>.</span>
            </h2>
            <p>
              Dawnbound is a portrait action roguelite built for one-thumb
              play. Shape each run through branching paths, spirit Boons, and
              boss fights, then bring the light home to Emberhollow.
            </p>
            <div className="pixelpicked-launch-actions">
              <a
                className="button button-primary"
                href="https://play.google.com/store/apps/details?id=com.fajar.dawnbound"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Dawnbound
                <ArrowUpRightIcon size={18} />
              </a>
              <a
                className="text-link"
                href="https://pixelpicked.com/game/4wURejMsb8I/dawnbound-roguelike-rpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on PixelPicked
                <ArrowUpRightIcon size={18} />
              </a>
            </div>
          </div>
          <a
            className="pixelpicked-launch-badge"
            href="https://pixelpicked.com/game/4wURejMsb8I/dawnbound-roguelike-rpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dawnbound verified on PixelPicked"
          >
            <span className="pixelpicked-launch-badge-label">
              Verified game
            </span>
            <img
              src="https://api.pixelpicked.com/api/badges/4wURejMsb8I/live.png?theme=dark"
              width="250"
              height="54"
              alt="Approved on PixelPicked"
            />
            <span className="pixelpicked-launch-badge-note">
              Explore the launch page
            </span>
          </a>
        </div>
      </section>
      <section className="apps-section">
        <div className="container section">
          <Reveal>
            <SectionHeading
              title="Apps & Tools"
              text="A little less friction. A little more possibility."
              href="/products/?category=Apps"
              label="View all apps"
            />
          </Reveal>
          <div className="apps-grid">
            {apps.slice(0, 4).map((app, i) => (
              <Reveal key={app.slug} delay={i * 50}>
                <AppCard product={app} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <Reveal>
          <SectionHeading
            title="Web Projects"
            text="Useful corners of the internet, built by us."
            href="/products/?category=Web"
            label="View web projects"
          />
        </Reveal>
        <Reveal>
          <WebProjects />
        </Reveal>
      </section>
      {discover && (
        <section className="home-discover">
          <div className="container home-discover-inner">
            <div>
              <span className="discover-kicker">
                BEYOND OUR STUDIO / {discoverDate(discover.date, true)}
              </span>
              <h2>
                F7 Discover<span>.</span>
              </h2>
              <p>
                Independent games. Useful Android apps. A daily selection of
                ideas worth finding, from creators around the world.
              </p>
              <Link href="/discover/" className="text-link">
                Explore the daily picks <ArrowUpRightIcon size={20} />
              </Link>
            </div>
            <div className="home-discover-preview">
              {discoverPreview.map((entry) => (
                <Link href={discoveryPath(entry)} key={entry.slug}>
                  <Image
                    src={entry.asset.path}
                    alt={entry.asset.alt}
                    width={100}
                    height={80}
                  />
                  <div>
                    <strong>{entry.name}</strong>
                    <span>
                      {entry.category} · By {entry.developer}
                    </span>
                  </div>
                  <ArrowUpRightIcon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="about-section">
        <div className="container about-grid">
          <Reveal className="about-art">
            <div className="studio-lettermark" aria-hidden="true">
              F7<span>.</span>
            </div>
            <span className="about-art-caption">
              INDEPENDENT SPIRIT. SHARED CURIOSITY.
            </span>
          </Reveal>
          <Reveal className="about-copy">
            <span className="eyebrow">About Studio</span>
            <h2>
              A small studio.
              <br />A world of possibility<span>.</span>
            </h2>
            <p>
              F7 Developer is an independent game and software studio based in
              Indonesia. We follow our curiosity, build with care, and put real
              products into people’s hands.
            </p>
            <p>
              From dark fantasy adventures to everyday Android tools, each
              release starts with an idea we believe is worth making.
            </p>
            <Link className="text-link" href="/studio/">
              Meet the studio
              <ArrowUpRightIcon size={19} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section container">
        <Reveal>
          <SectionHeading
            title="Latest Updates"
            text="Fresh from the studio. Here’s what’s new."
            href="/updates/"
            label="View all updates"
          />
        </Reveal>
        <div className="updates-grid">
          {updates.slice(0, 3).map((update, i) => (
            <Reveal key={update.slug} delay={i * 60}>
              <UpdateCard update={update} />
            </Reveal>
          ))}
        </div>
      </section>
      <Reveal>
        <ContactBanner />
      </Reveal>
    </>
  );
}
