"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@/components/icons";

const navigation = [
  ["Games", "/games/"],
  ["Products", "/products/"],
  ["Discover", "/discover/"],
  ["Studio", "/studio/"],
  ["Updates", "/updates/"],
  ["Contact", "/contact/"],
];

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={`brand${footer ? " brand-footer" : ""}`}
      href="/"
      aria-label="F7 Developer home"
    >
      <span className="brand-mark" aria-hidden="true">
        F<span>7</span>
        <i />
      </span>
      <span className="brand-name">
        F7 <strong>DEVELOPER</strong>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && links?.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === menuButton.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          menuButton.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              className={pathname.startsWith(href) ? "active" : ""}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/games/" className="header-cta">
          Explore games <ArrowUpRightIcon size={16} />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
      </div>
      {open && (
        <nav
          ref={menuRef}
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, href], i) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-index">0{i + 1}</span>
              {label}
              <ArrowUpRightIcon size={24} />
            </Link>
          ))}
          <p>Small Studio. Big Ideas.</p>
        </nav>
      )}
    </header>
  );
}
