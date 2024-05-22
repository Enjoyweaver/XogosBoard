import clsx from "clsx";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { MarketingLayout } from "@/layouts/Marketing";
import { LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";
import Link from "next/link";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>
            Xogos Gaming <br></br>Board of Directors
          </h1>
          <p className={styles.heroLead}>
            Where the board of directors collaborate and share relevant
            information with the public.
          </p>
        </div>
        <div className={styles.heroActions}>
          <LinkButton href="/boardmembers" target="_blank" variant="secondary">
            Meet the Board of Directors
          </LinkButton>
        </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Focus Areas</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description={
              <>
                Create educational content in the form of tools, guides, and
                games.
              </>
            }
            title="Education"
          />
          <Feature
            description={
              <>
                Integrating cryptocurrency into our platform in several aspects,
                in addition to being a form of payment.
              </>
            }
            title="Cryptocurrency"
          />
          <Feature
            description={
              <>
                Understanding legal and regulatory compliance, and ensuring our
                practices are not only compliant, but lead by example.
              </>
            }
            title="Legal and Regulatory Compliance"
          />
        </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Current and Future Initiatives</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description={
              <>
                Provide digital games that combine blockchain technology that
                pick up where the teach left off.
              </>
            }
            title="Education Games"
          />
          <Feature
            description={
              <>
                Integrating cryptocurrency into our platform in several aspects,
                in addition to being a form of payment.
              </>
            }
            title="Cryptocurrency"
          />
          <Feature
            description={
              <>
                Understanding legal and regulatory compliance, and ensuring our
                practices are not only compliant, but lead by example.
              </>
            }
            title="Legal and Regulatory Compliance"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}
