"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MarketingLayout } from "@/layouts/Marketing/Marketing";
import styles from "./page.module.css";

// SVG Icons for features and ecosystem
const GameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const LearnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
  </svg>
);

const EarnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
  </svg>
);

const TokenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9v2h2v-2h-2zm0-8v6h2V5h-2z" />
  </svg>
);

const VerificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
  </svg>
);

const AIPIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// Game card component
interface GameProps {
  title: string;
  releaseDate: string;
  subject: string;
  description: string;
  status: "active" | "upcoming" | "beta";
  imageUrl: string;
}

const GameCard = ({
  title,
  releaseDate,
  subject,
  description,
  status,
  imageUrl,
}: GameProps) => {
  return (
    <div className={styles.gameCard}>
      <div className={styles.gameHeader}>
        <Image src={imageUrl} alt={title} fill className={styles.gameImage} />
        <div className={`${styles.gameStatus} ${styles[status]}`}>
          {status.toUpperCase()}
        </div>
      </div>
      <div className={styles.gameBody}>
        <div className={styles.gameSubject}>{subject}</div>
        <h3 className={styles.gameTitle}>{title}</h3>
        <p className={styles.gameDescription}>{description}</p>
      </div>
      <div className={styles.gameFooter}>
        <span className={styles.gameReleaseInfo}>
          {status === "active" ? "Available Now" : releaseDate}
        </span>
        <Link href="/games" className={styles.gameLink}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock data
  const stats = [
    { value: "10K+", label: "Students" },
    { value: "24", label: "Educational Games" },
    { value: "$250K", label: "Scholarship Funds" },
    { value: "15", label: "Partner Schools" },
  ];

  const features = [
    {
      icon: <GameIcon />,
      title: "Engaging Gameplay",
      description:
        "Fun, interactive games that make learning enjoyable while building important skills across various subjects.",
    },
    {
      icon: <LearnIcon />,
      title: "Educational Content",
      description:
        "Curriculum-aligned material that reinforces classroom learning and expands knowledge in key areas.",
    },
    {
      icon: <EarnIcon />,
      title: "Reward System",
      description:
        "Earn coins that can be saved and converted into scholarship funds for future education.",
    },
  ];

  const ecosystemItems = [
    {
      icon: <TokenIcon />,
      title: "Dual-Token Economy",
      description:
        "Our platform uses a unique dual-token system with iPlay educational tokens for in-platform rewards and iServ tokens for governance and market connection.",
    },
    {
      icon: <VerificationIcon />,
      title: "Achievement Verification",
      description:
        "Educational achievements are securely verified through our oracle network, ensuring genuine educational accomplishment is rewarded.",
    },
    {
      icon: <AIPIcon />,
      title: "Active Incentive Programs",
      description:
        "Beyond digital games, earn rewards through real-world activities including volunteer work, physical education, and peer tutoring.",
    },
    {
      icon: <EarnIcon />,
      title: "Scholarship Conversion",
      description:
        "Convert your earned tokens into real scholarship value through our transparent conversion system tied to educational milestones.",
    },
  ];

  const games = [
    {
      title: "Math Kingdom",
      releaseDate: "November 2024",
      subject: "Mathematics",
      description:
        "Master numerical concepts through medieval strategic gameplay. Build kingdoms, manage resources, and solve math problems.",
      status: "upcoming" as const,
      imageUrl: "/images/game1.jpg",
    },
    {
      title: "Historical Legends",
      releaseDate: "January 2025",
      subject: "History",
      description:
        "Explore historical periods and learn about important events and figures through interactive storytelling and challenges.",
      status: "upcoming" as const,
      imageUrl: "/images/game2.jpg",
    },
    {
      title: "Science Explorer",
      releaseDate: "Available Now",
      subject: "Science",
      description:
        "Conduct virtual experiments and solve scientific puzzles in this hands-on learning adventure.",
      status: "active" as const,
      imageUrl: "/images/game3.jpg",
    },
    {
      title: "Financial Quest",
      releaseDate: "In Development",
      subject: "Financial Literacy",
      description:
        "Learn financial concepts and money management skills through real-world simulations and challenges.",
      status: "beta" as const,
      imageUrl: "/images/game4.jpg",
    },
  ];

  const pricingPlans = [
    {
      type: "Monthly",
      amount: "$6",
      period: "per month",
      features: [
        "Access to all educational games",
        "Progress tracking",
        "Basic reward earning",
        "Cancel anytime",
      ],
    },
    {
      type: "Annual",
      amount: "$60",
      period: "per year",
      features: [
        "Save 16% compared to monthly",
        "Access to all educational games",
        "Enhanced reward earning (10% bonus)",
        "Priority support",
      ],
    },
    {
      type: "Lifetime",
      amount: "$120",
      period: "one-time payment",
      features: [
        "Permanent access to all games",
        "Maximum reward earning (15% bonus)",
        "Early access to new releases",
        "VIP support",
      ],
    },
  ];

  return (
    <MarketingLayout>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGrid}></div>
            <div className={styles.heroAccent}></div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <h1
                className={`${styles.heroTitle} ${isLoaded ? styles.visible : ""}`}
              >
                Transforming Education Through{" "}
                <span className={styles.heroEmphasis}>Gaming</span>
              </h1>

              <div
                className={`${styles.heroTagline} ${isLoaded ? styles.visible : ""}`}
              >
                <span className={styles.heroPlay}>Play</span>
                <span className={styles.heroLearn}>Learn</span>
                <span className={styles.heroEarn}>Earn</span>
              </div>

              <p
                className={`${styles.heroDescription} ${isLoaded ? styles.visible : ""}`}
              >
                Xogos combines engaging gameplay with meaningful education,
                allowing students to earn rewards that convert into real
                scholarship opportunities.
              </p>

              <div
                className={`${styles.ctaButtons} ${isLoaded ? styles.visible : ""}`}
              >
                <Link href="/games" className={styles.primaryButton}>
                  Explore Games
                </Link>
                <Link href="/membership" className={styles.secondaryButton}>
                  Join Membership
                </Link>
              </div>
            </div>

            <div
              className={`${styles.heroRight} ${isLoaded ? styles.visible : ""}`}
            >
              <div className={styles.heroImageContainer}>
                <div className={styles.heroLogoDisplay}>
                  <Image
                    src="/images/fullLogo.jpeg"
                    alt="Xogos Gaming Logo"
                    fill
                    className={styles.heroMainLogo}
                    priority
                  />
                </div>
                <div className={styles.heroImageOverlay}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Why Choose Xogos</h2>
            <p className={styles.sectionSubtitle}>
              Our platform combines educational value with engaging gameplay to
              create meaningful learning experiences.
            </p>
          </div>

          <div className={styles.featuresContainer}>
            <div className={styles.featuresWrapper}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Section (based on whitepaper content) */}
        <section className={styles.ecosystemSection}>
          <div className={styles.ecosystemBackground}>
            <div className={styles.ecosystemGrid}></div>
          </div>

          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Our Ecosystem</h2>
            <p className={styles.sectionSubtitle}>
              Discover how our innovative platform creates pathways from
              educational gaming to real-world opportunities.
            </p>
          </div>

          <div className={styles.ecosystemContainer}>
            <div className={styles.ecosystemCard}>
              <div className={styles.ecosystemContent}>
                {ecosystemItems.map((item, index) => (
                  <div key={index} className={styles.ecosystemItem}>
                    <div className={styles.ecosystemItemTitle}>
                      <div className={styles.ecosystemItemIcon}>
                        {item.icon}
                      </div>
                      {item.title}
                    </div>
                    <p className={styles.ecosystemItemDescription}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className={styles.gamesSection}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Featured Games</h2>
            <p className={styles.sectionSubtitle}>
              Explore our collection of educational games designed to make
              learning fun and rewarding.
            </p>
          </div>

          <div className={styles.gamesContainer}>
            <div className={styles.gamesGrid}>
              {games.map((game, index) => (
                <GameCard
                  key={index}
                  title={game.title}
                  releaseDate={game.releaseDate}
                  subject={game.subject}
                  description={game.description}
                  status={game.status}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>

            <div className={styles.gamesViewAll}>
              <Link href="/games" className={styles.primaryButton}>
                View All Games
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section - Based on Technical Whitepaper */}
        <section className={styles.howItWorksSection}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              Our three-step process makes it easy to turn educational
              achievements into future opportunities.
            </p>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepLeft}></div>
              <div className={styles.stepRight}>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Play Educational Games</h3>
                  <p className={styles.stepDescription}>
                    Engage with our collection of fun, interactive games
                    designed to build knowledge and skills across multiple
                    subject areas. Each achievement is verified through our
                    secure blockchain technology, ensuring genuine educational
                    progress.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepLeft}>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Save & Multiply Rewards</h3>
                  <p className={styles.stepDescription}>
                    As you earn iPlay tokens through educational achievements,
                    you can save them in the Xogos Bank where they grow through
                    our multiplier system. The longer you save, the more your
                    tokens grow – up to 2x after 180 days.
                  </p>
                </div>
              </div>
              <div className={styles.stepRight}></div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepLeft}></div>
              <div className={styles.stepRight}>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Convert to Scholarships</h3>
                  <p className={styles.stepDescription}>
                    Transform your accumulated tokens into real scholarship
                    funds through our transparent conversion system. Your
                    educational achievements directly contribute to your
                    academic future, creating a path from gaming to higher
                    education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricingSection}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Membership Plans</h2>
            <p className={styles.sectionSubtitle}>
              Choose the membership option that works best for you and start
              your educational gaming journey.
            </p>
          </div>

          <div className={styles.pricingContainer}>
            <div className={styles.pricingCards}>
              {pricingPlans.map((plan, index) => (
                <div key={index} className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <div className={styles.pricingType}>{plan.type}</div>
                    <div className={styles.pricingAmount}>{plan.amount}</div>
                    <div className={styles.pricingPeriod}>{plan.period}</div>
                  </div>
                  <div className={styles.pricingBody}>
                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.pricingFooter}>
                    <Link
                      href="/membership"
                      className={`${styles.primaryButton} ${styles.pricingCta}`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContainer}>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>Stay Updated</h2>
              <p className={styles.sectionSubtitle}>
                Subscribe to our newsletter for the latest games, educational
                resources, and platform updates.
              </p>
            </div>

            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>

            <p className={styles.newsletterDisclaimer}>
              We respect your privacy and will never share your information.
            </p>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
