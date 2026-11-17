import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Eclipse Armada Privacy",
  "How Eclipse Armada, the fleet-tactics space strategy game for Android, handles your campaign save, advertising, and the remove-ads purchase.",
  "/privacy/eclipse-armada/",
);

export default function EclipseArmadaPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Eclipse Armada privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 17, 2026</p>

      <p>
        Eclipse Armada is a turn-based fleet tactics game for Android, published by
        F7 Developer. This policy explains what the game stores, what leaves your
        device, and why. It applies to the Eclipse Armada Android application and
        nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account, no sign-in, no location access, and no analytics SDK.</li>
        <li>
          Your campaign progress, fleet designs, and settings stay on your device.
          We do not run a server that holds your save.
        </li>
        <li>
          The free game shows a banner and occasional full-screen ads from Google
          AdMob, plus an optional rewarded ad you can choose to watch.
        </li>
        <li>
          You can remove banners and between-battle ads permanently with a one-time
          purchase. Google Play processes the payment.
        </li>
        <li>The game is fully playable offline; an internet connection is only used for ads and purchases.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Campaign progress: chapter and mission state, story choices, unlocked
          ships, modules, protocols, commanders, and recorded results.
        </li>
        <li>
          Preferences such as audio, motion, interface options, and whether the
          remove-ads purchase was completed.
        </li>
      </ul>
      <p>
        Uninstalling Eclipse Armada removes this local data. There is nothing stored
        on a server of ours to delete. Because there is no cloud save, progress does
        not transfer between devices.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner in the game interface, an
        interstitial at natural breaks between battles (rate limited), and an
        optional rewarded ad that grants an in-game bonus only when you choose to
        watch it. Google may process a device advertising identifier, approximate
        location derived from your connection, and app interaction data to deliver
        and measure ads, as described in Google&apos;s own privacy policy. Ad consent
        choices are available in the in-game privacy screen, and you can reset or
        delete your advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ad stays available as a choice, because it grants a bonus
        rather than interrupting play.
      </p>

      <h2>Purchases</h2>
      <p>
        Remove ads is a one-time in-app purchase handled entirely by Google Play
        Billing. Google processes the payment and keeps your payment details. The
        game receives only a purchase confirmation so it can hide ads and restore
        that state after reinstalling with the same Google account. Refunds follow
        Google Play&apos;s refund policy.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — request ads and contact Google Play for the
          remove-ads purchase.
        </li>
        <li>
          <strong>BILLING</strong> — read and complete the remove-ads purchase
          through Google Play.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        Eclipse Armada has no account system, no analytics SDK of its own, no
        crash-reporting SDK that uploads personal data, and no access to your
        contacts, messages, microphone, camera, photos, or precise location.
      </p>

      <h2>Children</h2>
      <p>
        Eclipse Armada is intended for players aged 13 and over. It is not directed
        at children under 13, and we do not knowingly collect personal information
        from them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can clear all app data from Android settings, or uninstall the app, to
        remove everything it stored. You can withdraw ad consent from the in-game
        privacy screen. Depending on where you live, you may have rights to access,
        correct, or delete personal data; because the game holds no server-side
        account data, most requests are satisfied by clearing local data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If a future version adds a feature that changes how information is handled,
        this page will be updated before that version is released, and the effective
        date above will change.
      </p>

      <h2>Questions</h2>
      <p>
        For questions about this policy or the game, email{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      <Link href="/contact/" className="text-link">
        Contact the studio ↗
      </Link>
    </article>
  );
}
