"use client";

import React from "react";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

/**
 * Board member data:
 * - Each member has two initiatives relevant to their role
 */
const boardMembers = [
  {
    name: "Michael Weaver",
    title: "President",
    role: "Insurance & Risk",
    imagePath: "/images/board/weaver.jpg",
    responsibilities: [
      "Lead the board in strategic initiatives",
      "Oversee insurance coverage and risk management",
      "Develop crisis management protocols",
    ],
    contributions: [
      "Establish guidelines for new educational game launches",
      "Direct risk assessments for crypto-based activities",
    ],
    initiatives: [
      {
        title: "Enterprise Risk Register",
        description:
          "Create a dynamic risk register tracking organizational liabilities, particularly around student data, volunteer apps, and DOE-related compliance changes.",
        objectives: [
          "Categorize all major and minor risks across the company",
          "Define risk response strategies for top threats",
          "Align insurance policies to newly discovered exposures",
        ],
      },
      {
        title: "Create and define strategy ",
        description:
          "Create the purpose and course of defining and pursuing the strategy.",
        objectives: [
          "Define what the layers are to the approach of the defining our initiatives",
          "Collaborate on defining the Educcational Framework.",
          "Figure out how to utilize board member talent, schedule, and timeline accordingly.",
        ],
      },
    ],
  },
  {
    name: "Zack Edwards",
    title: "CEO",
    role: "Executive Oversight",
    imagePath: "/images/board/zack.jpg",
    responsibilities: [
      "Execute day-to-day company management",
      "Implement the board's strategic vision",
      "Oversee game development pipeline",
    ],
    contributions: [
      "Link educational content to gameplay mechanics",
      "Identify emerging educational technology trends",
    ],
    initiatives: [
      {
        title: "New Partnerships & Market Expansion",
        description:
          "Pursue relationships with external organizations—both educational and corporate—to accelerate Xogos’ brand awareness, scholarship sponsors, and membership growth.",
        objectives: [
          "Secure at least two major sponsorships for scholarships",
          "Expand pilot programs into five new states",
          "Increase membership by 25% within the next quarter",
        ],
      },
      {
        title: "Game Development Pipeline",
        description:
          "Ensure timely release of new educational games in alignment with K-12 curriculum updates and feedback from pilot schools.",
        objectives: [
          "Coordinate tasks across design, dev, and QA teams",
          "Integrate board feedback on educational standards",
          "Publish at least one major new game every two quarters",
        ],
      },
    ],
  },
  {
    name: "Braden Perry",
    title: "Legal Director",
    role: "Legal & Regulatory",
    imagePath: "/images/board/braden.jpg",
    responsibilities: [
      "Oversee all legal aspects of operations",
      "Ensure compliance with regulatory obligations",
      "Monitor gaming regulations across jurisdictions",
    ],
    contributions: [
      "Develop legal frameworks for educational blockchain",
      "Review IP protections and scholarship distribution rules",
    ],
    initiatives: [
      {
        title: "Legal Aspects of Crypto Integration",
        description:
          "Examine the legal ramifications of offering crypto-based rewards to students, ensuring compliance with SEC, FinCEN, COPPA, and other relevant regulations.",
        objectives: [
          "Clarify how iPlay & iServ tokens align with US securities law",
          "Draft standard disclaimers and parental consents",
          "Coordinate with external counsel in each pilot state",
        ],
      },
      {
        title: "Regulatory Review for Scholarship Program",
        description:
          "Audit the scholarship program’s processes and documentation to confirm compliance in all served districts, especially if the Department of Education’s structure changes.",
        objectives: [
          "Confirm student-eligibility processes follow relevant laws",
          "Maintain accurate records for philanthropic contributions",
          "Adapt quickly if the DOE merges or defunds certain programs",
        ],
      },
    ],
  },
  {
    name: "Terrance Gatsby",
    title: "Crypto & Exchanges Director",
    role: "Cryptocurrency Integration",
    imagePath: "/images/board/terrance.jpg",
    responsibilities: [
      "Oversee digital currency integration",
      "Ensure security of cryptocurrency transactions",
      "Develop educational crypto content for students",
    ],
    contributions: [
      "Create wallet systems suited for minors",
      "Establish scholarship distribution protocols on-chain",
    ],
    initiatives: [
      {
        title: "Secure Student Wallet Systems",
        description:
          "Enhance security, user experience, and age-appropriate features in the Xogos wallet, ensuring children’s accounts stay safe from external threats.",
        objectives: [
          "Add multi-signature or parental oversight features",
          "Automate compliance checks for suspicious activity",
          "Roll out a user-friendly redesign by next quarter",
        ],
      },
      {
        title: "Exchange Listings & Partnerships",
        description:
          "Explore new exchange listings for iServ while forming close partnerships with fiat-crypto gateways to streamline scholarships and token liquidity.",
        objectives: [
          "List iServ on at least two reputable exchanges",
          "Implement a direct buy feature with minimal KYC friction",
          "Coordinate promotional efforts with strategic partners",
        ],
      },
    ],
  },
  {
    name: "Kevin Stursberg",
    title: "Accounting Director",
    role: "Financial Oversight",
    imagePath: "/images/board/kevin.jpg",
    responsibilities: [
      "Oversee financial reporting and operations",
      "Ensure accuracy in financial statements",
      "Manage audits & cryptocurrency accounting",
    ],
    contributions: [
      "Create budgets for new game expansions",
      "Develop financial literacy mechanics in games",
    ],
    initiatives: [
      {
        title: "Financial Reporting & Budget Projections",
        description:
          "Implement updated monthly/quarterly financial reporting integrating iServ-based scholarships, forecasting cash flow if DOE or state-level funding shifts.",
        objectives: [
          "Integrate crypto data into standard financial reports",
          "Improve expense tracking for scholarship distributions",
          "Refine 6- and 12-month cash flow projections",
        ],
      },
      {
        title: "Crypto Tax Reporting",
        description:
          "Design robust tax-reporting processes for iServ tokens, ensuring all scholarship-related transactions and volunteer programs meet federal/state guidelines.",
        objectives: [
          "Develop an internal ledger for iServ movements",
          "Implement automated 1099 or K-1 generation for relevant participants",
          "Coordinate with legal to meet multi-state tax rules",
        ],
      },
    ],
  },
  {
    name: "Open Position",
    title: "Compliance & Regulation Director",
    role: "Regulatory Oversight",
    imagePath: "/images/board/board/placeholder.jpg",
    responsibilities: [
      "Monitor compliance with SEC and educational regulations",
      "Establish internal compliance protocols",
      "Develop relationships with regulatory bodies",
    ],
    contributions: [
      "Design compliance frameworks for in-game rewards",
      "Oversee scholarship distribution guidelines",
    ],
    initiatives: [
      {
        title: "Regulatory Liaisons & Partnerships",
        description:
          "Cultivate open lines of communication with state and federal regulators, proactively shaping policy around blockchain-based educational incentives.",
        objectives: [
          "Host quarterly roundtables with educational policy experts",
          "Prepare data to demonstrate Xogos’ compliance track record",
          "Seek direct input from the Department of Education (or successors)",
        ],
      },
      {
        title: "Internal Compliance Training",
        description:
          "Develop training modules for employees, focusing on data privacy, scholarship oversight, and new crypto compliance rules as they emerge.",
        objectives: [
          "Launch mandatory compliance e-learning for all staff",
          "Update modules every six months to reflect new laws",
          "Maintain 100% completion rate among managers and dev leads",
        ],
      },
    ],
  },
  {
    name: "McKayla Reece",
    title: "Education Director",
    role: "Educational Strategy",
    imagePath: "/images/board/mckayla.jpg",
    responsibilities: [
      "Create educational content strategies",
      "Align game content with curriculum standards",
      "Evaluate real-world preparedness of the platform",
    ],
    contributions: [
      "Define new educational topics for each grade level",
      "Lead teacher/school pilot programs for Xogos",
    ],
    initiatives: [
      {
        title: "Educational Content Roadmap",
        description:
          "Expand game-based curricula to cover more advanced financial topics, civics, or trades education, matching the latest K-12 guidelines and potential DOE shifts.",
        objectives: [
          "Launch 2 advanced-subject game modules per year",
          "Collaborate with pilot schools for immediate feedback",
          "Measure student performance gains with in-game analytics",
        ],
      },
      {
        title: "Pilot Program for Curriculum Integration",
        description:
          "Bring Xogos tools directly into classrooms with a pilot group of teachers, focusing on bridging any gap if the Department of Education is downsized.",
        objectives: [
          "Recruit 20 teachers across 4 states to test the platform",
          "Publish a short study on improved student engagement",
          "Adapt teacher dashboards to new local or state requirements",
        ],
      },
    ],
  },
];

