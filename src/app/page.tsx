import Image from "next/image";
import Link from "next/link";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import styles from "./page.module.css";

const contactLinks = [
  {
    label: "email",
    href: "mailto:derek.b.hoang@gmail.com",
    value: "derek.b.hoang@gmail.com",
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/derek.b.hoang",
    value: "facebook.com/derek.b.hoang",
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/derek.b.hoang/",
    value: "instagram.com/derek.b.hoang",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/derekhoang/",
    value: "linkedin.com/in/derekhoang",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.copy}>
          <p className={styles.prompt} aria-label="derek@portfolio:~$ whoami">
            <span className={styles.promptUser}>derek</span>
            <span className={styles.promptMuted}>@</span>
            <span>portfolio</span>
            <span className={styles.promptMuted}>:</span>
            <span className={styles.promptPath}>~</span>
            <span className={styles.promptCommand}>$ whoami</span>
          </p>

          <h1 id="intro-title" className={styles.title}>
            Derek Hoang
          </h1>

          <p className={styles.lede}>
            Developer-minded builder crafting useful software, crisp web
            interfaces, and experiments that make the terminal feel a little
            more alive.
          </p>

          <div className={styles.commandList} aria-label="Portfolio directories">
            <Link href="/projects">~/projects</Link>
            <Link href="/blog">~/blog</Link>
            <a href="mailto:derek.b.hoang@gmail.com">./ping.sh</a>
          </div>
        </div>

        <TerminalWindow
          as="aside"
          className={styles.panel}
          title="~/contact/links.output"
          aria-label="Contact links terminal output"
        >
          <div className={styles.portraitFrame}>
            <Image
              src="/derek-photo-1.jpg"
              alt="Portrait of Derek Hoang"
              width={4032}
              height={3024}
              priority
              sizes="(max-width: 720px) 82vw, (max-width: 1100px) 38vw, 420px"
              className={styles.portrait}
            />
          </div>

          <dl className={styles.identityGrid}>
            {contactLinks.map(({ label, href, value }) => {
              const isExternal = href.startsWith("https://");

              return (
                <div key={label} className={styles.identityLine}>
                  <dt>{label}</dt>
                  <dd>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>
        </TerminalWindow>
      </section>
    </main>
  );
}
