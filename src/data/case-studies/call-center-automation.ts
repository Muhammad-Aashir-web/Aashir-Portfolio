import { CaseStudy } from "./types";

export const callCenterAutomation: CaseStudy = {
  slug: "call-center-automation",
  name: "AI Call Center Automation Platform",
  tagline:
    "A seven-agent LangGraph system that transcribes and analyzes calls live — classifying intent, retrieving knowledge, and predicting escalation risk in real time — then scores and summarizes every call automatically once it ends.",

  problem:
    "Manual call center QA doesn't scale. Human reviewers can only spot-check a fraction of calls, usually days after they happen — by which point a preventable escalation has already turned into a complaint, and the agent never got real-time help finding the right answer while the caller was still on the line.",

  solution:
    "A seven-agent LangGraph pipeline that runs alongside a live call: it transcribes audio in real time, classifies caller intent, retrieves relevant knowledge through hybrid search, drafts a grounded response suggestion, and tracks sentiment trajectory to predict escalation risk before it happens — all built on a fully self-hosted, $0-infrastructure stack. Once the call ends, two additional on-demand agents score the call against a QA rubric and generate a structured summary with follow-up actions, replacing a process that used to depend entirely on manual review and agent memory.",

  architecture:
    "Browser-captured audio streams over WebSocket to a Real-Time Transcription Agent (Groq Whisper Large v3 Turbo, with a local faster-whisper fallback). The transcript feeds a LangGraph graph invoked once per audio turn: Intent Classification (a fine-tuned DistilBERT model) branches into two paths — a sequential path where Knowledge Retrieval (ChromaDB + BM25 hybrid search, fused via Reciprocal Rank Fusion) feeds Response Suggestion (Groq Llama 3.3 70B, strictly grounded in retrieved content), since suggestions can't be generated without retrieved context; and a parallel path where Escalation Prediction (a locally trained XGBoost classifier reading VADER-derived sentiment trend) runs independently, since it only depends on intent and sentiment, not retrieval. Redis holds session state with a 1-hour TTL so per-turn graph invocations share context across a call. QA scoring and After-Call Work summarization are deliberately not LangGraph nodes — both need the complete transcript, which only exists once the call ends — so they're exposed as on-demand REST endpoints, manually triggered from the live dashboard, with After-Call reading the cached QA score rather than re-scoring. After-Call Work also fires a non-blocking n8n webhook, demonstrating a workflow-automation trigger pattern.",
  architectureDiagram: "/diagrams/call-center-architecture.png",

  stack: [
    {
      name: "LangGraph",
      why: "Orchestrates the live-call agent graph, branching Intent Classification into a sequential retrieval-then-suggestion path and a parallel escalation-prediction path based on each agent's real data dependencies — not a default parallel-everything structure.",
    },
    {
      name: "FastAPI",
      why: "Backend serving the WebSocket transcription stream plus the on-demand QA and After-Call REST endpoints, added after those endpoints became the first features to call the backend outside of WebSocket.",
    },
    {
      name: "Redis",
      why: "Session state store (1-hour TTL) shared across per-turn graph invocations for a single live call, plus caching for the QA score so After-Call Work can reuse it instead of re-scoring.",
    },
    {
      name: "Groq Whisper Large v3 Turbo",
      why: "Real-time speech-to-text with a local faster-whisper fallback if the free-tier rate limit is hit mid-session — chosen for streaming-capable, low-latency transcription under a zero-cost infrastructure constraint.",
    },
    {
      name: "Groq Llama 3.3 70B",
      why: "Handles grounded response generation, QA rubric scoring, and after-call summarization behind a provider-agnostic LLMClient wrapper with Gemini and Ollama fallbacks.",
    },
    {
      name: "Fine-tuned DistilBERT",
      why: "Local intent classifier across an 8-category taxonomy — chosen over an LLM call for the latency a live call demands on every utterance.",
    },
    {
      name: "ChromaDB + sentence-transformers",
      why: "Local embedded vector search for the knowledge base, fused with BM25 keyword search via Reciprocal Rank Fusion, since pure semantic search underperformed on short, keyword-heavy support queries.",
    },
    {
      name: "XGBoost",
      why: "Escalation prediction model, chosen over an LLM call for latency and for interpretable feature importance — useful for coaching agents on what actually drove risk.",
    },
    {
      name: "n8n",
      why: "Demonstrates a workflow-automation trigger pattern from agent output to a downstream system, without claiming a live production CRM integration that doesn't exist for this project.",
    },
    {
      name: "React / TypeScript / Tailwind",
      why: "The live CallDashboard, wired end-to-end over WebSocket with manually-triggered post-call panels for QA and After-Call review.",
    },
  ],

  features: [
    "Real-time speech-to-text via Groq Whisper Large v3 Turbo with an offline fallback, feeding a live transcript to every downstream agent.",
    "Intent classification at 90.62% validation accuracy (weighted F1 0.90) from a fine-tuned DistilBERT model, with an empirically calibrated confidence threshold.",
    "Hybrid knowledge retrieval — ChromaDB semantic search fused with BM25 keyword search via Reciprocal Rank Fusion — grounding every response suggestion in the real knowledge base instead of model hallucination.",
    "Escalation risk prediction at 0.86 AUC-ROC from a locally trained XGBoost classifier reading live sentiment trend, not just a single sentiment score.",
    "On-demand post-call QA scoring across a 6-dimension rubric with an independently-weighted overall score and transcript-grounded coaching flags — not generic filler.",
    "Automated after-call summarization with a human-review flag tracked independently from resolution status, plus a demonstrable n8n workflow-automation trigger.",
  ],

  challenges: [
    {
      title: "Making a synthetic escalation dataset actually learnable",
      problem:
        "No real call center data exists for this project, so the Escalation Prediction Agent had to train on synthetic, heuristically-labeled data — and the initial labeling heuristic (combining intent confidence, sentiment trend and minimum, call length, and a hold-time proxy) produced a measured AUC-ROC ceiling of just 0.73, regardless of how the model was tuned.",
      investigation:
        "The ceiling traced back to the label distribution itself being too soft to learn cleanly — the heuristic was producing overlapping, ambiguous labels rather than a genuinely separable escalation signal for XGBoost to learn from.",
      decision:
        "Applied an odds-power sharpening transform to the labeling heuristic to push the label distribution toward a cleaner, more learnable separation, instead of switching models or adding features to compensate for underlying label ambiguity.",
      result:
        "The achievable ceiling rose to 0.88 before jitter, with the final trained classifier landing at 0.86 AUC-ROC — comfortably above the 0.80 target, and documented transparently as reflecting how well the model recovers a designed synthetic signal, not real-world escalation accuracy.",
    },
    {
      title: "Deciding QA and After-Call Work don't belong inside the LangGraph pipeline",
      problem:
        "The original design treated all seven agents as LangGraph nodes in one continuous graph, including QA scoring and after-call summarization.",
      investigation:
        "The graph is invoked once per audio turn during a live call — but QA scoring and after-call summarization both need the complete transcript to produce meaningful output; you can't meaningfully score 'closing' quality or summarize resolution status mid-call.",
      decision:
        "Pulled QA and After-Call Work out of the graph entirely and exposed them as on-demand REST endpoints instead, manually triggered from the dashboard after a call ends — which also avoids firing an LLM call on every test call during development, closer to how a real supervisor reviews calls on demand.",
      result:
        "A cleaner separation between the real-time, per-turn graph and the two genuinely post-call agents, plus a QA rubric where the overall score is generated independently from the six dimension scores rather than averaged, so a single serious issue like a compliance violation can weigh disproportionately — the way a real reviewer would.",
    },
    {
      title: "The first real REST call from the dashboard surfaced a missing CORS policy",
      problem:
        "Every prior feature in the dashboard communicated over WebSocket, which isn't subject to CORS — so when the QA and After-Call panels became the first features to call the FastAPI backend directly over REST from the browser, requests failed silently.",
      investigation:
        "Traced the failures to the backend simply never having needed a CORS policy before, since WebSocket connections don't trigger the browser's CORS preflight checks the way a REST fetch does.",
      decision:
        "Added CORS middleware scoped specifically to the frontend's dev origin, rather than a permissive wildcard policy, keeping the same origin-restriction discipline the rest of the backend already followed.",
      result:
        "Working QA and After-Call panels, and a concrete example of how a gap in infrastructure can stay invisible until a genuinely new interaction pattern exposes it.",
    },
  ],

  learnings: [
    "A model's performance ceiling can come from the labels, not the algorithm — sharpening the synthetic data's separability mattered more than any amount of XGBoost tuning.",
    "Not every agent belongs in the orchestration graph. QA and After-Call Work needed the complete transcript, not a per-turn view, so keeping them as on-demand endpoints outside the graph was a more honest fit than forcing everything into one architecture.",
    "Infrastructure gaps, like a missing CORS policy, can stay invisible for a long time if every existing feature happens to share the same communication pattern — they only surface when something genuinely new is added.",
  ],

  limitations: [
    "The intent classifier's confidence threshold is calibrated to 0.35 rather than a conventional 0.6–0.8, because the small training set (640 examples, 4 epochs) produces genuine softmax under-confidence even on correct predictions — argmax accuracy (90.62%) is unaffected, only the confidence magnitude reads low.",
    "VADER's lexicon-based sentiment scoring struggles with negation-heavy phrasing — 'Still not fixed, very annoyed' scores as mildly positive (+0.34), since 'not' is parsed as negating 'fixed' rather than scoping over 'annoyed'. A production system at scale would likely swap in a lightweight fine-tuned transformer instead.",
    "Sentiment trend is a linear regression slope over the last 5 scores, so a call that dips negative, briefly recovers, then drops again can read as a near-flat trend despite a clearly deteriorating conversation — a recency-weighted feature would capture this better.",
    "QA scoring's target correlation against human review (>0.85 Pearson) is unvalidated, since no human-labeled QA dataset exists for this project — it's disclosed as an aspirational target from the original spec, not a measured result.",
  ],

  repoUrl: "https://github.com/Muhammad-Aashir-web/call-center-automation",
};
