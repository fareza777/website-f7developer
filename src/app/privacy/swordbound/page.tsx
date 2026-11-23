import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Swordbound Privacy",
  "How Swordbound: Idle Swordsman RPG handles your save, advertising, and the remove-ads purchase on Android.",
  "/privacy/swordbound/",
);

export default function SwordboundPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Swordbound privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 23, 2026</p>

      <p>
        Swordbound: Idle Swordsman RPG is an offline idle role-playing game for
        Android, published by F7 Developer. This policy explains what the game
        stores, what leaves your device, and why. It applies to the Swordbound
        Android application and nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account, no sign-in, no location access, and no analytics SDK of our own.</li>
        <li>
          Your hero, gear, cards, progress and settings stay on your device. We do
          not run a server that holds your save.
        </li>
        <li>
          The free game shows a banner and occasional full-screen ads from Google
          AdMob, plus an optional rewarded ad you can choose to watch.
        </li>
        <li>
          You can remove banners and full-screen ads permanently with a one-time
          purchase. Google Play processes the payment.
        </li>
        <li>The game is fully playable offline.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Save data: hero level and stats, equipped gear, inventory, monster cards,
          world progress, guardian attempts, tavern and merchant state, story
          flags, and settings.
        </li>
        <li>Preferences such as audio, theme, and whether the remove-ads purchase was completed.</li>
      </ul>
      <p>
        Uninstalling Swordbound removes this local data. There is nothing stored on
        a server of ours to delete, and saves do not transfer between devices.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner in the game, an occasional
        interstitial at a natural break (rate limited), and an optional rewarded ad
        that grants an in-game bonus only when you choose to watch it. Google may
        process a device advertising identifier, approximate location derived from
        your connection, and app interaction data to deliver and measure ads, as
        described in Google&apos;s own privacy policy. Ad consent choices are
        available in the game&apos;s privacy options, and you can reset or delete
        your advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ad can stay available as a choice, because you only see
        it when you ask for the bonus.
      </p>

      <h2>Purchases</h2>
      <p>
        Remove ads is a one-time in-app purchase handled entirely by Google Play
        Billing. Google processes the payment and keeps your payment details. The
        game receives only a purchase confirmation so it can hide ads and restore
        that state after reinstalling with the same Google account. Refunds follow
        Google Play&apos;s refund policy.
      </p>

      <h2>Children</h2>
      <p>
        Swordbound is not directed at children under 13. It has no chat, no user
        accounts, and no user-generated content sharing.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date above will change with it.
        Material changes will be reflected in the store listing before they apply.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy can go to{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or through the{" "}
        <Link href="/support">support page</Link>.
      </p>
    </article>
  );
}
