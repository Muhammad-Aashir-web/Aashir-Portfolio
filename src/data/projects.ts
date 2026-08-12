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
      "A six-agent LangGraph pipeline that extracts clauses, checks compliance against GDPR/HIPAA/SOX/CCPA, scores risk, and drafts negotiation suggestions.",
    stack: ["LangGraph", "FastAPI", "PostgreSQL", "Pinecone"],
    status: "complete",
    featured: true,
  },
  {
    slug: "fundchain",
    name: "FundChain — Business Investment Platform on Solana",
    description:
      "A team-built Solana crowdfunding platform with milestone-based escrow. My contribution: AI scam/risk scoring, personalized recommendations, and the support chatbot.",
    stack: ["Solana", "scikit-learn", "Supabase", "OpenRouter"],
    status: "complete",
    featured: true,
  },
];
