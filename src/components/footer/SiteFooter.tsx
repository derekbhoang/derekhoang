import Link from "next/link";
import { contactLinks, footerDirectories } from "@/content/site";
import styles from "./SiteFooter.module.css";

const systemRows = [
  ["stack", "Next.js / React / TypeScript"],
  ["theme", "dark shell + neon grid"],
  ["status", "online"],
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.shell}>
        <div className={styles.promptRow}>
          <p className={styles.prompt} aria-label="derek@portfolio:~$ tree -L 2">
            <span className={styles.promptUser}>derek</span>
            <span className={styles.promptMuted}>@</span>
            <span>portfolio</span>
            <span className={styles.promptMuted}>:</span>
            <span className={styles.promptPath}>~</span>
            <span className={styles.promptCommand}>$ tree -L 2</span>
          </p>

          <Link href="/" className={styles.rootLink}>
            cd ~
          </Link>
        </div>

        <div className={styles.grid}>
          <section className={styles.column} aria-labelledby="footer-map-title">
            <h2 id="footer-map-title">~/map</h2>
            <ul className={styles.linkList}>
              {footerDirectories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span>{item.path}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column} aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">~/contact</h2>
            <ul className={styles.linkList}>
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith("https://");

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <span>{link.label}</span>
                      <span>{link.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.column} aria-labelledby="footer-system-title">
            <h2 id="footer-system-title">~/system</h2>
            <dl className={styles.systemList}>
              {systemRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <span>Derek Hoang</span>
          <span>2026</span>
          <span>built as a personal portfolio shell</span>
        </div>
      </div>
    </footer>
  );
}
