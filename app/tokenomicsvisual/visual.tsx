import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";

const baseNodeStyle: React.CSSProperties = {
  width: 180,
  height: 80,
  padding: "8px",
  textAlign: "center" as const,
  whiteSpace: "pre-wrap",
};

const NODE_STYLES = {
  token: {
    ...baseNodeStyle,
    background: "#7DD3FC",
    border: "2px solid #0284C7",
  },
  economic: {
    ...baseNodeStyle,
    background: "#FCA5A5",
    border: "2px solid #DC2626",
  },
  stakeholder: {
    ...baseNodeStyle,
    background: "#C7D2FE",
    border: "2px solid #4F46E5",
    fontWeight: "bold",
  },
  system: {
    ...baseNodeStyle,
    background: "#FDE68A",
    border: "2px solid #D97706",
  },
  pool: {
    ...baseNodeStyle,
    background: "#FECACA",
    border: "2px solid #DC2626",
  },
  governance: {
    ...baseNodeStyle,
    background: "#86EFAC",
    border: "2px solid #16A34A",
  },
};

const initialNodes: Node[] = [
  // Top Row: Developers, iPlay, iServ, Badge Sales & Transaction Fees
  {
    id: "developers",
    type: "input",
    data: { label: "Developers\nCreate Educational Content" },
    position: { x: 50, y: 50 },
    style: NODE_STYLES.stakeholder,
  },
  {
    id: "iplay-token",
    data: { label: "iPlay Token\n(Educational Utility)\nInfinite Supply" },
    position: { x: 350, y: 50 },
    style: NODE_STYLES.token,
  },
  {
    id: "iserv-token",
    data: { label: "iServ Token\n(Governance)\nFixed Supply: 106M" },
    position: { x: 550, y: 50 },
    style: NODE_STYLES.token,
  },
  {
    id: "badge-sales",
    data: { label: "Badge (NFT) Sales\nPrimary Revenue Stream" },
    position: { x: 800, y: 50 },
    style: NODE_STYLES.economic,
  },
  {
    id: "transaction-fees",
    data: { label: "Transaction Fees\n5% Total Fee" },
    position: { x: 1300, y: 50 },
    style: NODE_STYLES.economic,
  },

  // Second Row: Educational Games & Active Incentive Programs
  {
    id: "educational-games",
    data: {
      label: "Educational Games\n(2 coins max daily)\nCoin-Producing Games",
    },
    position: { x: 50, y: 200 },
    style: NODE_STYLES.economic,
  },
  {
    id: "aips",
    data: {
      label:
        "Active Incentive Programs\n(2 coins max daily)\nOff-screen Activities",
    },
    position: { x: 250, y: 200 },
    style: NODE_STYLES.economic,
  },

  // Third Row: Students (below Education Games & AIPs)
  {
    id: "students",
    data: { label: "Students\nEarn & Save iPlay\nMax 4 coins daily" },
    position: { x: 150, y: 350 },
    style: NODE_STYLES.stakeholder,
  },

  // Fourth Row: Banking System Section (below/right of Students)
  {
    id: "banking-system",
    data: { label: "Banking System\n30d→1.1x  60d→1.25x\n90d→1.5x  180d→2.0x" },
    position: { x: 350, y: 450 },
    style: NODE_STYLES.system,
  },
  {
    id: "board-governance",
    data: { label: "Board Governance\nPlatform Liability\nCore Parameters" },
    position: { x: 550, y: 250 },
    style: NODE_STYLES.governance,
  },
  {
    id: "conversion-system",
    data: {
      label:
        "Quarterly Conversion\nR(x) = R0 * (1-x)^k\nDynamic Rate + Board Oversight",
    },
    position: { x: 500, y: 550 },
    style: NODE_STYLES.system,
  },

  // Right Side (Pools & Scholarship Distribution remain unchanged)
  {
    id: "scholarship-pool",
    data: {
      label: "Scholarship Pool\n65% Badge + 3% Fees\n85% Direct Distribution",
    },
    position: { x: 1050, y: 200 },
    style: NODE_STYLES.pool,
  },
  {
    id: "liquidity-pool",
    data: { label: "Liquidity Pool\n20% Badge + 1% Fees" },
    position: { x: 1050, y: 350 },
    style: NODE_STYLES.pool,
  },
  {
    id: "dev-pool",
    data: { label: "Developer Pool\n10% Badge + 0.5% Fees" },
    position: { x: 1050, y: 450 },
    style: NODE_STYLES.pool,
  },
  {
    id: "board-pool",
    data: { label: "Board Pool\n5% Badge + 0.5% Fees" },
    position: { x: 1050, y: 550 },
    style: NODE_STYLES.pool,
  },
  {
    id: "strategic-reserve",
    data: { label: "Strategic Reserve\n10% of Scholarship" },
    position: { x: 1300, y: 350 },
    style: NODE_STYLES.pool,
  },
  {
    id: "annual-fund",
    data: { label: "Annual Scholarship\n5% of Scholarship" },
    position: { x: 1300, y: 500 },
    style: NODE_STYLES.pool,
  },
];

const initialEdges: Edge[] = [
  // Earning Flows
  {
    id: "e1",
    source: "educational-games",
    target: "students",
    label: "Earn iPlay",
    animated: true,
    style: { stroke: "#0284C7", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2",
    source: "aips",
    target: "students",
    label: "Earn iPlay",
    animated: true,
    style: { stroke: "#0284C7", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  // Developer Flow
  {
    id: "e3",
    source: "developers",
    target: "educational-games",
    label: "Create Content",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  // Banking & Conversion
  {
    id: "e4",
    source: "students",
    target: "banking-system",
    label: "Save iPlay",
    animated: true,
    style: { stroke: "#0284C7", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e5",
    source: "banking-system",
    target: "conversion-system",
    label: "Quarterly Conversion",
    style: { stroke: "#0284C7", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e16",
    source: "board-governance",
    target: "conversion-system",
    label: "Oversight",
    style: { stroke: "#16A34A", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e17",
    source: "iplay-token",
    target: "banking-system",
    label: "Token Flow",
    style: { stroke: "#0284C7", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e18",
    source: "iserv-token",
    target: "board-governance",
    label: "Governance",
    style: { stroke: "#16A34A", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  // Revenue Distribution from Badge Sales
  {
    id: "e6",
    source: "badge-sales",
    target: "scholarship-pool",
    label: "65%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e7",
    source: "badge-sales",
    target: "liquidity-pool",
    label: "20%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e8",
    source: "badge-sales",
    target: "dev-pool",
    label: "10%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e9",
    source: "badge-sales",
    target: "board-pool",
    label: "5%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  // Transaction Fee Distribution
  {
    id: "e10",
    source: "transaction-fees",
    target: "scholarship-pool",
    label: "3%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e11",
    source: "transaction-fees",
    target: "liquidity-pool",
    label: "1%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e12",
    source: "transaction-fees",
    target: "dev-pool",
    label: "0.5%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e13",
    source: "transaction-fees",
    target: "board-pool",
    label: "0.5%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },

  // Scholarship Distribution from Scholarship Pool
  {
    id: "e14",
    source: "scholarship-pool",
    target: "strategic-reserve",
    label: "10%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e15",
    source: "scholarship-pool",
    target: "annual-fund",
    label: "5%",
    style: { stroke: "#DC2626", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

function TokenomicsDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    [setNodes]
  );

  return (
    <div style={{ width: "100%", height: "1200px" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TokenomicsDiagram;
