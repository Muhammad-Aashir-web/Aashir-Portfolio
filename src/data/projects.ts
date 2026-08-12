export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  status: "active" | "complete";
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "call-center-automation",
    name: "AI Call Center Automation Platform",
    description:
      "A seven-agent LangGraph system that transcribes and analyzes calls live — classifying intent, retrieving knowledge, and predicting escalation risk in real time — then scores and summarizes every call automatically.",
    stack: ["LangGraph", "FastAPI", "Redis", "XGBoost"],
    status: "complete",
    featured: true,
  },
  {
    slug: "contract-analysis-engine",
    name: "Intelligent Contract Analysis & Compliance Engine",
    description:
      "A six-agent contract review system combining RAG retrieval with DocuSign and Salesforce integrations for automated compliance checks.",
    stack: ["LangGraph", "FastAPI", "PostgreSQL", "Pinecone"],
    status: "complete",
    featured: true,
  },
  {
    slug: "fundchain",
    name: "FundChain — Business Investment Platform on Solana",
    description:
      "A milestone-driven crowdfunding platform on Solana with smart-contract escrow, tiered KYC, and an AI scam-detection model that screens every campaign.",
    stack: ["Solana", "Rust/Anchor", "Supabase", "Python/AI"],
    status: "complete",
    featured: true,
  },
];
