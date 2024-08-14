import dynamic from "next/dynamic";

const TokenomicsDashboardClient = dynamic(() => import("./tokenomics"), {
  ssr: false,
});

export default function TokenomicsPage() {
  return (
    <div>
      <TokenomicsDashboardClient />
    </div>
  );
}
