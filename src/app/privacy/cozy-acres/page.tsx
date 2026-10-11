import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Cozy Acres Privacy Policy",
  "Privacy policy for Cozy Acres: Farming RPG, including local saves, advertising, consent, and Google Play purchases.",
  "/privacy/cozy-acres/",
);

export default function CozyAcresPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Cozy Acres privacy<span>.</span>
      </h1>
      <p className="muted">Last updated October 11, 2026</p>

      <h2>About this policy</h2>
      <p>
        Cozy Acres: Farming RPG is made by F7 Developer. This policy explains
        what information the game handles when you play it on Android.
      </p>

      <h2>Information stored on your device</h2>
      <p>
        Your farm progress, inventory, the farmer name you choose, and game
        settings are saved on your device. Cozy Acres has no account system and
        does not upload your save data to a F7 Developer server. Uninstalling
        the game removes these local saves.
      </p>

      <h2>Advertising and consent</h2>
      <p>
        Cozy Acres uses Google AdMob to show optional advertising. AdMob may
        process your device advertising identifier, IP address, ad interaction
        information, and diagnostic information to deliver ads, limit ad
        frequency, prevent fraud, and measure performance.
      </p>
      <ul>
        <li>
          In the European Economic Area and the United Kingdom, Google&apos;s
          consent flow asks for your choice before personalized ads are shown.
        </li>
        <li>
          You can review or change the choice in the game under Settings → Ad
          privacy.
        </li>
        <li>Rewarded videos are always optional.</li>
      </ul>
      <p>
        Read the{" "}
        <a href="https://policies.google.com/privacy">Google Privacy Policy</a>
        {" "}and{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          Google&apos;s partner-services explanation
        </a>
        .
      </p>

      <h2>Purchases</h2>
      <p>
        The optional Remove Ads purchase is processed by Google Play Billing.
        F7 Developer does not receive or store your payment details. A
        successful purchase removes banner and interstitial ads for the game.
      </p>

      <h2>Children</h2>
      <p>
        Cozy Acres is suitable for a general audience. The game does not
        knowingly collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If the way Cozy Acres handles information changes, this page will be
        updated with a new date before or when the change takes effect.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href="mailto:fajar.mreza@gmail.com">fajar.mreza@gmail.com</a>.
      </p>
    </article>
  );
}
