import React from "react";
import styles from "./BoardMembers.module.css"; // Import your CSS styles for this component
import { MarketingLayout } from "@/layouts/Marketing";

const BoardMembers: React.FC = () => {
  return (
    <MarketingLayout>
      <div className={styles.boardMembers}>
        <h2 className={styles.header}>Board of Directors</h2>

        {/* President */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>President</span> -{" "}
              <span className={styles.name}>Michael Weaver</span>
            </h3>
            <p>
              The President leads the board in carrying out its strategy,
              presides over meetings, set meeting agendas in collaboration with
              other directors, and ensure the board’s policies and directives
              are implemented. The President acts as the primary liaison between
              the board and the CEO of Xogos Gaming.
            </p>
            <br></br>
            <h3 className={styles.header2}>
              <span className={styles.role}> Role</span> -{" "}
              <span className={styles.name}>Insurance and Risk</span>
            </h3>
            <p>
              Responsibilities: Oversees risks associated with the company’s
              operations, ensuring appropriate insurance coverage is maintained
              and liabilities are managed in compliance with legal and
              regulatory standards.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/weaver.jpg" alt="President - Michael Weaver" />
          </div>
        </div>
        {/* External Relations and CEO */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}> CEO</span> -{" "}
              <span className={styles.name}>Zack Edwards (CEO)</span>
            </h3>
            <p>
              The CEO holds a board seat and attends board meetings to provide
              insights into company operations, market conditions, and business
              strategies. Responsible for the day-to-day management of the
              company and executing the board’s vision and strategies.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/icon.jpg" alt=" CEO - Zack Edwards (CEO)" />
          </div>
        </div>
        {/* Legal */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>Legal</span> -{" "}
              <span className={styles.name}>Braden Perry</span>
            </h3>
            <p>
              Responsible for overseeing all legal aspects of the company’s
              operations, ensuring compliance with statutory obligations, and
              advising on legal matters to protect the company’s interests.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/icon.jpg" alt="Legal - Braden Perry" />
          </div>
        </div>

        {/* Crypto & Exchanges */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>Crypto & Exchanges</span> -{" "}
              <span className={styles.name}>Matt La Rose</span>
            </h3>
            <p>
              Oversees the integration and management of digital currency
              transactions within the gaming platforms, and cryptocurrency
              disbursements outside the platform, ensuring security and
              compliance with financial regulations.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/icon.jpg" alt="Crypto & Exchanges - Matt La Rose" />
          </div>
        </div>

        {/* Accounting */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>Accounting</span> -{" "}
              <span className={styles.name}>Kevin Stursberg</span>
            </h3>
            <p>
              Oversees the financial oversight of the company, ensures accuracy
              in financial reports, and advises the board on financial planning,
              budgeting, and auditing. Sets financial projections and
              expectations.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/icon.jpg" alt="Accounting - Kevin Stursberg" />
          </div>
        </div>

        {/* Compliance and Regulation */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>Compliance and Regulation</span> –{" "}
              <span className={styles.name}>Terrance Gatsby</span>
            </h3>
            <p>
              Oversees regulations set forth by the U.S. Securities and Exchange
              Commission (SEC), the Financial Crimes Enforcement Network
              (FinCEN), and corresponding international bodies, as applicable to
              Xogos Gaming and advises accordingly.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img
              src="/icon.jpg"
              alt="Compliance and Regulation – Terrance Gatsby"
            />
          </div>
        </div>

        {/* Education */}
        <div className={styles.member}>
          <div className={styles.memberInfo}>
            <h3 className={styles.header2}>
              <span className={styles.role}>Education</span> –{" "}
              <span className={styles.name}>McKayla</span>
            </h3>
            <p>
              Creates, oversees, and executes the strategy that advances the
              education of Xogos Gaming for the students, teachers, and also
              within the cryptocurrency industry.
            </p>
          </div>
          <div className={styles.memberImage}>
            <img src="/icon.jpg" alt="Education – McKayla" />
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default BoardMembers;
