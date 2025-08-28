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
}

export default function GamesPage() {
  // Animation on scroll
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Games data
  const games: Game[] = [
    {
      id: "totally-medieval",
      title: "Totally Medieval",
      subject: "Math",
      description:
        "Build your medieval kingdom while mastering math skills through strategic resource management and castle building. Players solve increasingly complex math problems to acquire resources, build structures, and defend their kingdoms from rivals.",
      imagePath: "/images/games/TotallyMedieval.jpg",
      featured: true,
    },
    {
      id: "battles-and-thrones",
      title: "Battles and Thrones Simulator",
      subject: "History",
      description:
        "Lead historical kingdoms through epic battles and political intrigue. This simulation game teaches strategic thinking and historical context as players navigate alliances, conflicts, and resource management based on real historical scenarios.",
      imagePath: "/images/games/BattleThrones.jpg",
    },
    {
      id: "prydes-gym",
      title: "Prydes Gym",
      subject: "Physical Education",
      description:
        "A virtual fitness adventure that encourages real-world physical activity. Players create workout routines, set fitness goals, and track progress through an engaging interface that makes exercise fun and rewarding.",
      imagePath: "/images/games/PrydesGym.jpg",
    },
    {
      id: "debt-free-millionaire",
      title: "Debt-Free Millionaire",
      subject: "Personal Finance",
      description:
        "A career-readiness and financial literacy simulation that teaches students how to manage money, plan a career, and make life decisions that impact their future. Players choose a career, earn a salary, budget monthly expenses, build credit, and work toward financial freedom. Through real-world scenarios and gamified rewards, students gain essential knowledge about banking, taxes, insurance, debt, investing, and saving.",
      imagePath: "/images/games/DebtFreeMil.jpg",
      featured: true,
    },
    {
      id: "panic-attack",
      title: "Panic Attack!!",
      subject: "Health",
      description:
        "An innovative game that teaches stress management and mental health awareness. Players navigate through challenges while learning coping strategies, emotional intelligence, and healthy habits that can be applied in real-life situations.",
      imagePath: "/images/games/PanicAttack.jpg",
    },
    {
      id: "lightning-round",
      title: "Lightning Round",
      subject: "History",
      description:
        "A fast-paced quiz game that tests and improves historical knowledge through quick-fire questions, timed challenges, and competitive multiplayer modes. Perfect for classroom use or independent learning.",
      imagePath: "/images/games/Lightning.jpg",
    },
    {
      id: "time-quest",
      title: "Time Quest",
      subject: "History",
      description:
        "A competitive history adventure where players travel through time to complete missions in different historical periods. Designed to reinforce historical facts, geography, and cause-and-effect thinking, Time Quest allows players to collect knowledge, compete with others, and alter their strategy as timelines evolve. The game makes history feel immersive, personal, and engaging.",
      imagePath: "/images/games/TimeQuest.jpg",
      featured: true,
    },
    {
      id: "historical-conquest-digital",
      title: "Historical Conquest Digital",
      subject: "History",
      description:
        "A turn-based strategy card game where players build civilizations using real historical figures, events, and innovations. By collecting and deploying cards like Harriet Tubman, Julius Caesar, or the Black Plague, students learn history through dynamic gameplay. The game reinforces timelines, global context, and critical thinking as students pit historical figures and concepts against one another in battle.",
      imagePath: "/images/games/HistoricalConquest.jpg",
      featured: true,
    },
    {
      id: "bug-and-seek",
      title: "Bug and Seek",
      subject: "Science",
      description:
        "A nature-based exploration game where students become the new owners of a broken-down insectarium. Players explore real-world ecosystems to catch up to 220 real-life bugs, each with fun facts and humor built into every codex entry. The game teaches entomology, biology, ecology, and environmental science while also weaving in problem-solving through quests, economic simulation, and museum restoration.",
      imagePath: "/images/games/BugandSeek.jpg",
      featured: true,
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

  const closeGameDetails = () => {
    setActiveGame(null);
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
                      </div>
                    </div>
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

        {/* All Games Section */}
        <section className={styles.allGamesSection}>
          <Container>
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>
                  {selectedSubject ? `${selectedSubject} Games` : "All Games"}
                </h2>
                <div className={styles.sectionDecoration}></div>
              </div>

              <div className={styles.gamesGrid}>
                {filteredGames.map((game, index) => (
                  <div
                    key={index}
                    className={styles.gameCard}
                    onClick={() => handleGameClick(game)}
                  >
                    <div className={styles.gameImageContainer}>
                      <Image
                        src={game.imagePath}
                        alt={game.title}
                        width={280}
                        height={160}
                        className={styles.gameImage}
                      />
                      <div className={styles.gameOverlay}>
                        <div className={styles.gameSubject}>{game.subject}</div>
                      </div>
                    </div>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <button className={styles.gameDetailsButton}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <Container>
            <div className={styles.ctaContainer}>
              <h2 className={styles.ctaTitle}>Ready to Start Playing?</h2>
              <p className={styles.ctaText}>
                Join Xogos today and transform learning into an exciting
                adventure while earning rewards for your future.
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
          <div className={styles.gameModal}>
            <div className={styles.gameModalContent}>
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
                    width={400}
                    height={225}
                    className={styles.gameModalImage}
                  />
                </div>
                <div className={styles.gameModalInfo}>
                  <h2 className={styles.gameModalTitle}>{activeGame.title}</h2>
                  <span className={styles.gameModalSubject}>
                    {activeGame.subject}
                  </span>
                </div>
              </div>
              <div className={styles.gameModalBody}>
                <p className={styles.gameModalDescription}>
                  {activeGame.description}
                </p>

                <div className={styles.gameModalFeatures}>
                  <h3 className={styles.gameModalSubtitle}>Key Features</h3>
                  <ul className={styles.gameFeaturesList}>
                    <li className={styles.gameFeatureItem}>
                      Interactive learning experience
                    </li>
                    <li className={styles.gameFeatureItem}>
                      Earn iPlay coins for scholarships
                    </li>
                    <li className={styles.gameFeatureItem}>
                      Track progress and achievements
                    </li>
                    <li className={styles.gameFeatureItem}>
                      Compete with friends
                    </li>
                    <li className={styles.gameFeatureItem}>
                      Regular content updates
                    </li>
                  </ul>
                </div>

                <div className={styles.gameModalCTA}>
                  <button className={styles.gamePlayButton}>Play Now</button>
                  <button className={styles.gameWishlistButton}>
                    Add to Wishlist
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