export default function BoardInitiativesPage() {
  return (
    <MarketingLayout>
      <Container className={styles.section}>
        {/* Hero Section */}
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>Board Initiatives</h1>
          <p className={styles.heroLead}>
            Where each board member’s role and responsibilities align with two
            major initiatives guiding our next steps.
          </p>
        </div>
      </Container>

      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Board & Their Initiatives</h2>
        <div className={styles.boardMembersGrid}>
          {boardMembers.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              {/* Sidebar-like portion */}
              <div className={styles.memberSidebar}>
                <div className={styles.memberImageContainer}>
                  {member.imagePath ? (
                    <img
                      src={member.imagePath}
                      alt={member.name}
                      className={styles.memberImage}
                    />
                  ) : (
                    <div className={styles.memberPlaceholder} />
                  )}
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <h4 className={styles.memberTitle}>{member.title}</h4>
                <span className={styles.memberRole}>{member.role}</span>
              </div>

              {/* Details portion */}
              <div className={styles.memberDetails}>
                <div className={styles.memberSection}>
                  <h4 className={styles.memberSectionTitle}>
                    Responsibilities
                  </h4>
                  <ul className={styles.memberList}>
                    {member.responsibilities.map((resp, idx) => (
                      <li key={idx} className={styles.memberListItem}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.memberSection}>
                  <h4 className={styles.memberSectionTitle}>
                    Key Contributions
                  </h4>
                  <ul className={styles.memberList}>
                    {member.contributions.map((contr, idx) => (
                      <li key={idx} className={styles.memberListItem}>
                        {contr}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.memberSection}>
                  <h4 className={styles.memberSectionTitle}>Initiatives</h4>
                  <div className={styles.initiativesGrid}>
                    {member.initiatives.map((init, idx) => (
                      <div key={idx} className={styles.initiativeCard}>
                        <h5 className={styles.initiativeTitle}>{init.title}</h5>
                        <p className={styles.initiativeDescription}>
                          {init.description}
                        </p>
                        <h6 className={styles.objectivesLabel}>Objectives:</h6>
                        <ul className={styles.initiativeList}>
                          {init.objectives.map((obj, objIdx) => (
                            <li
                              key={objIdx}
                              className={styles.initiativeListItem}
                            >
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
