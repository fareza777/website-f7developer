import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Downloader Privacy",
  "How F7 Download Manager, the Android download manager, handles your links, downloaded files, advertising, and the remove-ads purchase.",
  "/privacy/download-manager/",
);

export default function DownloadManagerPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Downloader privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 13, 2026</p>

      <p>
        F7 Download Manager downloads files straight to your phone. This policy
        explains what the app does with information, in plain language.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>
          Downloads go from the server you chose to your device. We do not
          operate a relay, proxy, or cloud account for your files.
        </li>
        <li>There are no accounts, analytics, or crash-reporting SDKs.</li>
        <li>
          The free app shows ads from Google AdMob, which may collect a device
          identifier and ad interaction data to serve and measure ads. Your
          links and files are never sent to advertisers.
        </li>
        <li>
          You can remove ads permanently with a one-time purchase. Google Play
          processes the payment; the app never receives your payment details.
        </li>
        <li>
          Network access is used for downloads, the built-in browser, ads, and
          the remove-ads purchase.
        </li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Downloaded files, in the folder you pick through Android's document
          picker, or in the app's Downloads folder when you have not picked one.
        </li>
        <li>
          A local Library database with the link, file name, size, progress,
          status, and destination path of each item, so the queue survives a
          restart.
        </li>
        <li>
          Settings such as theme, connection count, speed limit, folder, Wi-Fi
          and charging rules, browser home page, history, bookmarks, and
          remove-ads status.
        </li>
      </ul>
      <p>
        Uninstalling the app removes its private data. Files you downloaded
        remain in the folder where you saved them.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — connects to the servers you download from,
          loads pages in the built-in browser, requests ads, and contacts Google
          Play for the remove-ads purchase.
        </li>
        <li>
          <strong>ACCESS_NETWORK_STATE</strong> — lets the queue and the ad SDK
          check connectivity, and enforces Wi-Fi-only rules.
        </li>
        <li>
          <strong>POST_NOTIFICATIONS</strong> — shows download progress and
          finished-download notifications.
        </li>
        <li>
          <strong>WAKE_LOCK</strong> — keeps the CPU awake while a transfer runs
          so it is not cut off mid-file. It is not held otherwise.
        </li>
        <li>
          <strong>com.android.vending.BILLING</strong> — processes the one-time
          Remove ads purchase through Google Play. The app stores only a local
          entitlement.
        </li>
      </ul>
      <p>
        Files are read and written through Android's storage access framework
        and MediaStore. The app receives access only to the folder you choose.
      </p>

      <h2>The built-in browser</h2>
      <p>
        Pages you open in the built-in browser load directly from the website,
        which may receive your IP address and the usual request information.
        History and bookmarks are stored only on your device and can be cleared
        in Settings. The browser is not a VPN and does not hide your traffic.
      </p>

      <h2>Advertising</h2>
      <p>
        The app is free and supported by ads served by Google AdMob. A banner
        sits inside the layout, an interstitial may appear between actions (at
        most once every two minutes), and Settings offers two ways to turn ads
        off: a one-time in-app purchase that removes them permanently, or an
        optional rewarded ad that hides them for 24 hours.
      </p>
      <p>
        The purchase is processed entirely by Google Play. The app receives only
        the product ID and a purchase token to verify entitlement; it never sees
        your name, card, or billing address. Google handles purchase data under
        its own privacy policy.
      </p>
      <p>
        The app never sends your download links, file names, file contents, or
        browser history to the ad SDK. Ad requests may include technical
        information such as your IP address, device model, operating system
        version, app version, and advertising identifier. You can reset or
        delete your advertising ID in Android Settings.
      </p>

      <h2>Children</h2>
      <p>
        The app is a general-purpose file tool and is not directed at children
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
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. F7 Download
        Manager is published by F7 Developer on Google Play.
      </p>

      <Link href="/products/" className="text-link">
        More F7 Developer apps ↗
      </Link>
    </article>
  );
}
