import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "MechScope 3D Privacy",
  "How MechScope 3D: How It Works handles your viewing progress, advertising, and the remove-ads purchase on Android.",
  "/privacy/mechscope-3d/",
);

export default function MechScopePrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        MechScope 3D privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 18, 2026</p>

      <p>
        MechScope 3D: How It Works is an interactive mechanical anatomy app for
        Android, published by F7 Developer. This policy explains what the app
        stores, what leaves your device, and why. It applies to the MechScope 3D
        Android application and nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account, no sign-in, no location access, and no analytics SDK of our own.</li>
        <li>
          Your viewing progress, saved mechanisms, and settings stay on your device.
          We do not run a server that holds your data.
        </li>
        <li>
          The free app shows a banner and occasional full-screen ads from Google
          AdMob, plus an optional rewarded ad you can choose to watch.
        </li>
        <li>
          You can remove banners and between-view ads permanently with a one-time
          purchase. Google Play processes the payment.
        </li>
        <li>
          The app does not request or use the Android advertising ID, and it does
          not ask for any advertising-ID related permissions.
        </li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Which mechanisms you have opened, playback and view preferences
          (solid, X-ray, section, exploded), simulation inputs you set, and which
          guided lessons you have completed.
        </li>
        <li>App settings such as audio, motion, and whether the remove-ads purchase was completed.</li>
      </ul>
      <p>
        Uninstalling MechScope 3D removes this local data. There is nothing stored
        on a server of ours to delete, and progress does not transfer between
        devices.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner in the app interface, an
        interstitial at natural breaks between mechanisms (rate limited), and an
        optional rewarded ad that grants nothing but your choice to watch it.
        Google may process approximate location derived from your connection and
        app interaction data to deliver and measure ads, as described in
        Google&apos;s own privacy policy. The app deliberately removes the Android
        advertising ID permission, so the advertising identifier is not collected
        or used by this app. Ad consent choices are available in the app&apos;s
        privacy options.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ad stays available as a choice.
      </p>

      <h2>Purchases</h2>
      <p>
        Remove ads is a one-time in-app purchase handled entirely by Google Play
        Billing. Google processes the payment and keeps your payment details. The
        app receives only a purchase confirmation so it can hide ads and restore
        that state after reinstalling with the same Google account. Refunds follow
        Google Play&apos;s refund policy.
      </p>

      <h2>Permissions and why they are used</h2>
      <ul>
        <li>
          <strong>INTERNET</strong> and <strong>ACCESS_NETWORK_STATE</strong> —
          request ads and contact Google Play for the remove-ads purchase.
        </li>
        <li>
          <strong>BILLING</strong> — read and complete the remove-ads purchase
          through Google Play.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        MechScope 3D has no account system, no analytics SDK of its own, no
        crash-reporting SDK that uploads personal data, and no access to your
        contacts, messages, microphone, camera, photos, or precise location. It
        does not collect the Android advertising ID.
      </p>

      <h2>Children</h2>
      <p>
        MechScope 3D is intended for users aged 13 and over. It is not directed at
        children under 13, and we do not knowingly collect personal information
        from them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can clear all app data from Android settings, or uninstall the app, to
        remove everything it stored. You can change ad consent from the app&apos;s
        privacy options. Depending on where you live, you may have rights to
        access, correct, or delete personal data; because the app holds no
        server-side account data, most requests are satisfied by clearing local
        data.
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
