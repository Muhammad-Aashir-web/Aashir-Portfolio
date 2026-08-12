import { CaseStudy } from "./types";

export const contractAnalysisEngine: CaseStudy = {
  slug: "contract-analysis-engine",
  name: "Intelligent Contract Analysis & Compliance Engine",
  tagline:
    "A six-agent LangGraph pipeline that extracts contract clauses, checks them against GDPR, HIPAA, SOX, and CCPA compliance frameworks, scores risk, and drafts negotiation suggestions — with three agents running in parallel once extraction completes.",

  problem:
    "Manual contract review is slow, inconsistent across reviewers, and rarely checked against more than one compliance framework at a time. There's usually no structured audit trail showing what was actually checked on a given contract, and no systematic negotiation guidance for clauses flagged as high-risk — every review starts from a blank page.",

  solution:
    "A six-agent LangGraph pipeline that takes a contract from upload to a fully audited result: it ingests and parses the document, extracts structured clauses, then runs Risk Assessment, Compliance checking, and Negotiation support in parallel once extraction completes, before a final agent finalizes the audit trail. Contract processing runs asynchronously via Celery so uploads don't block the API, and the whole stack is containerized across six services with Docker Compose.",

  architecture:
    "The Document Ingestion Agent validates file type, extracts text (via PyMuPDF and Unstructured, with pytesseract and Pillow handling OCR for scanned documents), cleans the content, and chunks long contracts. The Clause Extraction Agent uses OpenAI (GPT-4o-mini) to identify clause types and normalize them into structured output. From there, the pipeline branches into three agents that run in parallel via a ThreadPoolExecutor — not LangGraph's native parallel branching — since Risk Assessment, Compliance, and Negotiation all depend only on the extracted clauses, not on each other: Risk Assessment scores clauses with deterministic heuristics first, then layers in LLM-based qualitative analysis; Compliance checks each clause against framework-specific requirement sets (GDPR, HIPAA, SOX, CCPA, and a general framework), grounded via RAG against Pinecone and Weaviate vector stores, producing a score plus recommendations; Negotiation generates rewritten clause language and an overall negotiation strategy for high-risk clauses. Once all three finish, the Audit Logging Agent finalizes the trace, recording start, completion, failure, and summary events for every pipeline stage. Celery workers handle the actual contract processing asynchronously so the FastAPI backend stays responsive during long LLM calls, with Redis coordinating task state. Two n8n workflows demonstrate downstream automation: one handles real DocuSign webhook events, the other models a Salesforce CRM sync pattern without being connected to a live Salesforce account.",

  stack: [
    {
      name: "LangGraph",
      why: "Orchestrates the six-agent pipeline, with Risk Assessment, Compliance, and Negotiation deliberately run in parallel via a ThreadPoolExecutor once their shared dependency (clause extraction) completes.",
    },
    {
      name: "FastAPI + Celery + Redis",
      why: "FastAPI serves the API layer while Celery workers handle contract processing asynchronously, so a long-running multi-agent analysis doesn't block the API; Redis coordinates task state between them.",
    },
    {
      name: "PostgreSQL + SQLAlchemy + Alembic",
      why: "Persistent storage for contracts, extracted clauses, and audit events, with Alembic managing schema migrations as the data model evolved.",
    },
    {
      name: "OpenAI (GPT-4o-mini)",
      why: "Clause extraction and the qualitative half of risk and negotiation analysis — chosen for cost efficiency across a pipeline where several agents make LLM calls on every single contract.",
    },
    {
      name: "Pinecone + Weaviate",
      why: "Dual vector stores grounding the Compliance Agent's RAG lookups against framework-specific requirement text for GDPR, HIPAA, SOX, and CCPA.",
    },
    {
      name: "LlamaIndex + LangChain",
      why: "Retrieval orchestration layered on top of the vector stores for the compliance and negotiation lookups.",
    },
    {
      name: "PyMuPDF, Unstructured, python-docx, pytesseract",
      why: "Document parsing across PDF, Word, and scanned contracts — pytesseract with Pillow specifically handles OCR fallback for scanned/image-based documents that have no extractable text layer.",
    },
    {
      name: "n8n",
      why: "Demonstrates downstream workflow automation: real DocuSign webhook handling, and a Salesforce CRM sync pattern that isn't connected to a live Salesforce instance.",
    },
    {
      name: "React 19 + TypeScript + Tailwind + React Query",
      why: "Frontend dashboard for viewing contracts, risk scores, compliance results, and negotiation suggestions.",
    },
  ],

  features: [
    "End-to-end contract analysis: upload, clause extraction, risk scoring, compliance checking, negotiation suggestions, and a full audit trail, all traceable per pipeline stage.",
    "Compliance checking against five real frameworks — GDPR, HIPAA, SOX, CCPA, and a general framework — with a score and specific recommendations per clause.",
    "Three agents (Risk Assessment, Compliance, Negotiation) run in parallel via ThreadPoolExecutor once clause extraction completes, instead of running the same work sequentially.",
    "42 of 42 backend tests passing across agent-level, API-level, and end-to-end suites, plus a dedicated pipeline smoke test.",
    "Full audit logging — every pipeline stage records start, completion, failure, and summary events, not just a final result.",
    "Async processing via Celery so large contract uploads don't block the API while multiple agents make LLM calls.",
  ],

  challenges: [
    {
      title: "Deferring a trained ML risk-scoring model rather than blocking the pipeline on it",
      problem:
        "The original design for Risk Assessment paired a trained ML model (XGBoost) with SHAP explainability, to produce both a quantifiable risk score and a feature-level explanation for why a clause was flagged.",
      investigation:
        "Training a reliable risk-scoring model needs a labeled dataset of real contract risk outcomes, which doesn't exist for a solo portfolio project — training on synthetic or self-labeled data would raise the same reliability questions as any heuristic-labeled model, without necessarily producing a genuinely better signal than a well-designed heuristic.",
      decision:
        "Shipped Risk Assessment on deterministic heuristics plus LLM-based qualitative analysis first — a system that's explainable by construction, since every score traces back to explicit rules and stated reasoning — and documented XGBoost and SHAP as a planned upgrade rather than blocking the whole pipeline on building a labeled dataset that doesn't exist yet.",
      result:
        "A working, explainable risk-assessment agent that ships now, with an honestly-scoped upgrade path noted for when real labeled data becomes available, instead of an ML model making unverifiable accuracy claims.",
    },
  ],

  learnings: [
    "Shipping an explainable, heuristic-based system now can be a better call than blocking on a trained ML model that needs data you don't actually have yet.",
    "A demonstrable automation pattern — like the n8n Salesforce workflow — is still worth building and showing even without a live production integration, as long as it's described honestly as a pattern rather than a claimed live connection.",
    "Independent agents that don't need to share intermediate state with each other don't need a framework's native parallel-branching feature — a plain ThreadPoolExecutor was a simpler, equally valid choice here.",
  ],

  limitations: [
    "Risk scoring currently relies on deterministic heuristics plus LLM qualitative analysis; XGBoost and SHAP-based scoring is planned but not yet implemented, so risk scores aren't backed by a trained model or a measured accuracy/precision metric.",
    "The n8n Salesforce workflow demonstrates the automation pattern but isn't connected to a live Salesforce instance — this project has no real CRM to sync into.",
    "No accuracy or precision numbers exist for clause extraction or compliance checking specifically; the only verified, measured result is the backend's 42-of-42 passing test suite, not a domain-accuracy benchmark.",
  ],

  repoUrl:
    "https://github.com/Muhammad-Aashir-web/-Intelligent-Contract-Analysis-Compliance-Engine",
};
