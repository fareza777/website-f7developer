import Link from "next/link";
import { Brand } from "./header";
import { ArrowUpRightIcon, GithubLogoIcon, GooglePlayLogoIcon } from "./icons";
import { developerUrl } from "@/lib/data";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand footer />
            <p>
              Small Studio. Big Ideas.
              <br />
              Games to get lost in. Tools to get things done.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/games/">Games</Link>
            <Link href="/products/">Products</Link>
            <Link href="/discover/">Discover</Link>
            <Link href="/studio/">Studio</Link>
            <Link href="/updates/">Updates</Link>
            <Link href="/contact/">Contact</Link>
          </nav>
          <div className="footer-socials">
            <a href={developerUrl} target="_blank" rel="noopener noreferrer">
              <GooglePlayLogoIcon size={18} /> Google Play{" "}
              <ArrowUpRightIcon size={15} />
            </a>
            <a
              href="https://github.com/fareza777"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={18} /> GitHub <ArrowUpRightIcon size={15} />
            </a>
            <SocialLinks />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} F7 Developer. All rights reserved.
          </span>
          <span>Independent by design. Made in Indonesia.</span>
          <Link href="/privacy/">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
