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

const initialNodes: Node[] = [
  // 1. Developers
  {
    id: "developers",
    type: "input",
    data: { label: "Developers" },
    position: { x: 50, y: 50 },
    style: {
      background: "#f7df1e",
      width: 140,
      height: 60,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  },
  // 2. Educational Games
  {
    id: "educational-games",
    data: { label: "Educational Games\n(Students Earn & Spend iPlay)" },
    position: { x: 300, y: 50 },
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
    position: { x: 300, y: 150 },
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
    position: { x: 600, y: 100 },
    style: {
      background: "#7DD3FC",
      width: 140,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 5. Students (Updated)
  {
    id: "students",
    data: { label: "Students\n(Earn & Spend iPlay)" },
    position: { x: 300, y: 250 },
    style: {
      background: "#C7D2FE",
      width: 160,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
      fontWeight: "bold",
    },
  },
  // 6. Conversion to iServ
  {
    id: "iconversion",
    data: { label: "iPlay → iServ\nQuarterly Conversion" },
    position: { x: 850, y: 100 },
    style: {
      background: "#FCA5A5",
      width: 160,
      height: 60,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 7. iServ Token Pools
  {
    id: "iserv-pools",
    data: { label: "iServ Token Pools:\nScholarship, Dev, Board, Liquidity" },
    position: { x: 1100, y: 100 },
    style: {
      background: "#FECACA",
      width: 200,
      height: 80,
      whiteSpace: "pre-wrap",
      textAlign: "center",
      padding: "8px",
    },
  },
  // 8. Scholarships
  {
    id: "scholarships",
    data: { label: "Scholarships\nfor Students" },
    position: { x: 1100, y: 220 },
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
  // 1. Developers -> Educational Games
  {
    id: "edge-developers-games",
    source: "developers",
    target: "educational-games",
    animated: true,
    label: "Build",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 2. Educational Games -> Students
  {
    id: "edge-games-students",
    source: "educational-games",
    target: "students",
    label: "Students Earn iPlay",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 3. Students -> Educational Games (Spending)
  {
    id: "edge-students-games",
    source: "students",
    target: "educational-games",
    label: "Spend iPlay in Games",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 4. Educational Games -> Developers (Spent iPlay goes back)
  {
    id: "edge-games-developers",
    source: "educational-games",
    target: "developers",
    label: "Developers Earn iPlay",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 5. Students -> iPlay Banking System (For saving/conversion)
  {
    id: "edge-students-iplay",
    source: "students",
    target: "iplay-banking",
    label: "Save iPlay in Banking System",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 6. iPlay Banking System -> iServ Conversion
  {
    id: "edge-iplay-iconversion",
    source: "iplay-banking",
    target: "iconversion",
    label: "Convert Quarterly",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 7. iServ Conversion -> iServ Pools
  {
    id: "edge-iconversion-pools",
    source: "iconversion",
    target: "iserv-pools",
    label: "Mint iServ",
    style: { stroke: "#000", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  // 8. iServ Pools -> Scholarships
  {
    id: "edge-pools-scholarships",
    source: "iserv-pools",
    target: "scholarships",
    label: "Funding Allocation",
    style: { stroke: "#000", strokeWidth: 2 },
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
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TokenomicsDiagram;
