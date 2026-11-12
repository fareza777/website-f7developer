import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Videofit Privacy",
  "How Videofit, the on-device video compressor for Android, handles your videos, library, advertising, and the remove-ads purchase.",
  "/privacy/videofit/",
);

export default function VideofitPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Videofit privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 12, 2026</p>

      <p>
        Videofit is a video compressor that does its work on your phone. This
        policy explains what the app does with information, in plain language.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>
          Videos are compressed on your device. No video, frame, filename, or
          thumbnail is uploaded to us.
        </li>
        <li>There are no accounts, analytics, or crash-reporting SDKs.</li>
        <li>
          The free app shows ads from Google AdMob, which may collect a device
          identifier and ad interaction data to serve and measure ads. Your
          videos are never sent to advertisers.
        </li>
        <li>
          You can remove ads permanently with a one-time purchase. Google Play
          processes the payment; Videofit never receives your payment details.
        </li>
        <li>
          Network access is used only for ads and for the remove-ads purchase.
        </li>
        <li>
          Compressing, editing settings, and browsing your Library work fully
          offline.
        </li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Compressed videos are written to the folder you choose; the original
          file is left untouched.
        </li>
        <li>
          A local Library list and History of finished runs, including file
          name, size before and after, codec, and date, kept in app-private
          storage.
        </li>
        <li>
          Preferences such as theme, default codec, default target size, batch
          options, onboarding state, and remove-ads status.
        </li>
      </ul>
      <p>
        Uninstalling Videofit removes the app&apos;s private data. Videos you
        exported remain in the folder where you saved them.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — requests ads and contacts Google Play for
          the remove-ads purchase.
        </li>
        <li>
          <strong>ACCESS_NETWORK_STATE</strong> — lets the ad SDK check
          connectivity before requesting an ad.
        </li>
        <li>
          <strong>POST_NOTIFICATIONS</strong> — shows the progress notification
          for a running compression.
        </li>
        <li>
          <strong>WAKE_LOCK</strong> — keeps the encode alive while the screen is
          off. It is not held otherwise.
        </li>
        <li>
          <strong>WRITE_EXTERNAL_STORAGE</strong> (Android 9 and older only) —
          saves the compressed file to the folder you pick.
        </li>
        <li>
          <strong>com.android.vending.BILLING</strong> — processes the one-time
          Remove ads purchase through Google Play. Videofit stores only a local
          entitlement.
        </li>
      </ul>
      <p>
        Videos are chosen through the Android system photo picker or by sharing
        a video to Videofit. The app receives only the items you pick, and only
        to read them for compression.
      </p>

      <h2>Advertising</h2>
      <p>
        Videofit is free and supported by ads served by Google AdMob. A small
        banner sits inside the layout, an interstitial may appear after a
        compression finishes (at most once every 90 seconds), and Settings
        offers two ways to turn ads off: a one-time in-app purchase that removes
        them permanently, or an optional rewarded ad that hides them for 24
        hours.
      </p>
      <p>
        The purchase is processed entirely by Google Play. Videofit receives only
        the product ID and a purchase token to verify entitlement; it never sees
        your name, card, or billing address. The app stores a local yes/no
        entitlement so ads stay off offline and after a restart. Google handles
        purchase data under its own privacy policy.
      </p>
      <p>
        Videofit never sends your videos, frames, filenames, thumbnails, or
        Library and History entries to the ad SDK. Ad requests may include
        technical information such as your IP address, device model, operating
        system version, app version, and advertising identifier. Google
        processes that data under its own advertising policy. You can reset or
        delete your advertising ID in Android Settings.
      </p>

      <h2>Children</h2>
      <p>
        Videofit is a general-purpose video tool and is not directed at children
        under 13. It does not knowingly collect personal information from
        children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If the policy changes, the effective date above is updated. Material
        changes are described in the app&apos;s release notes.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy:{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Videofit is
        published by F7 Developer on Google Play.
      </p>

      <Link href="/products/" className="text-link">
        More F7 Developer apps ↗
      </Link>
    </article>
  );
}
