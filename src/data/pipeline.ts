// The real seven-agent pipeline from the Call Center Automation Platform.
// Used to drive the hero's agent-graph visualization.
// Source of truth: project README — classify_intent branches to a
// sequential retrieve_knowledge -> suggest_response path (suggestion
// depends on retrieved content) and a parallel predict_escalation path
// (only depends on intent + sentiment). QA and After-Call Work run after
// the call ends, on the same visual path for simplicity here.

export type PipelineNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
};

export const pipelineNodes: PipelineNode[] = [
  { id: "transcription", label: "Real-Time Transcription", x: 120, y: 10, width: 190 },
  { id: "intent", label: "Intent Classification", x: 120, y: 90, width: 190 },
  { id: "retrieval", label: "Knowledge Retrieval", x: 230, y: 170, width: 190 },
  { id: "suggestion", label: "Response Suggestion", x: 230, y: 250, width: 190 },
  { id: "escalation", label: "Escalation Prediction", x: 10, y: 170, width: 190 },
  { id: "qa", label: "QA Agent", x: 120, y: 350, width: 190 },
  { id: "afterCall", label: "After-Call Work", x: 120, y: 430, width: 190 },
];

export const NODE_HEIGHT = 44;
export const VIEWBOX_WIDTH = 430;
export const VIEWBOX_HEIGHT = 500;
