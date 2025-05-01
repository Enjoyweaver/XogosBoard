// components/whitepaper/WhitepaperSection.tsx
import React, { ReactNode } from "react";
import styles from "./WhitepaperSection.module.css";

interface WhitepaperSectionProps {
  title: string;
  content: ReactNode;
}

export const WhitepaperSection: React.FC<WhitepaperSectionProps> = ({
  title,
  content,
}) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionContent}>{content}</div>
    </div>
  );
};
