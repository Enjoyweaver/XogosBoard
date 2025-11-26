import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Educational Games for K-12 Students | History, Math, Science & Finance",
  description:
    "Explore Xogos educational games for K-12 students, homeschoolers, and classrooms. Learn history, personal finance, math, and science through engaging gameplay. Games include Historical Conquest, Debt-Free Millionaire, Bug and Seek, and more.",
  keywords: [
    "educational games for kids",
    "K-12 learning games",
    "homeschool games",
    "history games for students",
    "personal finance games for kids",
    "financial literacy games",
    "math games for students",
    "science games for kids",
    "classroom educational games",
    "games for teachers",
    "middle school educational games",
    "high school learning games",
    "elementary school games",
    "Historical Conquest card game",
    "Debt-Free Millionaire game",
    "Bug and Seek science game",
    "educational gaming platform",
    "learn history through games",
    "gamified learning",
    "STEM games for kids",
  ],
  openGraph: {
    title: "Educational Games for K-12 Students | Xogos Gaming",
    description:
      "Explore educational games for K-12 students. Learn history, personal finance, math, and science through engaging gameplay designed for homeschoolers, classrooms, and families.",
    url: "https://xogosgaming.com/games",
    images: [
      {
        url: "/images/games/HistoricalConquest.jpg",
        width: 1200,
        height: 630,
        alt: "Xogos Educational Games Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@XogosEducation",
    creator: "@XogosEducation",
    title: "Educational Games for K-12 Students | Xogos Gaming",
    description:
      "Explore educational games for K-12 students. Learn history, personal finance, math, and science through engaging gameplay.",
    images: ["/images/games/HistoricalConquest.jpg"],
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
