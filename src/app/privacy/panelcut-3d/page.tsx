import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "PanelCut 3D Privacy",
  "How PanelCut 3D, the offline-first furniture design and cut-list app for Android, handles your projects, materials, advertising, and purchases.",
  "/privacy/panelcut-3d/",
);

export default function PanelCut3DPrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        PanelCut 3D privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 5, 2026</p>

      <p>
        PanelCut 3D is a furniture design studio that keeps your projects on your
        device. This policy explains what the app does with information, in plain
        language.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>
          Projects, panels, materials, and settings stay on your device in a local
          database.
        </li>
        <li>There are no accounts, analytics, or crash-reporting SDKs.</li>
        <li>
          The free app shows ads from Google AdMob, which may collect a device
          identifier and ad interaction data to serve and measure ads. Your design
          data is never sent to advertisers.
        </li>
        <li>
          You can remove ads permanently with a one-time purchase. Google Play
          processes the payment; PanelCut 3D never receives your payment details.
        </li>
        <li>
          Network access is used only for ads and the remove-ads purchase.
        </li>
        <li>Designing, nesting, cut lists, costing, and exports work fully offline.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Projects, panels, parts, materials, and nesting settings in an
          app-private database.
        </li>
        <li>
          Preferences such as theme, currency, onboarding state, ad-free time, and
          remove-ads status in app-private storage.
        </li>
        <li>
          Exported PDF, CSV, and image files in locations you choose, including
          shared storage folders you grant the app access to.
        </li>
      </ul>
      <p>
        Uninstalling PanelCut 3D removes the app&apos;s private data. Files you
        exported remain wherever you saved them.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> — requests ads and talks to Google Play for the
          one-time purchase.
        </li>
        <li>
          <strong>com.android.vending.BILLING</strong> — processes the one-time
          Remove ads purchase through Google Play. PanelCut 3D stores only a local
          entitlement.
        </li>
        <li>
          <strong>Storage write access (Android 9 and earlier)</strong> — saves
          exported PDF, CSV, and image files where you choose.
        </li>
      </ul>
      <p>
        Design data is not uploaded to a server. PanelCut 3D has no backend of its
        own and does not proxy, inspect, or retain your projects.
      </p>

      <h2>Advertising</h2>
      <p>
        PanelCut 3D is free and supported by ads served by Google AdMob. A small
        banner appears on the home screen, an interstitial may appear at natural
        breaks such as closing a project, and Settings offers two ways to turn ads
        off: an optional rewarded ad that hides them for a limited time, or a
        one-time in-app purchase that removes them permanently.
      </p>
      <p>
        The purchase is processed entirely by Google Play. PanelCut 3D receives
        only the product ID and a purchase token to verify entitlement; it never
        sees your name, card, or billing address. The app stores a local yes/no
        entitlement so ads stay off offline and after a restart. Google handles
        purchase data under its own privacy policy.
      </p>
      <p>
        PanelCut 3D never sends project names, panel dimensions, cut lists, cost
        estimates, material names, or exported documents to the ad SDK. Ad requests
        may include technical information such as your IP address, device model,
        operating system version, app version, and advertising identifier. Google
        processes that data under its own advertising policy. You can reset or
        delete your advertising ID in Android Settings.
      </p>

      <h2>Children</h2>
      <p>
        PanelCut 3D is a professional design tool and is not directed at children
        under 13. It does not knowingly collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If the policy changes, the effective date above is updated. Material
        changes are described in the app&apos;s release notes.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy:{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. PanelCut 3D is
        published by F7 Developer on Google Play.
      </p>

      <Link href="/products/" className="text-link">
        More F7 Developer apps ↗
      </Link>
    </article>
  );
}
