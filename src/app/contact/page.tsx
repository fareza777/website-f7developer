import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GooglePlayLogoIcon,
  GithubLogoIcon,
} from "@/components/icons";
import { supportEmail, businessEmail, developerUrl } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with F7 Developer for game and app support, product feedback, press, or collaboration.",
  "/contact/",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="We’re all ears"
        text="Found a bug, have a question, or want to share an idea? You’re in the right place."
      />
      <section className="container contact-layout">
        <div className="contact-info">
          <h2>Let’s connect.</h2>
          <p>
            We’re an independent studio. Every useful piece of feedback helps us
            build better.
          </p>
          <div className="contact-channel">
            <EnvelopeSimpleIcon size={24} />
            <div>
              <h3>Game & app support</h3>
              <a href={`mailto:${supportEmail}`}>
                {supportEmail}
                <ArrowUpRightIcon size={16} />
              </a>
              <p>
                Include the product name, device, and app version when reporting
                an issue.
              </p>
            </div>
          </div>
          <div className="contact-channel">
            <ArrowUpRightIcon size={24} />
            <div>
              <h3>Press & collaboration</h3>
              <a href={`mailto:${businessEmail}`}>
                {businessEmail}
                <ArrowUpRightIcon size={16} />
              </a>
              <p>For studio enquiries, coverage, and working together.</p>
            </div>
          </div>
          <div className="contact-links">
            <a href={developerUrl} target="_blank" rel="noopener noreferrer">
              <GooglePlayLogoIcon size={20} />
              Google Play
              <ArrowUpRightIcon size={16} />
            </a>
            <a
              href="https://github.com/fareza777"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={20} />
              GitHub
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
