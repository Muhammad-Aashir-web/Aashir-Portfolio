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
      "A six-agent LangGraph pipeline that classifies intent, retrieves knowledge, predicts escalation risk, and scores calls in real time.",
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
