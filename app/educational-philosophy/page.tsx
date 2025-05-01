// educational-philosophy/page.tsx
"use client";

import React from "react";
import { WhitepaperSection } from "@/components/whitepaper/WhitepaperSection";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import styles from "../whitepaper/whitepaper.module.css";

export default function EducationalPhilosophyPage() {
  return (
    <MarketingLayout>
      <div className={styles.whitepaperPage}>
        <div className={styles.whitepaperHero}>
          <Container>
            <h1 className={styles.heroTitle}>Educational Philosophy</h1>
            <p className={styles.heroSubtitle}>
              The principles and research that guide our approach to educational
              game development
            </p>
          </Container>
        </div>

        <Container>
          <div className={styles.whitepaperContainer}>
            <aside className={styles.tableOfContents}>
              <div className={styles.tocSticky}>
                <h3 className={styles.tocTitle}>Contents</h3>
                <ul className={styles.tocList}>
                  <li>
                    <a href="#beyond-gamification">
                      Beyond Simple Gamification
                    </a>
                  </li>
                  <li>
                    <a href="#competency-based">Competency-Based Progression</a>
                  </li>
                  <li>
                    <a href="#personalized-learning">
                      Personalized Learning Pathways
                    </a>
                  </li>
                  <li>
                    <a href="#engagement-loops">Core Engagement Loops</a>
                  </li>
                  <li>
                    <a href="#narrative-integration">Narrative Integration</a>
                  </li>
                </ul>

                <div className={styles.moreResources}>
                  <h3 className={styles.resourcesTitle}>Related Resources</h3>
                  <ul className={styles.resourcesList}>
                    <li>
                      <a href="/docs/whitepaper">Whitepaper</a>
                    </li>
                    <li>
                      <a href="/docs/game-mechanics">Game Mechanics</a>
                    </li>
                    <li>
                      <a href="/docs/assessment-system">Assessment System</a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            <main className={styles.whitepaperContent}>
              <WhitepaperSection
                title="Why Our Educational Approach Matters"
                content={
                  <div>
                    <p>
                      The Xogos learning model is built upon contemporary
                      educational research that recognizes the power of
                      intrinsic motivation, meaningful challenges, and immediate
                      feedback. Rather than treating education as separate from
                      entertainment, our platform dissolves this artificial
                      boundary by embedding substantive learning within
                      naturally engaging contexts.
                    </p>
                  </div>
                }
              />

              <section id="beyond-gamification">
                <WhitepaperSection
                  title="Beyond Simple Gamification"
                  content={
                    <div>
                      <p>
                        Traditional educational gamification often adds
                        superficial game elements to learning activities, like
                        badges or points systems that feel disconnected from the
                        educational content. Xogos takes a fundamentally
                        different approach by designing experiences where the
                        gaming elements and educational content are inseparable.
                      </p>
                      <p>
                        Imagine a traditional math worksheet transformed into an
                        immersive medieval adventure. Instead of solving
                        abstract equations on paper, students might defend a
                        castle by calculating projectile trajectories, manage a
                        kingdom's economy through ratio and proportion problems,
                        or decode ancient runes using algebraic expressions. The
                        mathematical challenges aren't an interruption to the
                        game – they are the very mechanism through which the
                        game world is experienced and mastered.
                      </p>
                      <p>
                        This integration follows what educational researchers
                        call "intrinsic integration," where the learning content
                        and game mechanics work together so naturally that
                        students don't experience them as separate activities.
                        The result is a state of "flow" – that optimal
                        experience where challenge and skill are perfectly
                        balanced, and engagement becomes effortless.
                      </p>
                    </div>
                  }
                />
              </section>

              <section id="competency-based">
                <WhitepaperSection
                  title="Competency-Based Progression"
                  content={
                    <div>
                      <p>
                        Traditional education often moves students forward based
                        on time spent rather than mastery achieved. Xogos
                        reverses this approach through a competency-based
                        progression system where advancement depends on
                        demonstrated understanding rather than hours logged.
                      </p>
                      <p>
                        Each educational concept in the Xogos ecosystem is
                        mapped to a specific competency framework aligned with
                        educational standards. As students interact with games
                        and activities, the system continuously assesses their
                        mastery level across different skills and knowledge
                        areas. This assessment isn't limited to traditional
                        multiple-choice testing but includes diverse evidence of
                        understanding through gameplay behaviors,
                        problem-solving approaches, and created artifacts.
                      </p>
                    </div>
                  }
                />
              </section>

              {/* Additional sections would continue here */}
            </main>
          </div>
        </Container>
      </div>
    </MarketingLayout>
  );
}
