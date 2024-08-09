import dynamic from "next/dynamic";
import TokenomicsDashboardClient from "./tokenomics";

const TokenomicsDashboard = dynamic(
  () => Promise.resolve(TokenomicsDashboardClient),
  {
    ssr: false,
    loading: () => <p>Loading dashboard...</p>,
  }
);

export default function TokenomicsPage() {
  return (
    <div>
      <TokenomicsDashboard />
    </div>
  );
}
