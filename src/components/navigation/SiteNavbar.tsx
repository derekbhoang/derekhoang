"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./SiteNavbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const pingHref = "mailto:derek.b.hoang@gmail.com";

const getShellPath = (href: string) => (href === "/" ? "~" : `~${href}`);

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobilePanelId = useId();
  const pathname = usePathname();
  const shellRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getAriaCurrent = (href: string): "page" | "location" | undefined => {
    if (pathname === href) {
      return "page";
    }

    return isActivePath(href) ? "location" : undefined;
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        shellRef.current &&
        event.target instanceof Node &&
        !shellRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 721px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        closeMenu();
      }
    };

    closeOnDesktop();

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePointer);
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <header ref={shellRef} className={styles.shell}>
      <nav className={styles.commandBar} aria-label="Primary navigation">
        <Link
          href="/"
          className={styles.brand}
          aria-label="Derek Hoang home"
          onClick={closeMenu}
        >
          <span className={styles.brandMark} aria-hidden="true">
            DH
          </span>
          <span className={styles.brandText} aria-hidden="true">
            <span className={styles.brandUser}>derek</span>
            <span className={styles.brandPunctuation}>@</span>
            <span className={styles.brandHost}>portfolio</span>
            <span className={styles.brandPunctuation}>:</span>
            <span className={styles.brandPath}>~</span>
            <span className={styles.brandShell}>$</span>
          </span>
        </Link>

        <span className={styles.statusDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span className={styles.separator} aria-hidden="true">
          ::
        </span>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => {
            const isActive = isActivePath(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                aria-label={link.label}
                aria-current={getAriaCurrent(link.href)}
              >
                <span>{getShellPath(link.href)}</span>
                <span className={styles.navPrompt} aria-hidden="true">
                  <span className={styles.promptDollar}> $</span>
                  <span className={styles.promptCursor} />
                </span>
              </Link>
            );
          })}
        </div>

        <a href={pingHref} className={styles.cta} aria-label="Email Derek Hoang">
          ./ping.sh
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-controls={mobilePanelId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close primary navigation" : "Open primary navigation"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">$</span>
          <span>{isMenuOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      <div
        id={mobilePanelId}
        className={styles.mobilePanel}
        hidden={!isMenuOpen}
      >
        <div className={styles.mobilePanelInner}>
          <div className={styles.mobileMeta} aria-hidden="true">
            <span>ls ~/nav</span>
            <span>ready</span>
          </div>
          {navLinks.map((link) => {
            const isActive = isActivePath(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isActive ? styles.activeMobileLink : ""}`}
                aria-label={link.label}
                aria-current={getAriaCurrent(link.href)}
                onClick={closeMenu}
              >
                <span>{getShellPath(link.href)}</span>
                <span className={styles.navPrompt} aria-hidden="true">
                  <span className={styles.promptDollar}> $</span>
                  <span className={styles.promptCursor} />
                </span>
              </Link>
            );
          })}
          <a
            href={pingHref}
            className={styles.mobileCta}
            aria-label="Email Derek Hoang"
            onClick={closeMenu}
          >
            ./ping.sh
          </a>
        </div>
      </div>
    </header>
  );
}
