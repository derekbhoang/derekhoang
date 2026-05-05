import type { ReactNode } from "react";
import styles from "./TerminalWindow.module.css";

type TerminalWindowElement = "aside" | "section" | "div";

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  as?: TerminalWindowElement;
};

export default function TerminalWindow({
  title,
  children,
  className,
  "aria-label": ariaLabel,
  as: Element = "section",
}: TerminalWindowProps) {
  const windowClassName = className
    ? `${styles.window} ${className}`
    : styles.window;

  return (
    <Element className={windowClassName} aria-label={ariaLabel}>
      <div className={styles.header} aria-hidden="true">
        <span />
        <span />
        <span />
        <code>{title}</code>
      </div>

      {children}
    </Element>
  );
}
