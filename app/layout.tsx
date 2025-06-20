import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/Providers";
import { auth } from "@/auth";
import "../styles/normalize.css";
import "@liveblocks/react-comments/styles.css";
import "@liveblocks/react-comments/styles/dark/media-query.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xogos Gaming",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <title>Xogos Gaming</title>
        <link rel="icon" href="/app/icon.jpg" type="image/jpeg" />
      </head>
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
