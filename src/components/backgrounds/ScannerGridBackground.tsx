"use client";

import { useEffect, useRef } from "react";
import styles from "./ScannerGridBackground.module.css";

export default function ScannerGridBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let frameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let targetOpacity = 0;
    let currentOpacity = 0;

    const writeVars = () => {
      root.style.setProperty("--scanner-x", `${currentX}px`);
      root.style.setProperty("--scanner-y", `${currentY}px`);
      root.style.setProperty("--scanner-opacity", currentOpacity.toFixed(3));
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      currentOpacity += (targetOpacity - currentOpacity) * 0.14;

      writeVars();

      const isMoving =
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1 ||
        Math.abs(targetOpacity - currentOpacity) > 0.01;

      if (isMoving) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        currentOpacity = targetOpacity;
        writeVars();
        frameId = 0;
      }
    };

    const startAnimation = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const revealAt = (x: number, y: number) => {
      targetX = x;
      targetY = y;
      targetOpacity = 1;
      startAnimation();
    };

    const hideScanner = () => {
      targetOpacity = 0;
      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      revealAt(event.clientX, event.clientY);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        hideScanner();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      revealAt(event.clientX, event.clientY);
    };

    const handleResize = () => {
      if (targetOpacity === 0) {
        targetX = window.innerWidth / 2;
        targetY = window.innerHeight / 2;
        currentX = targetX;
        currentY = targetY;
        writeVars();
      }
    };

    writeVars();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", hideScanner);
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideScanner);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.background} aria-hidden="true">
      <div className={`${styles.gridLayer} ${styles.staticGrid}`} />
      <div className={`${styles.gridLayer} ${styles.neonGrid}`} />
      <div className={styles.scannerGlow} />
      <div className={styles.vignette} />
    </div>
  );
}
