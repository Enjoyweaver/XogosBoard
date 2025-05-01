import Link from "next/link";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { MarketingLayout } from "@/layouts/Marketing";
import { LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
  link?: string;
}

function Feature({
  title,
  description,
  link,
  className,
  ...props
}: FeatureProps) {
  const content = (
    <>
      <h4 className={styles.featureTitle}>{title}</h4>
      <p className={styles.featureDescription}>{description}</p>
    </>
  );
  return (
    <div className={`${styles.featureCard} ${className || ""}`} {...props}>
      {link ? <Link href={link}>{content}</Link> : content}
    </div>
  );
}

export default async function BoardPage() {
  const session = await auth();
  if (session) {
    redirect(DASHBOARD_URL);
  }
  return (
    <MarketingLayout>
      <div className={styles.boardPage}>
        <Container className={styles.section}>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>Xogos Gaming</h1>
            <h1 className={styles.heroTitleSecondary}>Board of Directors</h1>
            <p className={styles.heroLead}>
              Where the board of directors collaborate and share relevant
              information with the public.
            </p>
          </div>
          <div className={styles.heroActions}>
            <LinkButton href="/boardmembers">
              Meet the Board of Directors
            </LinkButton>
          </div>
        </Container>
        <Container className={styles.section}>
          <h2 className={styles.sectionTitle}>Focus Areas</h2>
          <div className={styles.featuresGrid}>
            <Feature
              title="Education"
              description={
                <>
                  Create educational content in the form of tools, guides, and
                  games.
                </>
              }
            />
            <Feature
              title="Integrating Cryptocurrency"
              description={
                <>
                  Integrating cryptocurrency into our platform in several
                  aspects, in addition to being a form of payment.
                </>
              }
            />
            <Feature
              title="Legal and Regulatory Compliance"
              description={
                <>
                  Understanding legal and regulatory compliance, and ensuring
                  our practices are not only compliant, but lead by example.
                </>
              }
            />
          </div>
        </Container>
        <Container className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Current and Future Initiatives
          </h2>
          <div className={styles.featuresGrid}>
            <Feature
              title="Education Games"
              description={
                <>
                  Provide digital games that combine blockchain technology that
                  pick up where the teach left off.
                </>
              }
            />
            <Feature
              title="Cryptocurrency Adoption"
              description={
                <>
                  Utilizing cryptocurrency in ways that advance our
                  understanding and comprehension of the technology, while
                  onboarding more users.
                </>
              }
            />
            <Feature
              title="Education and Crypto Lobbying"
              description={
                <>
                  Creating a product that allows us to advocate for
                  cryptocurrency adoption, and especially within the education
                  sector.
                </>
              }
            />
            <Feature
              title="Tokenomics Dashboard"
              description={<>View the numbers and details the iServ token</>}
              link="/tokenomics"
            />
            <Feature
              title="Tokenomics Visual"
              description={
                <>View the diagram and details the Xogos Gaming system</>
              }
              link="/tokenomicsvisual"
            />
          </div>
        </Container>
      </div>
    </MarketingLayout>
  );
}
