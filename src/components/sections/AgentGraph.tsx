import { pipelineNodes, VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from "@/data/pipeline";

// Hand-tuned edge paths connecting the agent nodes below.
// Kept explicit (rather than derived) since this is a fixed, seven-node
// pipeline that mirrors the real LangGraph state graph — precision here
// matters more than generality.
const edges = [
  { id: "transcription-intent", d: "M215,54 L215,90" },
  { id: "intent-retrieval", d: "M215,134 C215,150 325,140 325,170" },
  { id: "intent-escalation", d: "M215,134 C215,150 105,140 105,170" },
  { id: "retrieval-suggestion", d: "M325,214 L325,250" },
  { id: "suggestion-qa", d: "M325,294 C325,320 215,320 215,350" },
  { id: "escalation-qa", d: "M105,214 C105,280 215,280 215,350" },
  { id: "qa-aftercall", d: "M215,394 L215,430" },
];

export default function AgentGraph() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className="h-auto w-full max-w-[430px]"
      role="img"
      aria-label="Diagram of a seven-agent pipeline: Real-Time Transcription feeds Intent Classification, which branches to a sequential Knowledge Retrieval and Response Suggestion path and a parallel Escalation Prediction path, both converging on a QA Agent and finally After-Call Work."
    >
      <defs>
        <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      <g fill="none" strokeLinecap="round">
        {edges.map((edge) => (
          <path
            key={edge.id}
            d={edge.d}
            stroke="var(--border)"
            strokeWidth={1.5}
          />
        ))}
        {/* Traveling pulse per edge — pure SVG animation, no JS required */}
        {edges.map((edge, i) => (
          <circle key={`${edge.id}-pulse`} r={3} fill="var(--accent-bright)">
            <animateMotion
              dur="2.4s"
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
              path={edge.d}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              dur="2.4s"
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* Nodes */}
      <g>
        {pipelineNodes.map((node, i) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={44}
              rx={8}
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            {/* Status dot — reuses the domain's own status-color vocabulary */}
            <circle
              cx={node.x + 16}
              cy={node.y + 22}
              r={4}
              fill={
                i === pipelineNodes.length - 1
                  ? "var(--success)"
                  : "var(--accent-bright)"
              }
              filter="url(#nodeGlow)"
            />
            <text
              x={node.x + 30}
              y={node.y + 22}
              dominantBaseline="middle"
              className="font-mono"
              fontSize={11.5}
              fill="var(--fg)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
