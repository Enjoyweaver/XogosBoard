import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlowProvider,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";

const initialNodes: Node[] = [
  // 1. Developers
  {
    id: "developers",
    type: "input",
    data: { label: "Developers" },
    position: { x: 0, y: 0 },
    style: {
      background: "#f7df1e",
      width: 120,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  },
  // 2. Educational Games
  {
    id: "educational-games",
    data: { label: "Coin-Producing & Non-Producing\nEducational Games" },
    position: { x: 250, y: -50 },
    style: {
      background: "#FDE68A",
      width: 200,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 3. AIPs (iServ Volunteer App)
  {
    id: "aips",
    data: { label: "AIPs (iServ Volunteer App)" },
    position: { x: 250, y: 70 },
    style: {
      background: "#FDE68A",
      width: 200,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  },
  // 4. iPlay Coin Banking System
  {
    id: "iplay-banking",
    data: { label: "iPlay Coin\n(Banking System)" },
    position: { x: 540, y: 0 },
    style: {
      background: "#7DD3FC",
      width: 120,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 5. Student Perspective
  {
    id: "students",
    data: { label: "Students\n(Earn iPlay coins)" },
    position: { x: 160, y: 200 },
    style: {
      background: "#C7D2FE",
      width: 140,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
      fontWeight: "bold",
    },
  },
  // 6. In-App Spending
  {
    id: "in-app-spending",
    data: { label: "Spend iPlay\n(In-App Purchases)" },
    position: { x: 390, y: 200 },
    style: {
      background: "#A5F3FC",
      width: 120,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 7. Developer Earnings
  {
    id: "dev-earnings",
    data: { label: "Developers\nReceive iPlay" },
    position: { x: 600, y: 200 },
    style: {
      background: "#F9A8D4",
      width: 120,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 8. Conversion to iServ
  {
    id: "iconversion",
    data: { label: "iPlay → iServ\nQuarterly Conversion" },
    position: { x: 720, y: 0 },
    style: {
      background: "#FCA5A5",
      width: 160,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 9. iServ Token Pools
  {
    id: "iserv-pools",
    data: { label: "iServ Token Pools:\nScholarship, Dev, Board, Liquidity" },
    position: { x: 970, y: -20 },
    style: {
      background: "#FECACA",
      width: 200,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 10. Scholarships
  {
    id: "scholarships",
    data: { label: "Scholarships\nfor Students" },
    position: { x: 970, y: 110 },
    style: {
      background: "#FCD34D",
      width: 160,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
];

const initialEdges: Edge[] = [
  // Flow from Developers -> Educational Games
  {
    id: "edge-developers-games",
    source: "developers",
    target: "educational-games",
    animated: true,
    label: "Build",
    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from Developers -> AIPs
  {
    id: "edge-developers-aips",
    source: "developers",
    target: "aips",
    animated: true,
    label: "Build/Manage",
    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from Educational Games -> iPlay Coin
  {
    id: "edge-games-iplay",
    source: "educational-games",
    target: "iplay-banking",
    label: "Students Earn iPlay",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from AIPs -> iPlay Coin
  {
    id: "edge-aips-iplay",
    source: "aips",
    target: "iplay-banking",
    label: "Students Earn iPlay",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from Students -> iPlay Coin
  {
    id: "edge-students-iplay",
    source: "students",
    target: "iplay-banking",
    label: "Check balances\n& statements",
    style: { strokeDasharray: "5,5", stroke: "#000", strokeWidth: 2 },
  },
  // Flow from iPlay Coin -> Students
  {
    id: "edge-iplay-students",
    source: "iplay-banking",
    target: "students",
    label: "Max 4 iPlay/day",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from iPlay Coin -> In-App Spending
  {
    id: "edge-iplay-inapp",
    source: "iplay-banking",
    target: "in-app-spending",
    label: "Spend iPlay",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from In-App Spending -> Developers
  {
    id: "edge-inapp-dev",
    source: "in-app-spending",
    target: "dev-earnings",
    label: "Developers Earn iPlay",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from iPlay Coin -> iServ Conversion
  {
    id: "edge-iplay-iconversion",
    source: "iplay-banking",
    target: "iconversion",
    label: "Save iPlay,\nConvert Quarterly",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from iServ Conversion -> iServ Pools
  {
    id: "edge-iconversion-pools",
    source: "iconversion",
    target: "iserv-pools",
    label: "Mint iServ",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
  // Flow from iServ Pools -> Scholarships
  {
    id: "edge-pools-scholarships",
    source: "iserv-pools",
    target: "scholarships",
    label: "Funding Allocation",
    markerEnd: { type: MarkerType.ArrowClosed },

    style: {
      stroke: "#000",
      strokeWidth: 2,
    },
  },
];

function TokenomicsDiagram() {
  // Load any saved layout from localStorage or fall back to `initialNodes`
  const savedNodes =
    typeof window !== "undefined"
      ? localStorage.getItem("diagram-nodes")
      : null;
  const parsedNodes = savedNodes ? JSON.parse(savedNodes) : initialNodes;

  const [nodes, setNodes, onNodesChange] = useNodesState(parsedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Whenever nodes change (dragging, etc.), save them to localStorage
  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((currentNodes) => {
        const newNodes = applyNodeChanges(changes, currentNodes);
        // Save new layout in localStorage
        localStorage.setItem("diagram-nodes", JSON.stringify(newNodes));
        return newNodes;
      });
    },
    [setNodes]
  );

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TokenomicsDiagram;
