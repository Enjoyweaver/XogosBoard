// app/board/market-insights/page.tsx
"use client";

import React from "react";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import { RSSFeedSection } from "../../../components/RSS/RSSFeedSection";
import styles from "./page.module.css";

export default function MarketInsightsPage() {
  return (
    <MarketingLayout>
      <div className={styles.insightsPage}>
        <Container className={styles.section}>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>Board Market Insights</h1>
            <p className={styles.heroLead}>
              Real-time regulatory updates and market analysis from the Xogos
              Board of Directors. Our expert commentary on SEC, CFTC, and
              cryptocurrency developments affecting educational gaming.
            </p>
          </div>
        </Container>

        <Container>
          <RSSFeedSection
            category="regulation"
            title="Regulatory Developments"
            description="SEC & CFTC updates with board analysis on compliance implications"
            showCommentaryForm={true}
          />

          <RSSFeedSection
            category="crypto"
            title="Cryptocurrency & Blockchain"
            description="Market movements and legal developments in digital assets"
            showCommentaryForm={true}
          />

          <RSSFeedSection
            category="education"
            title="Educational Technology"
            description="Trends at the intersection of gaming, blockchain, and education"
            showCommentaryForm={true}
          />

          <RSSFeedSection
            category="gaming"
            title="Blockchain Gaming Evolution"
            description="Play-to-earn developments and educational gaming innovations"
            showCommentaryForm={true}
          />
        </Container>

        {/* Call to Action Section */}
        <Container className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Stay Ahead of Regulation</h2>
            <p className={styles.ctaDescription}>
              Get weekly board insights on regulatory changes affecting
              educational blockchain gaming delivered to your inbox.
            </p>
            <form className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeButton}>
                Subscribe to Insights
              </button>
            </form>
          </div>
        </Container>
      </div>
    </MarketingLayout>
  );
}
