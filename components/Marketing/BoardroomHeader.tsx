"use client";

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
      // Use exact matching for the main board room
      if (path === "/board") {
        return window.location.pathname === "/board";
      }
      // Use startsWith for other paths
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
              className={`${styles.navLink} ${isActive("/board") ? styles.active : ""}`}
            >
              Board Room
            </Link>
            <Link
              href="/board/members"
              className={`${styles.navLink} ${isActive("/board/members") ? styles.active : ""}`}
            >
              Members
            </Link>
            <Link
              href="/board/initiatives"
              className={`${styles.navLink} ${isActive("/board/initiatives") ? styles.active : ""}`}
            >
              Initiatives
            </Link>
            <Link
              href="/board/risk"
              className={`${styles.navLink} ${isActive("/board/risk") ? styles.active : ""}`}
            >
              Risk
            </Link>
            <Link
              href="/board/tokenomics"
              className={`${styles.navLink} ${isActive("/board/tokenomics") ? styles.active : ""}`}
            >
              Tokenomics
            </Link>
            <Link
              href="/board/market-insights"
              className={`${styles.navLink} ${isActive("/board/insights") ? styles.active : ""}`}
            >
              Insights
            </Link>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <div className={styles.buttonGroup}>
            <Link href="/" className={styles.backButton}>
              Back to Main Site
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
