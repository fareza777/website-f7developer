import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  GameControllerIcon,
  CodeIcon,
  SparkleIcon,
  GithubLogoIcon,
} from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { ContactBanner, PageIntro } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Studio",
  "Meet F7 Developer, an independent game and software studio founded by Fajar M. Reza in Indonesia. Small Studio. Big Ideas.",
  "/studio/",
);
export default function StudioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Independent by design"
        title="Built on curiosity"
        text="A small studio in Indonesia, making room for big ideas and the work it takes to bring them to life."
      />
      <div className="studio-panorama container">
        <Image
          src="/images/studio-world.webp"
          alt="Original F7 concept art of a lone adventurer discovering a vast fantasy citadel"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <section className="section container studio-manifesto">
        <Reveal>
          <span className="eyebrow">Small Studio. Big Ideas.</span>
          <h2>
            We make the things
            <br />
            we want to exist<span>.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p>
            F7 Developer is an independent game and software studio founded by
            Fajar M. Reza. Our work starts with curiosity: a world worth
            exploring, a problem worth solving, or an idea that won’t leave us
            alone.
          </p>
          <p>
            Games are at the heart of the studio. Alongside them, we build
            Android apps and web projects that make everyday work, learning, and
            discovery a little more useful.
          </p>
          <p>
            We keep the studio small, stay close to what we make, and improve
            our products one release at a time.
          </p>
        </Reveal>
      </section>
      <section className="values-section">
        <div className="container section">
          <h2>What drives us</h2>
          <div className="values-grid">
            {[
              {
                Icon: GameControllerIcon,
                title: "Play comes first.",
                text: "We make games with worlds to discover, decisions to make, and a reason to try one more run.",
              },
              {
                Icon: CodeIcon,
                title: "Make it useful.",
                text: "Our software starts with everyday needs. Clear purpose and thoughtful details guide what we build.",
              },
              {
                Icon: SparkleIcon,
                title: "Keep getting better.",
                text: "Shipping is a beginning. We listen, learn, and keep refining the things people use.",
              },
            ].map(({ Icon, title, text }) => (
              <Reveal key={title}>
                <article className="value">
                  <Icon size={35} weight="light" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container studio-numbers">
        <div>
          <strong>
            05<span>Original games</span>
          </strong>
          <p>Strategy, roguelikes, puzzles, and RPG adventures.</p>
        </div>
        <div>
          <strong>
            08<span>Android apps</span>
          </strong>
          <p>Practical ideas for work, learning, and daily life.</p>
        </div>
        <div>
          <strong>
            02<span>Web projects</span>
          </strong>
          <p>Useful discoveries for creators and curious minds.</p>
        </div>
      </section>
      <section className="container studio-founder">
        <div className="founder-monogram" aria-hidden="true">
          FM<span>R.</span>
        </div>
        <div>
          <span className="eyebrow">The person behind F7</span>
          <h2>Fajar M. Reza</h2>
          <p className="founder-role">Founder & Developer</p>
          <p>
            Based in Indonesia. Building games, practical AI applications, and
            digital tools with an independent spirit.
          </p>
          <div className="founder-socials">
            <a
              className="text-link"
              href="https://github.com/fareza777"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={18} aria-hidden="true" />
              GitHub
              <ArrowUpRightIcon size={15} aria-hidden="true" />
            </a>
            <SocialLinks className="text-link" />
          </div>
        </div>
        <Link href="/products/" className="button button-outline">
          Explore our products
          <ArrowUpRightIcon size={18} />
        </Link>
      </section>
      <ContactBanner />
    </>
  );
}
