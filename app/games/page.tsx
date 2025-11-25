"use client";

import Image from "next/image";
import Link from "next/link";
// eslint-disable-next-line import/order, sort-imports
import React, { useEffect, useState } from "react";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

// Game type
interface Game {
  id: string;
  title: string;
  subject: string;
  description: string;
  imagePath: string;
  featured?: boolean;
  status: "active" | "beta" | "upcoming";
  features?: string[];
}

export default function GamesPage() {
  // Animation on scroll
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Games data based on whitepaper and existing content
  const games: Game[] = [
    {
      id: "historical-conquest-digital",
      title: "Historical Conquest Digital",
      subject: "History",
      description:
        "A strategic history-based game that resembles Pokémon in appearance and Risk in gameplay mechanics, with all cards based on historical figures, events, and places. Players earn iPlay coins for time spent in the game and can purchase additional decks using their earned coins.",
      imagePath: "/images/games/HistoricalConquest.jpg",
      featured: true,
      status: "active",
      features: [
        "Strategic card-based gameplay",
        "Real historical figures and events",
        "Collectible deck system",
        "Multiplayer battles",
        "Timeline learning",
      ],
    },
    {
      id: "debt-free-millionaire",
      title: "Debt-Free Millionaire",
      subject: "Personal Finance",
      description:
        "A personal finance and career simulation that teaches financial literacy through practical scenarios. Players explore career paths, learn about budgeting, debt management, and wealth-building, earning iPlay coins as their in-game avatar reaches different savings milestones.",
      imagePath: "/images/games/DebtFreeMil.jpg",
      featured: true,
      status: "active",
      features: [
        "Career simulation",
        "Budget management",
        "Credit building system",
        "Investment strategies",
        "Real-world scenarios",
      ],
    },
    {
      id: "time-quest",
      title: "Time Quest",
      subject: "History",
      description:
        "A competitive history adventure where players travel through time to complete missions in different historical periods. Test your ability to correctly place historical events, inventions, and figures in chronological order while exploring immersive historical environments.",
      imagePath: "/images/games/TimeQuest.jpg",
      featured: true,
      status: "active",
      features: [
        "Time travel gameplay",
        "Chronological challenges",
        "Historical missions",
        "Competitive multiplayer",
        "Educational achievements",
      ],
    },
    {
      id: "bug-and-seek",
      title: "Bug and Seek",
      subject: "Science",
      description:
        "A nature-based exploration game where students become the new owners of a broken-down insectarium. Players explore real-world ecosystems to catch up to 220 real-life bugs, each with fun facts and humor built into every codex entry. The game teaches entomology, biology, ecology, and environmental science.",
      imagePath: "/images/games/BugandSeek.jpg",
      featured: true,
      status: "active",
      features: [
        "220+ real insects to discover",
        "Ecosystem exploration",
        "Museum restoration",
        "Scientific facts database",
        "Environmental education",
      ],
    },
    {
      id: "totally-medieval",
      title: "Totally Medieval",
      subject: "Math",
      description:
        "Build your medieval kingdom while mastering math skills through strategic resource management and castle building. Players solve increasingly complex math problems to acquire resources, build structures, and defend their kingdoms from rivals.",
      imagePath: "/images/games/TotallyMedieval.jpg",
      featured: true,
      status: "upcoming",
      features: [
        "Kingdom building mechanics",
        "Progressive math challenges",
        "Resource management",
        "Strategic gameplay",
        "Medieval theme",
      ],
    },
    {
      id: "battles-and-thrones",
      title: "Battles and Thrones Simulator",
      subject: "History",
      description:
        "Lead historical kingdoms through epic battles and political intrigue. This simulation game teaches strategic thinking and historical context as players navigate alliances, conflicts, and resource management based on real historical scenarios.",
      imagePath: "/images/games/BattleThrones.jpg",
      status: "upcoming",
      features: [
        "Political simulation",
        "Alliance management",
        "Historical accuracy",
        "Strategic warfare",
        "Diplomatic gameplay",
      ],
    },
    {
      id: "prydes-gym",
      title: "Prydes Gym",
      subject: "Physical Education",
      description:
        "A virtual fitness adventure that encourages real-world physical activity. Players create workout routines, set fitness goals, and track progress through an engaging interface that makes exercise fun and rewarding.",
      imagePath: "/images/games/PrydesGym.jpg",
      status: "upcoming",
      features: [
        "Workout routine builder",
        "Fitness goal tracking",
        "Real-world activity sync",
        "Progress achievements",
        "Motivational challenges",
      ],
    },
    {
      id: "panic-attack",
      title: "Panic Attack!!",
      subject: "Health",
      description:
        "An innovative game that teaches stress management and mental health awareness. Players navigate through challenges while learning coping strategies, emotional intelligence, and healthy habits that can be applied in real-life situations.",
      imagePath: "/images/games/PanicAttack.jpg",
      status: "beta",
      features: [
        "Stress management techniques",
        "Emotional intelligence training",
        "Coping strategy development",
        "Mental health awareness",
        "Mindfulness exercises",
      ],
    },
    {
      id: "lightning-round",
      title: "Lightning Round",
      subject: "History",
      description:
        "A fast-paced quiz game that tests and improves historical knowledge through quick-fire questions, timed challenges, and competitive multiplayer modes. Perfect for classroom use or independent learning.",
      imagePath: "/images/games/Lightning.jpg",
      status: "beta",
      features: [
        "Fast-paced quiz format",
        "Timed challenges",
        "Multiplayer competition",
        "Classroom integration",
        "Historical knowledge base",
      ],
    },
  ];

  const subjects = Array.from(new Set(games.map((game) => game.subject)));

  const filteredGames = selectedSubject
    ? games.filter((game) => game.subject === selectedSubject)
    : games;

  const featuredGames = games.filter((game) => game.featured);

  const handleGameClick = (game: Game) => {
    setActiveGame(game);
  };

  const handleLearnMore = (gameId: string) => {
    if (gameId === "panic-attack") {
      window.location.href = "/games/panic-attack";
    }
  };

  const closeGameDetails = () => {
    setActiveGame(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return { text: "Available Now", className: styles.statusActive };
      case "beta":
        return { text: "Beta Testing", className: styles.statusBeta };
      case "upcoming":
        return { text: "Coming Soon", className: styles.statusUpcoming };
      default:
        return { text: "Available", className: styles.statusActive };
    }
  };

  return (
    <MarketingLayout>
      <div className={styles.gamesPage}>
        {/* Background elements */}
        <div className={styles.pageBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.bgGlow1}></div>
          <div className={styles.bgGlow2}></div>
          <div className={styles.bgGlow3}></div>
          <div className={styles.pixelOverlay}></div>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Container>
            <div className={styles.heroContent}>
              <h1
                className={`${styles.heroTitle} ${isLoaded ? styles.visible : ""}`}
              >
                Xogos <span className={styles.highlightText}>Games</span>
              </h1>
              <p
                className={`${styles.heroSubtitle} ${isLoaded ? styles.visible : ""}`}
              >
                Where learning meets play, turning education into an adventure
                that rewards real achievement
              </p>
            </div>
          </Container>
        </section>

        {/* Featured Games Section */}
        <section className={styles.featuredSection}>
          <Container>
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>Featured Games</h2>
                <div className={styles.sectionDecoration}></div>
                <p className={styles.sectionSubtitle}>
                  Discover our core educational games designed to make learning
                  engaging and rewarding
                </p>
              </div>

              <div className={styles.featuredGamesSlider}>
                {featuredGames.map((game, index) => (
                  <div
                    key={index}
                    className={styles.featuredGameCard}
                    onClick={() => handleGameClick(game)}
                  >
                    <div className={styles.gameImageContainer}>
                      <Image
                        src={game.imagePath}
                        alt={game.title}
                        width={320}
                        height={180}
                        className={styles.gameImage}
                      />
                      <div className={styles.gameOverlay}>
                        <div className={styles.gameSubject}>{game.subject}</div>
                        <div
                          className={`${styles.gameStatus} ${getStatusBadge(game.status).className}`}
                        >
                          {getStatusBadge(game.status).text}
                        </div>
                      </div>
                    </div>
                    <div className={styles.gameContent}>
                      <h3 className={styles.gameTitle}>{game.title}</h3>
                      <p className={styles.gameDescription}>
                        {game.description.length > 120
                          ? `${game.description.substring(0, 120)}...`
                          : game.description}
                      </p>
                      <button className={styles.gameDetailsButton}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Filter Section */}
        <section className={styles.filterSection}>
          <Container>
            <div className={styles.filterContainer}>
              <h3 className={styles.filterTitle}>Filter by Subject:</h3>
              <div className={styles.filterButtons}>
                <button
                  className={`${styles.filterButton} ${selectedSubject === null ? styles.active : ""}`}
                  onClick={() => setSelectedSubject(null)}
                >
                  All Subjects
                </button>
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    className={`${styles.filterButton} ${selectedSubject === subject ? styles.active : ""}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* All Games Grid */}
        <section className={styles.gamesGridSection}>
          <Container>
            <div className={styles.gamesGrid}>
              {filteredGames.map((game, index) => (
                <div
                  key={index}
                  className={styles.gameCard}
                  onClick={() => handleGameClick(game)}
                >
                  <div className={styles.gameCardImageContainer}>
                    <Image
                      src={game.imagePath}
                      alt={game.title}
                      width={280}
                      height={160}
                      className={styles.gameCardImage}
                    />
                    <div className={styles.gameCardOverlay}>
                      <div className={styles.gameCardSubject}>
                        {game.subject}
                      </div>
                      <div
                        className={`${styles.gameCardStatus} ${getStatusBadge(game.status).className}`}
                      >
                        {getStatusBadge(game.status).text}
                      </div>
                    </div>
                  </div>
                  <div className={styles.gameCardContent}>
                    <h4 className={styles.gameCardTitle}>{game.title}</h4>
                    <p className={styles.gameCardDescription}>
                      {game.description.length > 100
                        ? `${game.description.substring(0, 100)}...`
                        : game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <Container>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
              <p className={styles.ctaDescription}>
                Join thousands of students who are already earning while they
                learn. Start your educational gaming journey today and unlock
                real scholarship opportunities.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/membership" className={styles.primaryButton}>
                  Join Now
                </Link>
                <Link href="/scholarships" className={styles.secondaryButton}>
                  Learn About Scholarships
                </Link>
              </div>
              <div className={styles.ctaDecoration}>
                <div className={styles.pixelElement}></div>
                <div className={styles.pixelElement}></div>
                <div className={styles.pixelElement}></div>
              </div>
            </div>
          </Container>
        </section>

        {/* Game Details Modal */}
        {activeGame && (
          <div className={styles.gameModal} onClick={closeGameDetails}>
            <div
              className={styles.gameModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeModalButton}
                onClick={closeGameDetails}
              >
                ×
              </button>
              <div className={styles.gameModalHeader}>
                <div className={styles.gameModalImageContainer}>
                  <Image
                    src={activeGame.imagePath}
                    alt={activeGame.title}
                    width={500}
                    height={280}
                    className={styles.gameModalImage}
                  />
                  <div className={styles.gameModalOverlay}>
                    <div className={styles.gameModalSubject}>
                      {activeGame.subject}
                    </div>
                    <div
                      className={`${styles.gameModalStatus} ${getStatusBadge(activeGame.status).className}`}
                    >
                      {getStatusBadge(activeGame.status).text}
                    </div>
                  </div>
                </div>
                <div className={styles.gameModalInfo}>
                  <h2 className={styles.gameModalTitle}>{activeGame.title}</h2>
                </div>
              </div>
              <div className={styles.gameModalBody}>
                <p className={styles.gameModalDescription}>
                  {activeGame.description}
                </p>

                {activeGame.features && (
                  <div className={styles.gameModalFeatures}>
                    <h3 className={styles.gameModalSubtitle}>Key Features</h3>
                    <ul className={styles.gameFeaturesList}>
                      {activeGame.features.map((feature, index) => (
                        <li key={index} className={styles.gameFeatureItem}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.gameModalActions}>
                  {activeGame.status === "active" && (
                    <Link
                      href="/membership"
                      className={styles.modalPrimaryButton}
                    >
                      Play Now
                    </Link>
                  )}
                  {activeGame.status === "beta" && (
                    <Link
                      href="/membership"
                      className={styles.modalSecondaryButton}
                    >
                      Join Beta
                    </Link>
                  )}
                  {activeGame.status === "upcoming" && (
                    <button className={styles.modalDisabledButton} disabled>
                      Coming Soon
                    </button>
                  )}
                  <button
                    className={styles.modalLinkButton}
                    onClick={() => handleLearnMore(activeGame.id)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MarketingLayout>
  );
}
