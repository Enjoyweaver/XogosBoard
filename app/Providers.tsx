"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { LiveblocksProvider } from "@/liveblocks.config";
import { WagmiConfig } from "wagmi";
import { config } from "@/config/config";

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider session={session}>
        <LiveblocksProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LiveblocksProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
