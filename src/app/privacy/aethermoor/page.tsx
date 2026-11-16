import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Aethermoor Privacy",
  "How Aethermoor, the idle fantasy RPG for Android, handles your save data, advertising, and the remove-ads purchase.",
  "/privacy/aethermoor/",
);

export default function AethermoorPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Aethermoor privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 17, 2026</p>

      <p>
        Aethermoor is a single-player idle fantasy RPG for Android, published by F7
        Developer. This policy explains what the game stores, what leaves your
        device, and why. It applies to the Aethermoor Android application and
        nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account is required, and we never ask for your name or email.</li>
        <li>Your heroes, inventory, quests, and settings stay on your device.</li>
        <li>
          The free game shows a banner and occasional interstitial ads from Google
          AdMob, and offers optional rewarded ads for in-game boosts. AdMob may
          collect a device identifier, approximate location, and app interaction
          data to serve and measure ads.
        </li>
        <li>
          You can remove banners and interstitials permanently with a one-time
          purchase. Google Play processes the payment.
        </li>
        <li>
          Network access is used only for ads and the remove-ads purchase. The
          game itself plays offline.
        </li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Character slots, levels, skills, gear, inventory, quest progress, and
          discovered codex entries in the app&apos;s private local storage.
        </li>
        <li>
          Preferences such as sound, combat speed, auto-sell rules, language, and
          whether the remove-ads purchase was completed.
        </li>
        <li>
          Offline progression timestamps, so the game can calculate what happened
          while you were away.
        </li>
      </ul>
      <p>
        Uninstalling Aethermoor removes this local data. We hold no server-side copy
        of your save, so there is nothing for us to delete on a server.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner above the navigation bar,
        occasional interstitials at natural breaks, and optional rewarded ads that
        grant in-game boosts only when you choose to watch one. Google may process
        a device advertising identifier, approximate location derived from your
        connection, and app interaction data to deliver and measure ads, as
        described in Google&apos;s own privacy policy. You can reset or delete your
        advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ads stay available as a choice, because they grant in-game
        boosts rather than interrupting play.
      </p>

      <h2>Purchases</h2>
      <p>
        Remove Ads is a one-time in-app purchase handled entirely by Google Play
        Billing. Google processes the payment and keeps your payment details. The
        game receives only a purchase confirmation so it can hide ads and restore
        that state after reinstalling with the same Google account. Refunds follow
        Google Play&apos;s refund policy.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — requests ads and contacts Google Play for the
          remove-ads purchase.
        </li>
        <li>
          <strong>ACCESS_NETWORK_STATE</strong> — lets the ad SDK check whether a
          connection is available before requesting an ad.
        </li>
        <li>
          <strong>BILLING</strong> — reads and completes the remove-ads purchase
          through Google Play.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        Aethermoor has no account system, no analytics SDK of its own, no
        crash-reporting SDK that uploads personal data, and no access to your
        contacts, messages, microphone, camera, files, or precise location.
      </p>

      <h2>Children</h2>
      <p>
        Aethermoor is a fantasy role-playing game intended for players aged 13 and
        over. It is not directed at children under 13, and we do not knowingly
        collect personal information from them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can delete characters from inside the game, clear all app data from
        Android settings, or uninstall the app to remove everything it stored. You
        can reset your advertising ID from Android settings at any time. Depending
        on where you live, you may have rights to access, correct, or delete personal
        data; because the game holds no server-side account data, most requests are
        satisfied by clearing local data.
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
