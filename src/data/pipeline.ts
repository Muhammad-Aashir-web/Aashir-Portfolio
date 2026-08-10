// The real agent pipeline from the Call Center Automation Platform.
// Used to drive the hero's agent-graph visualization.

export type PipelineNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
};

export type PipelineEdge = {
  from: string;
  to: string;
};

export const pipelineNodes: PipelineNode[] = [
  { id: "intent", label: "Intent Classification", x: 10, y: 10, width: 190 },
  { id: "retrieval", label: "Knowledge Retrieval", x: 230, y: 90, width: 190 },
  { id: "suggestion", label: "Response Suggestion", x: 230, y: 170, width: 190 },
  { id: "escalation", label: "Escalation Prediction", x: 10, y: 170, width: 190 },
  { id: "qa", label: "QA Agent", x: 120, y: 270, width: 190 },
  { id: "afterCall", label: "After-Call Work", x: 120, y: 350, width: 190 },
];

export const pipelineEdges: PipelineEdge[] = [
  { from: "intent", to: "retrieval" },
  { from: "intent", to: "escalation" },
  { from: "retrieval", to: "suggestion" },
  { from: "suggestion", to: "qa" },
  { from: "escalation", to: "qa" },
  { from: "qa", to: "afterCall" },
];

export const NODE_HEIGHT = 44;
export const VIEWBOX_WIDTH = 430;
export const VIEWBOX_HEIGHT = 420;