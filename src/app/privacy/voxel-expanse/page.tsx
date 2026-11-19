import Link from "next/link";
import { supportEmail } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Voxel Expanse Privacy",
  "How Voxel Expanse: Space Survival handles your saves, advertising, and the remove-ads purchase on Android.",
  "/privacy/voxel-expanse/",
);

export default function VoxelExpansePrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>
        Voxel Expanse privacy<span>.</span>
      </h1>
      <p className="muted">Effective November 19, 2026</p>

      <p>
        Voxel Expanse: Space Survival is an offline voxel survival and building
        game for Android, published by F7 Developer. This policy explains what the
        game stores, what leaves your device, and why. It applies to the Voxel
        Expanse Android application and nothing else.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>No account, no sign-in, no location access, and no analytics SDK of our own.</li>
        <li>
          Your worlds, colonies, inventories and settings stay on your device. We
          do not run a server that holds your saves.
        </li>
        <li>
          The free game shows a banner and occasional full-screen ads from Google
          AdMob, plus an optional rewarded ad you can choose to watch.
        </li>
        <li>
          You can remove banners and between-jump ads permanently with a one-time
          purchase. Google Play processes the payment.
        </li>
        <li>The game is fully playable offline.</li>
      </ul>

      <h2>What is stored on your device</h2>
      <ul>
        <li>
          Save data: explored worlds, terrain edits, built structures, machines and
          colonies, inventories, crafted items, tamed creatures, vehicles, quest
          progress and settings.
        </li>
        <li>Preferences such as audio, controls, and whether the remove-ads purchase was completed.</li>
      </ul>
      <p>
        Uninstalling Voxel Expanse removes this local data. There is nothing stored
        on a server of ours to delete, and saves do not transfer between devices.
      </p>

      <h2>Advertising</h2>
      <p>
        The free version uses Google AdMob for a banner in the menus, an
        interstitial after planet jumps and respawns (rate limited), and an
        optional rewarded ad that grants in-game shards only when you choose to
        watch it. Google may process a device advertising identifier, approximate
        location derived from your connection, and app interaction data to deliver
        and measure ads, as described in Google&apos;s own privacy policy. Ad
        consent choices are available in the game&apos;s privacy options, and you
        can reset or delete your advertising ID in Android settings.
      </p>
      <p>
        Buying the remove-ads product stops banner and interstitial requests. The
        optional rewarded ad stays available as a choice, because it grants shards
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
          <strong>INTERNET</strong> and <strong>ACCESS_NETWORK_STATE</strong> —
          request ads and contact Google Play for the remove-ads purchase.
        </li>
        <li>
          <strong>BILLING</strong> — read and complete the remove-ads purchase
          through Google Play.
        </li>
        <li>
          <strong>AD_ID</strong> — used by the Google Mobile Ads SDK so ads can be
          delivered and measured, as described above.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        Voxel Expanse has no account system, no analytics SDK of its own, no
        crash-reporting SDK that uploads personal data, and no access to your
        contacts, messages, microphone, camera, photos, or precise location.
      </p>

      <h2>Children</h2>
      <p>
        Voxel Expanse is intended for players aged 13 and over. It is not directed
        at children under 13, and we do not knowingly collect personal information
        from them.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can clear all app data from Android settings, or uninstall the game, to
        remove everything it stored. You can change ad consent from the in-game
        privacy options. Depending on where you live, you may have rights to
        access, correct, or delete personal data; because the game holds no
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
        For questions about this policy or the game, email{" "}
        <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      <Link href="/contact/" className="text-link">
        Contact the studio ↗
      </Link>
    </article>
  );
}
