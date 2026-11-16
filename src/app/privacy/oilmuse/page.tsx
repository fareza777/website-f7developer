import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "OilMuse Privacy",
  "How OilMuse, the on-device oil painting studio for Android, handles your photographs, projects, advertising, and purchases.",
  "/privacy/oilmuse/",
);

export default function OilMusePrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        OilMuse privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 16, 2026</p>

      <p>
        OilMuse is an offline painting studio for Android, published by F7 Developer.
        This policy explains what the app stores, what leaves your device and why. It
        applies to the OilMuse Android application and nothing else.
      </p>

      <h2>Your photographs</h2>
      <p>
        Photographs you import from the camera or the gallery are read only when you
        choose them. They are processed entirely on your device by the painting engine
        and are never uploaded to F7 Developer or to any third party. A working copy, the
        painted surface and a thumbnail are saved in the app&apos;s private storage so
        that your projects survive a restart, and they are deleted when you delete the
        project or uninstall the app. Exporting a painting writes a new image to your
        device&apos;s Pictures collection at your explicit request.
      </p>

      <h2>Camera and photo permissions</h2>
      <p>
        The camera permission is requested only when you tap the camera action, so that
        the app can take the photograph you want to paint. Access to your photo library
        uses Android&apos;s system photo picker, which hands the app only the images you
        pick. OilMuse does not browse, index or scan your gallery in the background.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version shows a banner on the library screen and, after certain completed
        actions, an interstitial ad. Optional rewarded ads unlock Ultra HD export when you
        choose to watch one. Ads are served by Google AdMob. Google may receive device
        information, a resettable advertising identifier, approximate location derived
        from your IP address, and ad interaction data, under Google&apos;s own privacy
        policy. OilMuse asks for your consent through Google&apos;s User Messaging Platform
        before requesting personalised ads where the law requires it; you can change that
        choice at any time from Settings, Privacy and ads, Manage consent. The Remove Ads
        purchase turns off banners and interstitials.
      </p>

      <h2>Purchases</h2>
      <p>
        Remove Ads is a one-time in-app purchase processed by Google Play Billing. F7
        Developer never receives or stores your payment card details. The app stores only
        a local flag confirming the entitlement, and re-checks it with Google Play when you
        open the app or tap Restore purchase.
      </p>

      <h2>What we do not collect</h2>
      <p>
        OilMuse has no account system, no analytics SDK of its own, no crash-reporting SDK
        that uploads personal data, and no access to your contacts, messages, microphone,
        files or precise location. The app does not build a profile of you and does not
        sell data.
      </p>

      <h2>Children</h2>
      <p>
        OilMuse is not directed at children under 13. The app does not knowingly collect
        personal information from children. If you believe a child has provided
        information through an advertising or purchase interaction, contact us so that we
        can help resolve it.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can delete any painting and its source photograph from the collection screen,
        clear all app data from Android settings, or uninstall the app to remove
        everything it stored. You can withdraw advertising consent from Settings at any
        time. Depending on where you live, you may have rights to access, correct or delete
        personal data; because the app itself holds no server-side account data, most
        requests are satisfied by deleting your local projects.
      </p>

      <h2>Data retention and security</h2>
      <p>
        Project files live in the app&apos;s sandboxed internal storage and are protected
        by Android&apos;s application sandbox. Exported images are written only where you
        ask. No retention period applies to data on a server because the painting workflow
        has no server component.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy when features change. The effective date above will
        change with it, and material changes will be disclosed in the app&apos;s Play Store
        listing notes.
      </p>

      <h2>Questions</h2>
      <p>
        Questions about privacy can be sent to{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or through the developer
        contact details on the OilMuse Google Play listing.
      </p>
      <Link href="/contact/" className="text-link">
        Contact the studio ↗
      </Link>
    </article>
  );
}
