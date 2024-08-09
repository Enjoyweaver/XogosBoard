import dynamic from "next/dynamic";

const TokenomicsDashboard = dynamic(() => import("./tokenomics"), {
  ssr: false,
  loading: () => <p>Loading dashboard...</p>,
});

export default function TokenomicsPage() {
  return (
    <div>
      <TokenomicsDashboard />
    </div>
  );
}
