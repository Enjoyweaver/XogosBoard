import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Access Your Xogos Gaming Educational Account",
  description:
    "Sign in to your Xogos Gaming account to access educational games, track learning progress, and manage rewards. For K-12 students, homeschoolers, parents, and teachers.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
