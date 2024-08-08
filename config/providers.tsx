import { WagmiConfig } from "wagmi";
import { config } from "./config";

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
