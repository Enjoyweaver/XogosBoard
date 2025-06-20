"use client";

import React, { useState } from "react";
import { MarketingLayout } from "@/layouts/Marketing";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

const RiskManagement = () => {
  const [activeTab, setActiveTab] = useState("risk-overview");

  // Risk categories
  const riskCategories = [
    {
      id: "operational",
      name: "Operational Risk",
      description:
        "Risks associated with our day-to-day operations, processes, and systems.",
      color: "#6366f1", // Indigo
      icon: (
        <svg
          className="mr-2"
          style={{ width: "42px", height: "42px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
    },
    {
      id: "technological",
      name: "Technological Risk",
      description:
        "Risks related to our educational gaming platform and blockchain infrastructure.",
      color: "#2dd4bf", // Teal
      icon: (
        <svg
          className="mr-2"
          style={{ width: "42px", height: "42px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
      ),
    },
    {
      id: "regulatory",
      name: "Regulatory Risk",
      description:
        "Risks related to compliance with educational and cryptocurrency regulations.",
      color: "#f59e0b", // Amber
      icon: (
        <svg
          className="mr-2"
          style={{ width: "42px", height: "42px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          ></path>
        </svg>
      ),
    },
    {
      id: "financial",
      name: "Financial Risk",
      description:
        "Risks related to the token economy, scholarships, and financial operations.",
      color: "#10b981", // Emerald
      icon: (
        <svg
          className="mr-2"
          style={{ width: "42px", height: "42px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: "privacy",
      name: "Privacy & Data Risk",
      description:
        "Risks associated with student data, PII protection, and privacy compliance.",
      color: "#8b5cf6", // Violet
      icon: (
        <svg
          className="mr-2"
          style={{ width: "42px", height: "42px" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      ),
    },
  ];

  // Risk management approaches
  const riskApproaches = [
    {
      id: "risk-register",
      title: "Risk Register",
      description:
        "Our comprehensive risk identification and tracking system that helps us monitor and manage risks across the organization.",
      color: "#6366f1", // Indigo
      icon: (
        <svg
          className="w-1 h-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
      ),
      items: [
        "Systematic identification of risks",
        "Risk categorization and prioritization",
        "Mitigation strategy planning",
        "Regular review and updates",
      ],
    },
    {
      id: "crypto-security",
      title: "Crypto Security Framework",
      description:
        "Our multi-layered approach to securing the iServ and iPlay cryptocurrency ecosystems and related blockchain infrastructure.",
      color: "#2dd4bf", // Teal
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          ></path>
        </svg>
      ),
      items: [
        "Secure wallet architecture",
        "Smart contract auditing",
        "Transaction monitoring",
        "Multisignature authorization",
      ],
    },
    {
      id: "enterprise-risk",
      title: "Enterprise Risk Management",
      description:
        "Our organization-wide approach to identifying, assessing, and managing risks across all operations.",
      color: "#f59e0b", // Amber
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          ></path>
        </svg>
      ),
      items: [
        "Board-level risk oversight",
        "Risk appetite definition",
        "Integration with strategic planning",
        "Continuous risk assessment",
      ],
    },
    {
      id: "data-security",
      title: "Data Security Strategy",
      description:
        "Our comprehensive approach to securing and protecting sensitive data throughout the Xogos ecosystem.",
      color: "#10b981", // Emerald
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          ></path>
        </svg>
      ),
      items: [
        "Encryption at rest and in transit",
        "Access control and authentication",
        "Regular security testing",
        "Incident response planning",
      ],
    },
    {
      id: "pii-security",
      title: "Student PII Protection",
      description:
        "Our specialized approach to protecting the personally identifiable information of students using our platform.",
      color: "#8b5cf6", // Violet
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      ),
      items: [
        "FERPA/COPPA compliance",
        "Data minimization principles",
        "Strict access controls",
        "Privacy by design approach",
      ],
    },
    {
      id: "compliance-governance",
      title: "Compliance & Governance",
      description:
        "Our framework for ensuring regulatory compliance across educational, gaming, and cryptocurrency domains.",
      color: "#ec4899", // Pink
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
      items: [
        "Regulatory tracking and monitoring",
        "Compliance training programs",
        "Governance committee oversight",
        "Regular compliance audits",
      ],
    },
    {
      id: "skills-matrix",
      title: "Board Skills Matrix",
      description:
        "Our tool for ensuring the board has the necessary expertise to provide effective risk oversight.",
      color: "#3b82f6", // Blue
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          ></path>
        </svg>
      ),
      items: [
        "Expertise mapping and gaps analysis",
        "Board development planning",
        "Specialized risk knowledge tracking",
        "Annual skills assessment",
      ],
    },
  ];

  // Risk mitigation strategies
  const mitigationStrategies = [
    {
      name: "Avoid",
      color: "#ef4444", // Red
      description:
        "Eliminate the risk by avoiding the activity that creates it entirely",
      examples: [
        "Exit high-risk markets",
        "Discontinue vulnerable products",
        "Prohibit certain transactions",
      ],
    },
    {
      name: "Transfer",
      color: "#f59e0b", // Amber
      description:
        "Shift the risk impact to a third party through insurance or contractual agreements",
      examples: [
        "Cyber insurance",
        "Outsource high-risk functions",
        "Contractual risk transfer",
      ],
    },
    {
      name: "Mitigate",
      color: "#10b981", // Emerald
      description:
        "Implement controls to reduce either the likelihood or impact of the risk",
      examples: [
        "Enhanced security measures",
        "Diversification strategies",
        "Operational controls",
      ],
    },
    {
      name: "Accept",
      color: "#3b82f6", // Blue
      description:
        "Acknowledge the risk exists and monitor it, but take no action unless it exceeds tolerance levels",
      examples: [
        "Low probability/impact risks",
        "Cost-prohibitive mitigations",
        "Strategic risk-taking",
      ],
    },
  ];

  return (
    <MarketingLayout>
      <Container className={styles.riskContainer}>
        {/* Blockchain-themed background - subtle grid with animated block connections */}
        <div className={styles.riskBackground}>
          <div
            className={styles.backgroundPattern}
            style={{
              backgroundImage: `
            radial-gradient(circle at 10px 10px, rgba(99, 102, 241, 0.1) 2px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(45, 212, 191, 0.1) 2px, transparent 0),
            radial-gradient(circle at 50px 50px, rgba(245, 158, 11, 0.1) 2px, transparent 0),
            radial-gradient(circle at 70px 70px, rgba(139, 92, 246, 0.1) 2px, transparent 0)
          `,
              backgroundSize: "80px 80px",
            }}
          ></div>

          {/* Animated blockchain lines */}
          <svg
            className={styles.blockchainSvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="blockchain-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient
                id="blockchain-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Blockchain lines with animated dashes */}
            <path
              d="M0,100 L100,100 L100,200 L200,200 L200,300 L300,300 L300,400"
              stroke="url(#blockchain-gradient-1)"
              strokeWidth="2"
              strokeDasharray="10,5"
              fill="none"
              className={styles.blockchainAnimation}
            />
            <path
              d="M400,0 L400,100 L300,100 L300,200 L400,200 L400,300 L500,300"
              stroke="url(#blockchain-gradient-2)"
              strokeWidth="2"
              strokeDasharray="10,5"
              fill="none"
              className={styles.blockchainAnimation}
              style={{ animationDelay: "1s" }}
            />

            {/* Blockchain nodes/blocks */}
            <rect
              x="95"
              y="95"
              width="8"
              height="8"
              fill="#6366f1"
              className={styles.blockchainPulse}
            />
            <rect
              x="95"
              y="195"
              width="8"
              height="8"
              fill="#2dd4bf"
              className={styles.blockchainPulse}
              style={{ animationDelay: "0.6s" }}
            />
            <rect
              x="195"
              y="195"
              width="8"
              height="8"
              fill="#f59e0b"
              className={styles.blockchainPulse}
              style={{ animationDelay: "1.2s" }}
            />
            <rect
              x="195"
              y="295"
              width="8"
              height="8"
              fill="#8b5cf6"
              className={styles.blockchainPulse}
              style={{ animationDelay: "1.8s" }}
            />
            <rect
              x="295"
              y="295"
              width="8"
              height="8"
              fill="#10b981"
              className={styles.blockchainPulse}
              style={{ animationDelay: "2.4s" }}
            />
            <rect
              x="395"
              y="95"
              width="8"
              height="8"
              fill="#8b5cf6"
              className={styles.blockchainPulse}
              style={{ animationDelay: "3.0s" }}
            />
            <rect
              x="295"
              y="95"
              width="8"
              height="8"
              fill="#f59e0b"
              className={styles.blockchainPulse}
              style={{ animationDelay: "3.6s" }}
            />
            <rect
              x="395"
              y="195"
              width="8"
              height="8"
              fill="#6366f1"
              className={styles.blockchainPulse}
              style={{ animationDelay: "4.2s" }}
            />
            <rect
              x="395"
              y="295"
              width="8"
              height="8"
              fill="#2dd4bf"
              className={styles.blockchainPulse}
              style={{ animationDelay: "4.8s" }}
            />
          </svg>
        </div>

        <div className={styles.riskContent}>
          <h2 className={styles.riskTitle}>
            <span style={{ color: "#6366f1" }}>Risk</span>{" "}
            <span style={{ color: "#2dd4bf" }}>Management</span>{" "}
            <span style={{ color: "#f59e0b" }}>Framework</span>
          </h2>

          {/* Tab navigation */}
          <div className={styles.tabNavigation}>
            <div className={styles.tabContainer}>
              <button
                onClick={() => setActiveTab("risk-overview")}
                className={`${styles.tabButton} ${
                  activeTab === "risk-overview" ? styles.activeTab : ""
                }`}
              >
                Risk Overview
              </button>
              <button
                onClick={() => setActiveTab("risk-approaches")}
                className={`${styles.tabButton} ${
                  activeTab === "risk-approaches" ? styles.activeTab : ""
                }`}
              >
                Risk Approaches
              </button>
              <a
                href="/skillsmatrix"
                className={`${styles.tabButton} ${styles.tabLink}`}
              >
                Skills Matrix
              </a>
              <button
                onClick={() => setActiveTab("risk-policies")}
                className={`${styles.tabButton} ${
                  activeTab === "risk-policies" ? styles.activeTab : ""
                }`}
              >
                Risk Policies
              </button>
            </div>
          </div>

          {/* Risk Overview Tab Content */}
          {activeTab === "risk-overview" && (
            <div className={styles.tabContent}>
              <p className={styles.riskDescription}>
                At Xogos Gaming, our risk management approach integrates
                educational best practices with blockchain security to create a
                comprehensive framework that protects our platform, users, and
                assets.
              </p>

              {/* Risk categories grid */}
              <div className={styles.riskCategoriesGrid}>
                {riskCategories.map((category) => (
                  <div key={category.id} className={styles.categoryCard}>
                    {/* Hover effect */}
                    <div
                      className={styles.categoryHoverEffect}
                      style={{ backgroundColor: category.color }}
                    ></div>

                    {/* Decorative blur */}
                    <div
                      className={styles.categoryBlur}
                      style={{ backgroundColor: `${category.color}30` }}
                    ></div>

                    <h4
                      className={styles.categoryName}
                      style={{ color: category.color }}
                    >
                      {category.icon}
                      {category.name}
                    </h4>

                    <p className={styles.categoryDescription}>
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Risk mitigation approach */}
              <div className={styles.mitigationSection}>
                <h3 className={styles.mitigationTitle}>
                  Our Risk Mitigation Approach
                </h3>

                <div className={styles.mitigationGrid}>
                  {mitigationStrategies.map((strategy) => (
                    <div key={strategy.name} className={styles.strategyCard}>
                      <div
                        className={styles.strategyHeader}
                        style={{ backgroundColor: strategy.color }}
                      ></div>
                      <h4
                        className={styles.strategyName}
                        style={{ color: strategy.color }}
                      >
                        {strategy.name}
                      </h4>
                      <p className={styles.strategyDescription}>
                        {strategy.description}
                      </p>
                      <div className={styles.strategyExamples}>
                        <span className={styles.examplesLabel}>Examples:</span>{" "}
                        {strategy.examples.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk management process visualization */}
              <div className={styles.processSection}>
                <h3 className={styles.processTitle}>
                  Our Risk Management Process
                </h3>

                <div className={styles.processFlow}>
                  {/* Process flow diagram */}
                  <div className={styles.processSteps}>
                    {/* Connection lines for desktop */}
                    <div className={styles.connectionLine}></div>

                    {/* Process steps */}
                    {[
                      {
                        name: "Identify",
                        color: "#6366f1",
                        description:
                          "Identify and document risks across the ecosystem",
                      },
                      {
                        name: "Assess",
                        color: "#2dd4bf",
                        description:
                          "Evaluate risk likelihood and potential impact",
                      },
                      {
                        name: "Plan",
                        color: "#8b5cf6",
                        description:
                          "Develop strategies to address identified risks",
                      },
                      {
                        name: "Implement",
                        color: "#f59e0b",
                        description: "Execute risk management strategies",
                      },
                      {
                        name: "Monitor",
                        color: "#10b981",
                        description:
                          "Continuously track and review risk status",
                      },
                    ].map((step, index) => (
                      <div key={index} className={styles.processStep}>
                        <div
                          className={styles.stepNumber}
                          style={{ borderColor: step.color }}
                        >
                          <span style={{ color: step.color }}>{index + 1}</span>
                        </div>
                        <h5
                          className={styles.stepName}
                          style={{ color: step.color }}
                        >
                          {step.name}
                        </h5>
                        <p className={styles.stepDescription}>
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.processNote}>
                    Our risk management process is cyclical and continuous,
                    ensuring we remain adaptable to emerging risks in the
                    educational technology and blockchain spaces.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Approaches Tab Content */}
          {activeTab === "risk-approaches" && (
            <div className={styles.tabContent}>
              <p className={styles.riskDescription}>
                We employ multiple specialized approaches to manage different
                aspects of risk across our educational gaming platform and
                blockchain infrastructure.
              </p>
              {/* Risk approaches grid */}
              <div className={styles.approachesGrid}>
                {riskApproaches.map((approach) => (
                  <div key={approach.id} className={styles.approachCard}>
                    {/* Background effect */}
                    <div
                      className={styles.approachBackground}
                      style={{ backgroundColor: approach.color }}
                    ></div>

                    {/* Top accent line */}
                    <div
                      className={styles.approachAccent}
                      style={{ backgroundColor: approach.color }}
                    ></div>

                    <div className={styles.approachHeader}>
                      <div
                        className={styles.approachIcon}
                        style={{
                          backgroundColor: `${approach.color}20`,
                          color: approach.color,
                        }}
                      >
                        {approach.icon}
                      </div>

                      <h4
                        className={styles.approachTitle}
                        style={{ color: approach.color }}
                      >
                        {approach.title}
                      </h4>
                    </div>

                    <p className={styles.approachDescription}>
                      {approach.description}
                    </p>

                    <div className={styles.approachItems}>
                      {approach.items.map((item, index) => (
                        <div key={index} className={styles.approachItem}>
                          <span
                            className={styles.itemBullet}
                            style={{ backgroundColor: approach.color }}
                          ></span>
                          <span className={styles.itemText}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk integration statement */}
              <div className={styles.integrationSection}>
                <h3 className={styles.integrationTitle}>
                  Integrated Risk Management
                </h3>
                <p className={styles.integrationDescription}>
                  Our risk management approaches don&apos;t operate in
                  isolation. They form an integrated system that provides
                  multiple layers of protection for our educational platform and
                  blockchain assets.
                </p>

                <div className={styles.integrationTags}>
                  {riskApproaches.map((approach) => (
                    <span
                      key={approach.id}
                      className={styles.integrationTag}
                      style={{
                        backgroundColor: `${approach.color}20`,
                        color: approach.color,
                      }}
                    >
                      {approach.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Risk Policies Tab Content */}
          {activeTab === "risk-policies" && (
            <div className={styles.tabContent}>
              <p className={styles.riskDescription}>
                Our organization has established comprehensive policies to guide
                risk management across all areas of operation, with special
                focus on educational content and cryptocurrency security.
              </p>

              <div className={styles.policiesGrid}>
                {[
                  {
                    title: "Privacy Policy",
                    description:
                      "Guidelines for collecting, storing, and processing student and user data in compliance with FERPA, COPPA, and other regulations.",
                    color: "#8b5cf6", // Violet
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        ></path>
                      </svg>
                    ),
                    link: "/privacy",
                  },
                  {
                    title: "Terms of Use",
                    description:
                      "Comprehensive terms governing the use of our educational platform, including user responsibilities and platform limitations.",
                    color: "#6366f1", // Indigo
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    ),
                    link: "/terms",
                  },
                  {
                    title: "Security Policy",
                    description:
                      "Outlines our approach to securing data, protecting blockchain assets, and maintaining infrastructure integrity.",
                    color: "#2dd4bf", // Teal
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    ),
                    link: "/security",
                  },
                  {
                    title: "Risk Register Policy",
                    description:
                      "Defines how we identify, categorize, and track risks across the organization, including review frequencies and ownership.",
                    color: "#f59e0b", // Amber
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        ></path>
                      </svg>
                    ),
                    link: "/risk-register",
                  },
                  {
                    title: "Cryptocurrency Governance",
                    description:
                      "Outlines management of the iServ and iPlay token economies, including security, distribution, and conversion policies.",
                    color: "#10b981", // Emerald
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    ),
                    link: "/crypto-governance",
                  },
                  {
                    title: "Educational Content Standards",
                    description:
                      "Guidelines ensuring educational content meets quality standards, accuracy requirements, and age-appropriate design.",
                    color: "#ec4899", // Pink
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        ></path>
                      </svg>
                    ),
                    link: "/content-standards",
                  },
                ].map((policy, index) => (
                  <a
                    key={index}
                    href={policy.link}
                    className={styles.policyCard}
                  >
                    {/* Background effect */}
                    <div
                      className={styles.policyBackground}
                      style={{ backgroundColor: policy.color }}
                    ></div>

                    {/* Left accent line */}
                    <div
                      className={styles.policyAccent}
                      style={{ backgroundColor: policy.color }}
                    ></div>

                    <div className={styles.policyHeader}>
                      <div
                        className={styles.policyIcon}
                        style={{
                          backgroundColor: `${policy.color}20`,
                          color: policy.color,
                        }}
                      >
                        {policy.icon}
                      </div>

                      <h4
                        className={styles.policyTitle}
                        style={{ color: policy.color }}
                      >
                        {policy.title}
                      </h4>
                    </div>

                    <p className={styles.policyDescription}>
                      {policy.description}
                    </p>

                    <div
                      className={styles.policyLink}
                      style={{ color: policy.color }}
                    >
                      <span>View Policy</span>
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Animation styles */}
        <style jsx>{`
          .blockchain-animation {
            animation: dash 10s linear infinite;
          }

          .blockchain-pulse {
            animation: pulse 3s ease-in-out infinite;
          }

          @keyframes dash {
            to {
              stroke-dashoffset: 60;
            }
          }

          @keyframes pulse {
            0% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
            100% {
              opacity: 0.3;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Container>
    </MarketingLayout>
  );
};

export default RiskManagement;
