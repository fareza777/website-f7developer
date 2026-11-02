import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Ochre Privacy",
  "How Ochre, the local-first Markdown notebook for Android, handles notes, attachments, advertising, purchases, and optional sync.",
  "/privacy/ochre/",
);

export default function OchrePrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Ochre privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 2, 2026</p>

      <p>
        Ochre is a notebook app that keeps your writing on your device. This
        policy explains what the app does with information, in plain language.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>Your notes, attachments, and settings stay on your device.</li>
        <li>There are no accounts, analytics, or crash-reporting SDKs.</li>
        <li>
          The free app shows ads from Google AdMob, which may collect a device
          identifier and ad interaction data to serve and measure ads. Note
          content is never sent to advertisers.
        </li>
        <li>
          You can remove ads permanently with a one-time purchase. Google Play
          processes the payment; Ochre never receives your payment details.
        </li>
        <li>
          Network access is used only for ads, the remove-ads purchase, and
          optional encrypted WebDAV sync.
        </li>
        <li>Writing, editing, and search work fully offline.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Notes, tags, links, and reminders in an app-private SQLite database.
        </li>
        <li>
          Photos, voice memos, and files in the app-private attachments folder.
        </li>
        <li>
          Preferences such as theme, lock timeout, sync server, onboarding,
          ad-free time, and remove-ads status in app-private storage.
        </li>
        <li>Encrypted backups and Markdown exports in locations you choose.</li>
      </ul>
      <p>
        Uninstalling Ochre removes the app&apos;s private data. Backups you
        exported remain wherever you saved them.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>RECORD_AUDIO</strong> — when you tap the voice-note button,
          records audio you choose to attach to a note. Nothing is recorded in
          the background.
        </li>
        <li>
          <strong>POST_NOTIFICATIONS</strong> — when you set your first
          reminder, shows reminder notifications and their inline actions.
        </li>
        <li>
          <strong>INTERNET</strong> — requests ads and optional WebDAV sync to a
          server you configure.
        </li>
        <li>
          <strong>ACCESS_NETWORK_STATE</strong> — lets the ad SDK check
          connectivity before requesting an ad.
        </li>
        <li>
          <strong>com.android.vending.BILLING</strong> — processes the one-time
          Remove ads purchase through Google Play. Ochre stores only a local
          entitlement.
        </li>
        <li>
          <strong>VIBRATE</strong> — haptic feedback for reminders.
        </li>
        <li>
          <strong>Biometric or device credential</strong> — unlocks Ochre
          through the system prompt when App lock is enabled. Ochre never
          receives your fingerprint, face data, or PIN.
        </li>
      </ul>
      <p>
        Photos and files are selected through the Android system photo picker
        and document picker. Ochre receives only the items you pick.
      </p>

      <h2>Advertising</h2>
      <p>
        Ochre is free and supported by ads served by Google AdMob. The timeline
        shows a small banner above the tab bar, an interstitial may appear after
        closing several notes, and Settings offers two ways to turn ads off: a
        one-time in-app purchase that removes them permanently, or an optional
        rewarded ad that hides them for 24 hours.
      </p>
      <p>
        The purchase is processed entirely by Google Play. Ochre receives only
        the product ID and a purchase token to verify entitlement; it never sees
        your name, card, or billing address. The app stores a local yes/no
        entitlement so ads stay off offline and after a restart. Google handles
        purchase data under its own privacy policy.
      </p>
      <p>
        Ochre never sends note titles, note content, tags, attachments, search
        queries, or sync credentials to the ad SDK. Ad requests may include
        technical information such as your IP address, device model, operating
        system version, app version, and advertising identifier. Google
        processes that data under its own advertising policy. You can reset or
        delete your advertising ID in Android Settings.
      </p>

      <h2>Optional WebDAV sync</h2>
      <p>
        If you enable sync, Ochre uploads an end-to-end encrypted archive to the
        WebDAV server whose address and credentials you enter. Encryption
        (PBKDF2-HMAC-SHA256 with 120,000 iterations and AES-256-GCM) happens on
        your device before upload. The server operator cannot read your notes.
        You can disable sync at any time; disabling it does not delete notes on
        your device.
      </p>
      <p>
        Ochre has no server of its own and does not proxy, inspect, or retain
        sync data.
      </p>

      <h2>Backups</h2>
      <p>
        Backups are written as a single encrypted archive. The passphrase is
        chosen by you and is never stored or transmitted. If you lose the
        passphrase, the backup cannot be recovered — by design.
      </p>

      <h2>Children</h2>
      <p>
        Ochre is a general-purpose note-taking tool and is not directed at
        children under 13. It does not knowingly collect personal information
        from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If the policy changes, the effective date above is updated. Material
        changes are described in the app&apos;s release notes.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy:{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Ochre is
        published by F7 Developer on Google Play.
      </p>

      <Link href="/products/" className="text-link">
        More F7 Developer apps ↗
      </Link>
    </article>
  );
}
