import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Sunward Oath Privacy",
  "How Sunward Oath, an offline illustrated fantasy adventure for Android, handles saves, advertising, and the remove-ads purchase.",
  "/privacy/sunward-oath/",
);

export default function SunwardOathPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Sunward Oath privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 16, 2026</p>

      <p>
        Sunward Oath is a single-player interactive fantasy adventure. The story,
        artwork, and character voices are packaged with the app, so the game
        plays fully offline. This policy explains what the app does with
        information, in plain language.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account is required, and we never ask for your name or email.</li>
        <li>Your saves, choices, and settings stay on your device.</li>
        <li>
          The free app shows ads from Google AdMob. AdMob may collect a device
          identifier, approximate location, and app interaction data to serve
          and measure ads. Story progress is never sent to advertisers.
        </li>
        <li>
          You can remove all ads permanently with a one-time purchase. Google
          Play processes the payment; the app never receives your card details.
        </li>
        <li>
          Network access is used only for ads and the remove-ads purchase.
          Reading, playing, and saving work without a connection.
        </li>
        <li>The app has no analytics SDK, no crash-reporting SDK, and no social features.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Campaign progress, chapter checkpoints, inventory, relationships, and
          discovered endings in app-private storage.
        </li>
        <li>
          Preferences such as language, text size, animation, volume, and
          whether the remove-ads purchase was completed.
        </li>
        <li>
          Bundled story text, illustrations, and voice tracks that ship inside
          the app. The app does not record audio and does not request microphone
          access.
        </li>
      </ul>
      <p>
        Uninstalling Sunward Oath removes the app&apos;s private data from your
        device. There is nothing stored on a server of ours to delete.
      </p>

      <h2>Advertising</h2>
      <p>
        The free edition uses Google AdMob banner, interstitial, and optional
        rewarded ads. Interstitials appear only at natural chapter breaks; the
        rewarded ad is always a choice and grants an in-game hint. Google may
        process a device advertising identifier, approximate location derived
        from your connection, and app interaction data to deliver and measure
        ads, as described in Google&apos;s own privacy policy. You can reset or
        delete your advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops ad requests from the app; the banner,
        interstitial, and rewarded placements are disabled on that device.
      </p>

      <h2>Purchases</h2>
      <p>
        The remove-ads product is a one-time in-app purchase handled entirely by
        Google Play Billing. Google processes the payment and keeps your payment
        details. The app receives only a purchase confirmation so it can hide
        ads and restore that state after reinstalling with the same Google
        account. Refunds follow Google Play&apos;s refund policy.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — requests ads and contacts Google Play for
          the remove-ads purchase.
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

      <h2>Children</h2>
      <p>
        Sunward Oath is a fantasy adventure intended for players aged 13 and
        over. It is not directed at children under 13, and we do not knowingly
        collect personal information from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If a future version adds a feature that changes how information is
        handled, this page will be updated before that version is released, and
        the effective date above will change.
      </p>

      <h2>Questions</h2>
      <p>
        For questions about this policy or the app, email{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      <Link href="/contact/" className="text-link">
        Contact the studio ↗
      </Link>
    </article>
  );
}
