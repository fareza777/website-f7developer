import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Dragon Walk Privacy",
  "How Dragon Walk, the walking dragon-collection game for Android, handles step data, your collection, advertising, and the remove-ads purchase.",
  "/privacy/dragon-walk/",
);

export default function DragonWalkPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Dragon Walk privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 17, 2026</p>

      <p>
        Dragon Walk is a walking and dragon-collection game for Android, published
        by F7 Developer. This policy explains what the game stores, what leaves your
        device, and why. It applies to the Dragon Walk Android application and
        nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account, no sign-in, and no GPS location access.</li>
        <li>
          Your step totals, eggs, dragons, and settings stay on your device. We do
          not run a server that holds your progress.
        </li>
        <li>
          The free game shows a banner and occasional ads from Google AdMob, and
          offers an optional rewarded ad for in-game stardust.
        </li>
        <li>
          You can remove banners and between-discovery ads permanently with a
          one-time purchase. Google Play processes the payment.
        </li>
        <li>Health Connect and other fitness-app histories are not imported.</li>
      </ul>

      <h2>Step counting</h2>
      <p>
        Dragon Walk reads the step counter sensor on your phone while a walking
        session is running, using Android&apos;s Physical activity permission. A
        persistent notification shows the active session and lets you pause it.
        Steps are counted on the device and stored locally; they are never uploaded
        to F7 Developer or to any third party. Step counts are used only for game
        progress such as eggs, bonds, and unlocks, and the game makes no medical or
        fitness claims. Sensor availability and background accuracy vary by device,
        and battery restrictions set by your phone may affect tracking.
      </p>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Step totals, daily progress, eggs, hatched dragons, companion bonds,
          stardust, decorations, sanctuary residents, and unlocked regions.
        </li>
        <li>
          Preferences such as daily goal, music, sound effects, narration, motion,
          and whether the remove-ads purchase was completed.
        </li>
        <li>
          Backups you export yourself as a JSON file, saved wherever you choose.
          Backups contain your collection and step totals and are not encrypted, so
          keep them somewhere private.
        </li>
      </ul>
      <p>
        Uninstalling Dragon Walk removes this local data. There is nothing stored on
        a server of ours to delete.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner above the navigation bar,
        an interstitial at natural breaks between discoveries (rate limited), and an
        optional rewarded ad that grants in-game stardust only when you choose to
        watch it. Google may process a device advertising identifier, approximate
        location derived from your connection, and app interaction data to deliver
        and measure ads, as described in Google&apos;s own privacy policy. Ad consent
        choices are available in the in-game Privacy screen, and you can reset or
        delete your advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ad stays available as a choice, because it grants stardust
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
          <strong>ACTIVITY_RECOGNITION</strong> — reads the step counter while a
          walking session is active.
        </li>
        <li>
          <strong>FOREGROUND_SERVICE</strong> and{" "}
          <strong>FOREGROUND_SERVICE_HEALTH</strong> — keeps the walking session
          counting with the screen off, shown by a persistent notification.
        </li>
        <li>
          <strong>POST_NOTIFICATIONS</strong> — shows that session notification and
          its pause action.
        </li>
        <li>
          <strong>INTERNET</strong> and <strong>ACCESS_NETWORK_STATE</strong> —
          request ads and contact Google Play for the remove-ads purchase.
        </li>
        <li>
          <strong>BILLING</strong> — reads and completes the remove-ads purchase
          through Google Play.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        Dragon Walk has no account system, no analytics SDK of its own, no
        crash-reporting SDK that uploads personal data, and no access to your
        contacts, messages, microphone, camera, photos, or precise location. The game
        does not import Health Connect or other fitness-app histories in this
        version.
      </p>

      <h2>Children</h2>
      <p>
        Dragon Walk is intended for players aged 13 and over. It is not directed at
        children under 13, and we do not knowingly collect personal information from
        them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can pause the walking session in the game, revoke Physical activity
        access in Android settings, clear all app data from Android settings, or
        uninstall the app to remove everything it stored. You can withdraw ad consent
        from the in-game Privacy screen. Depending on where you live, you may have
        rights to access, correct, or delete personal data; because the game holds no
        server-side account data, most requests are satisfied by clearing local data.
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
