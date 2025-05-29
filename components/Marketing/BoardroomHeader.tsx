"use client"; // Mark this file as a Client Component in Next 13+

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "@/primitives/Container";
import styles from "./BoardroomHeader.module.css";

export function BoardroomHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to determine active link
  const isActive = (path: string) => {
    if (typeof window !== "undefined") {
      return window.location.pathname.startsWith(path);
    }
    return false;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Container className={styles.container}>
        <div className={styles.logoAndLinks}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>XOGOS BOARD</span>
          </Link>
          <div className={styles.navLinkContainer}>
            <Link
              href="/board"
              className={`${styles.navLink} ${
                isActive("/") && !isActive("/board") ? styles.active : ""
              }`}
            >
              Board Room
            </Link>
            <Link
              href="/board"
              className={`${styles.navLink} ${
                isActive("/board") ? styles.active : ""
              }`}
            >
              Members
            </Link>
            <Link
              href="/boardinitiatives"
              className={`${styles.navLink} ${
                isActive("/boardinitiatives") ? styles.active : ""
              }`}
            >
              Board Initiatives
            </Link>
            <Link
              href="/risk"
              className={`${styles.navLink} ${isActive("/risk") ? styles.active : ""}`}
            >
              Risk
            </Link>
            <Link
              href="/tokenomics"
              className={`${styles.navLink} ${
                isActive("/tokenomics") ? styles.active : ""
              }`}
            >
              Tokenomics
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
