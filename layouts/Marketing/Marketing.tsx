"use client"; // required if you’re using hooks in a layout

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { MarketingFooter, MarketingHeader } from "@/components/Marketing";
import { BoardroomHeader } from "@/components/Marketing/BoardroomHeader";
import styles from "./Marketing.module.css";

export function MarketingLayout({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  const pathname = usePathname();

  // If the path starts with "/board", show BoardroomHeader; otherwise show MarketingHeader
  const showBoardroomHeader = pathname?.startsWith("/board");

  return (
    <div className={clsx(className, styles.layout)} {...props}>
      {showBoardroomHeader ? <BoardroomHeader /> : <MarketingHeader />}
      <main>{children}</main>
      <MarketingFooter className={styles.footer} />
    </div>
  );
}
