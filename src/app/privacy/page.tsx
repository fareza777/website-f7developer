import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Website Privacy",
  "How the F7 Developer website handles visitor data, email drafts, and external product links.",
  "/privacy/",
);
export default function PrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Website privacy<span>.</span>
      </h1>
      <p className="muted">Last updated October 10, 2026</p>
      <h2>This website</h2>
      <p>
        The F7 Developer website presents our games, apps, web projects, and
        studio updates. It does not provide user accounts, advertising trackers,
        or a newsletter sign-up.
      </p>
      <h2>Contacting us</h2>
      <p>
        The contact form prepares an email draft on your device. It does not
        submit your message to a website server or store your form entries. Your
        email is sent only when you send it through your email provider. If you
        contact us, we receive the information you include and use it to respond
        to your enquiry.
      </p>
      <h2>Hosting and technical information</h2>
      <p>
        Like other websites, the hosting provider may process technical request
        information, such as IP addresses and browser information, to serve
        pages, operate its infrastructure, and maintain security.
      </p>
      <h2>Links to our products</h2>
      <p>
        Google Play and linked web projects have their own privacy practices.
        The privacy policy for each Android product is available on that
        product’s Google Play listing. This website notice does not replace
        those product policies.
      </p>
      <h2>Questions</h2>
      <p>
        For questions about this website or your contact information, email{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      <Link href="/contact/" className="text-link">
        Contact the studio ↗
      </Link>
    </article>
  );
}
