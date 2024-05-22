// BoardMembers.tsx

import React from "react";
import styles from "./BoardMembers.module.css"; // Import your CSS styles for this component

const BoardMembers: React.FC = () => {
  return (
    <div className={styles.boardMembers}>
      <h2>Board of Directors</h2>
      {/* President */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>President - Michael Weaver</h3>
          <p>
            The President shall lead the board, preside over meetings, set
            meeting agendas in collaboration with other directors, and ensure
            the board’s policies and directives are implemented. The President
            acts as the primary liaison between the board and the CEO of Xogos
            Gaming.
          </p>
          <p>Role: Insurance and Liabilities</p>
          <p>
            Responsibilities: Oversees risks associated with the company’s
            operations, ensuring appropriate insurance coverage is maintained
            and liabilities are managed in compliance with legal and regulatory
            standards.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img src="/app/icon.jpg" alt="President - Michael Weaver" />
        </div>
      </div>
      {/* Legal */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>Legal - Braden Perry</h3>
          <p>
            Responsible for overseeing all legal aspects of the company’s
            operations, ensuring compliance with statutory obligations, and
            advising on legal matters to protect the company’s interests.
          </p>
          <p>Role: Legal</p>
          <p>
            Responsibilities: Oversees all legal aspects of the company’s
            operations, ensures compliance with statutory obligations, and
            advises on legal matters to protect the company’s interests.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img src="/app/icon.jpg" alt="Legal - Braden Perry" />
        </div>
      </div>
      {/* Crypto & Exchanges */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>Crypto & Exchanges - Matt La Rose</h3>
          <p>
            Oversees the integration and management of digital currency
            transactions within the gaming platforms, and cryptocurrency
            disbursements outside the platform, ensuring security and compliance
            with financial regulations.
          </p>
          <p>Role: Crypto & Exchanges</p>
          <p>
            Responsibilities: Oversees the integration and management of digital
            currency transactions within the gaming platforms, and
            cryptocurrency disbursements outside the platform, ensuring security
            and compliance with financial regulations.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img src="/app/icon.jpg" alt="Crypto & Exchanges - Matt La Rose" />
        </div>
      </div>
      {/* Accounting */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>Accounting - Kevin Stursberg</h3>
          <p>
            Oversees the financial oversight of the company, ensures accuracy in
            financial reports, and advises the board on financial planning,
            budgeting, and auditing. Sets financial projections and
            expectations.
          </p>
          <p>Role: Accounting</p>
          <p>
            Responsibilities: Oversees the financial oversight of the company,
            ensures accuracy in financial reports, advises the board on
            financial planning, budgeting, and auditing. Sets financial
            projections and expectations.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img src="/app/icon.jpg" alt="Accounting - Kevin Stursberg" />
        </div>
      </div>
      {/* External Relations and CEO */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>External Relations and CEO - Zack Edwards (CEO)</h3>
          <p>
            The CEO holds a board seat and attends board meetings to provide
            insights into company operations, market conditions, and business
            strategies. Responsible for the day-to-day management of the company
            and executing the board’s vision and strategies.
          </p>
          <p>Role: External Relations and CEO</p>
          <p>
            Responsibilities: Holds a board seat and attends board meetings to
            provide insights into company operations, market conditions, and
            business strategies. Responsible for the day-to-day management of
            the company and executing the board’s vision and strategies.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img
            src="/app/icon.jpg"
            alt="External Relations and CEO - Zack Edwards (CEO)"
          />
        </div>
      </div>
      {/* Compliance and Regulation */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>Compliance and Regulation – Terrance Gatsby</h3>
          <p>
            Oversees regulations set forth by the U.S. Securities and Exchange
            Commission (SEC), the Financial Crimes Enforcement Network (FinCEN),
            and corresponding international bodies, as applicable to Xogos
            Gaming and advises accordingly.
          </p>
          <p>Role: Compliance and Regulation</p>
          <p>
            Responsibilities: Oversees regulations set forth by the U.S.
            Securities and Exchange Commission (SEC), the Financial Crimes
            Enforcement Network (FinCEN), and corresponding international
            bodies, as applicable to Xogos Gaming and advises accordingly.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img
            src="/app/icon.jpg"
            alt="Compliance and Regulation – Terrance Gatsby"
          />
        </div>
      </div>
      {/* Education */}
      <div className={styles.member}>
        <div className={styles.memberInfo}>
          <h3>Education – McKayla</h3>
          <p>
            Creates, oversees, and executes the strategy that advances the
            education of Xogos Gaming for the students, teachers, and also
            within the cryptocurrency industry.
          </p>
          <p>Role: Education</p>
          <p>
            Responsibilities: Creates, oversees, and executes the strategy that
            advances the education of Xogos Gaming for the students, teachers,
            and also within the cryptocurrency industry.
          </p>
        </div>
        <div className={styles.memberImage}>
          <img src="/app/icon.jpg" alt="Education – McKayla" />
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
