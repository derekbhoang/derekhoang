import Image from "next/image";
import Link from "next/link";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import { contactLinks } from "@/content/site";
import styles from "./page.module.css";

const aboutCommands = [
  {
    command: "./build",
    output: "turn ideas into useful web experiences with clean structure",
  },
  {
    command: "./learn",
    output: "keep sharpening through experiments, docs, and iteration",
  },
  {
    command: "./ship",
    output: "polish the details until the interface feels fast and dependable",
  },
];

const aboutStack = ["Next.js", "React", "TypeScript", "CSS Modules", "UI craft"];

const projects = [
  {
    name: "portfolio-shell",
    path: "~/projects/portfolio-shell",
    status: "active",
    summary:
      "A Bash-inspired personal site with neon terminal UI, responsive navigation, and a reusable shell component system.",
    stack: ["Next.js", "React", "CSS Modules"],
  },
  {
    name: "scanner-grid",
    path: "~/projects/scanner-grid",
    status: "live",
    summary:
      "An interactive cursor-reactive background that reveals a glowing cyber grid as visitors move through the page.",
    stack: ["React", "Pointer Events", "CSS"],
  },
  {
    name: "terminal-window",
    path: "~/projects/terminal-window",
    status: "shipped",
    summary:
      "A reusable terminal frame for file-like sections, command output, contact links, and future project readouts.",
    stack: ["TypeScript", "A11y", "Design System"],
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

      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionPrompt}>
            derek@portfolio:~/about$ cat README.md
          </p>
          <h2 id="about-title" className={styles.sectionTitle}>
            About
          </h2>
        </div>

        <div className={styles.aboutGrid}>
          <TerminalWindow
            className={styles.aboutReadme}
            title="~/about/README.md"
            aria-label="About Derek terminal readme"
          >
            <div className={styles.aboutReadmeBody}>
              <p>
                Derek Hoang is a developer-minded builder drawn to practical
                software, crisp interfaces, and systems that feel clear from
                the first interaction.
              </p>
              <p>
                This portfolio leans into that taste: dark mode, neon edges,
                directory-style sections, and terminal prompts that make the
                site feel like something you can explore.
              </p>
            </div>
          </TerminalWindow>

          <TerminalWindow
            className={styles.aboutManifest}
            title="~/about/manifest.json"
            aria-label="About Derek working style"
          >
            <dl className={styles.aboutCommandList}>
              {aboutCommands.map((item) => (
                <div key={item.command} className={styles.aboutCommand}>
                  <dt>{item.command}</dt>
                  <dd>{item.output}</dd>
                </div>
              ))}
            </dl>

            <ul className={styles.aboutStack} aria-label="Core stack">
              {aboutStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TerminalWindow>
        </div>
      </section>

      <section
        id="projects"
        className={styles.projects}
        aria-labelledby="projects-title"
      >
        <div className={styles.sectionHeader}>
          <p className={styles.sectionPrompt}>
            derek@portfolio:~/projects$ ls -la
          </p>
          <h2 id="projects-title" className={styles.sectionTitle}>
            Projects
          </h2>
        </div>

        <TerminalWindow
          className={styles.projectsWindow}
          title="~/projects/index.output"
          aria-label="Selected projects terminal output"
        >
          <div className={styles.projectList}>
            {projects.map((project) => (
              <article key={project.name} className={styles.projectItem}>
                <div className={styles.projectMeta}>
                  <span>{project.path}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.name} stack`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </TerminalWindow>
      </section>

      <section
        id="contact"
        className={styles.contact}
        aria-labelledby="contact-title"
      >
        <div className={styles.sectionHeader}>
          <p className={styles.sectionPrompt}>
            derek@portfolio:~/contact$ ./ping.sh
          </p>
          <h2 id="contact-title" className={styles.sectionTitle}>
            Contact
          </h2>
        </div>

        <div className={styles.contactGrid}>
          <TerminalWindow
            className={styles.contactScript}
            title="~/contact/ping.sh"
            aria-label="Contact Derek terminal command"
          >
            <div className={styles.contactCommandOutput}>
              <p className={styles.contactStatus}>
                <span>status</span>
                <strong>ready for messages</strong>
              </p>
              <p>
                For the fastest route, send Derek an email. Social links are
                mounted next door as readable contact entries.
              </p>
              <a href="mailto:derek.b.hoang@gmail.com">send email</a>
            </div>
          </TerminalWindow>

          <TerminalWindow
            className={styles.contactDirectory}
            title="~/contact/links.json"
            aria-label="Contact links directory"
          >
            <ul className={styles.contactLinkList}>
              {contactLinks.map(({ label, href, value }) => {
                const isExternal = href.startsWith("https://");

                return (
                  <li key={label}>
                    <span>{label}</span>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      {value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </TerminalWindow>
        </div>
      </section>
    </main>
  );
}
