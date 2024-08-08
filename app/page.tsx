import clsx from "clsx";
import Link from "next/link"; // Corrected import for Link
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
  link?: string; // Add link prop
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
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </>
  );

  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      {link ? <Link href={link}>{content}</Link> : content}
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
          <h1 className={styles.heroTitle}>Xogos Gaming</h1>
          <h1 className={styles.heroTitle2}>Board of Directors</h1>
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
            title="Integrating Cryptocurrency"
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
                Utilizing cryptocurrency in ways that advance our understanding
                and comprehension of the technology, while onboarding more
                users.
              </>
            }
            title="Cryptocurrency Adoption"
          />
          <Feature
            description={
              <>
                Creating a product that allows us to advocate for cryptocurrency
                adoption, and especially within the education sector.
              </>
            }
            title="Education and Crypto Lobbying"
          />
          <Feature
            description={<>View the numbers and details the iServ token</>}
            title="Tokenomics Dashboard"
            link="/tokenomics"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}
