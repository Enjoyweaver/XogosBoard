"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import { Container } from "@/primitives/Container";
import styles from "./MarketingHeader.module.css";
import { SignInIcon } from "@/icons";
import { signIn } from "next-auth/react";

export function MarketingHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(className, styles.header, isScrolled && styles.scrolled)}
      {...props}
    >
      <Container className={styles.container}>
        <div className={styles.logoAndLinks}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/images/fullLogo.jpeg"
                alt="Xogos Gaming"
                width={100}
                height={40}
                className={styles.logoImg}
              />
            </div>
          </Link>
          <nav
            className={clsx(styles.nav, mobileMenuOpen && styles.mobileOpen)}
          >
            <div className={styles.navLinkContainer}>
              <Link href="/games" className={styles.navLink}>
                Games
              </Link>
              <Link href="/about" className={styles.navLink}>
                About Us
              </Link>
              <Link href="/docs" className={styles.navLink}>
                Docs
              </Link>
              <Link href="/blog" className={styles.navLink}>
                Blog
              </Link>
              <Link href="/forum" className={styles.navLink}>
                Forum
              </Link>
              <Link href="/events" className={styles.navLink}>
                Events
              </Link>
              <Link href="/board" className={styles.navLink}>
                Board Room
              </Link>
            </div>
          </nav>
        </div>
        <div className={styles.actionButtons}>
          <Link href="/login" className={styles.boardButton}>
            <SignInIcon />
            <span>Board Sign-In</span>
          </Link>
          <button
            className={clsx(
              styles.mobileMenuToggle,
              mobileMenuOpen && styles.mobileOpen
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </Container>
    </header>
  );
}
