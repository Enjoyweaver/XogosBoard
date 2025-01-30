"use client";

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
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

const timelineData: TimelineEvent[] = [
  {
    id: "event1",
    date: "Feb 1, 2025",
    title: "Building a Database",
    description: "Creating a database for revenue, games, and participation.",
    completed: true,
  },
  {
    id: "event2",
    date: "Feb 10, 2025",
    title: "Publicly Viewable Smart Contracts",
    description:
      "Adding publicly viewable info to smart contracts, including balance, levels, and rewards.",
    completed: true,
  },
  {
    id: "event3",
    date: "Feb 15, 2025",
    title: "Minimum Viable Product",
    description:
      "Defining what our MVP is and whether it is per game, ensuring it scales without friction.",
    completed: false,
  },
  {
    id: "event4",
    date: "Feb 27, 2025",
    title: "Finalizing Bylaws",
    description:
      "Establishing bylaws, forming an advisory board, and setting up committees. Must be completed and voted on by this date.",
    completed: false,
  },
  {
    id: "event5",
    date: "Mar 5, 2025",
    title: "Education Games Framework",
    description:
      "Creating a structured framework for education games, including age range, content, scope, and purpose.",
    completed: false,
  },
  {
    id: "event6",
    date: "Mar 12, 2025",
    title: "Cryptocurrency Integration Status",
    description:
      "Establishing a framework to track progress on web3 integration.",
    completed: false,
  },
  {
    id: "event7",
    date: "Mar 20, 2025",
    title: "Game Release Participation",
    description: "Ensuring structured planning for game release engagement.",
    completed: false,
  },
  {
    id: "event8",
    date: "Mar 25, 2025",
    title: "Game User Information Storage",
    description: "Determining what user information is stored and how.",
    completed: false,
  },
  {
    id: "event9",
    date: "Apr 1, 2025",
    title: "Crypto Exchange Integration",
    description: "Deciding which crypto exchanges to integrate with and why.",
    completed: false,
  },
  {
    id: "event10",
    date: "Apr 10, 2025",
    title: "Insurance and Risk",
    description:
      "Outlining the risk register with known risks associated with the project.",
    completed: false,
  },
  // Additional Suggested Events
  {
    id: "event11",
    date: "May 5, 2025",
    title: "User Testing Phase",
    description: "Conduct user testing to gather feedback on the MVP.",
    completed: false,
  },
  {
    id: "event12",
    date: "May 15, 2025",
    title: "Marketing Campaign Launch",
    description: "Initiate marketing efforts to promote the MVP.",
    completed: false,
  },
  {
    id: "event13",
    date: "June 1, 2025",
    title: "Feedback Analysis & Iteration",
    description: "Analyze user feedback and iterate on the product.",
    completed: false,
  },
  {
    id: "event14",
    date: "June 20, 2025",
    title: "Full Product Launch",
    description: "Officially launch the full product to the public.",
    completed: false,
  },
  {
    id: "event15",
    date: "July 1, 2025",
    title: "Post-Launch Support Setup",
    description: "Establish support channels and resources for users.",
    completed: false,
  },
  {
    id: "event16",
    date: "July 15, 2025",
    title: "Expansion Planning",
    description: "Plan for future expansions and feature additions.",
    completed: false,
  },
];

// Define the timeline events as nodes with alternating positions
const initialNodes: Node[] = timelineData.map((event, index) => ({
  id: event.id,
  type: "default",
  data: {
    label: (
      <div style={{ textAlign: "center" }}>
        <div className="flex items-center justify-center">
          {event.completed ? (
            <FaCheckCircle color="#16a34a" size={20} />
          ) : (
            <FaRegCircle color="#d1d5db" size={20} />
          )}
          <span style={{ marginLeft: 8, fontWeight: "bold" }}>
            {event.date}
          </span>
        </div>
        <div style={{ marginTop: 8, fontWeight: "bold" }}>{event.title}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(event.description);
          }}
          style={{
            marginTop: 8,
            padding: "4px 8px",
            background: event.completed ? "#16a34a" : "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {event.completed ? "Completed" : "View Details"}
        </button>
      </div>
    ),
  },
  position: {
    x: index * 300,
    y: index % 2 === 0 ? -100 : 100, // Alternate above and below
  },
  style: {
    width: 220,
    padding: 10,
    background: event.completed ? "#d1fae5" : "#fef3c7",
    border: "2px solid #000",
    borderRadius: 5,
  },
}));

// Define the connections between events as edges
const initialEdges: Edge[] = timelineData.slice(0, -1).map((event, index) => ({
  id: `e${event.id}-${timelineData[index + 1].id}`,
  source: event.id,
  target: timelineData[index + 1].id,
  type: "smoothstep",
  animated: true,
  arrowHeadType: MarkerType.ArrowClosed,
  label: "Next Step",
  style: { stroke: "#000", strokeWidth: 2 },
}));

function Timeline() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    [setNodes]
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "20px 0" }}>
        Project Timeline
      </h2>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          style={{ background: "#f0f0f0" }}
        >
          <MiniMap
            nodeColor={(node) => {
              if (
                node.data.label.props.children[0].props.children[0].type ===
                FaCheckCircle
              ) {
                return "green";
              }
              return "grey";
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default Timeline;
