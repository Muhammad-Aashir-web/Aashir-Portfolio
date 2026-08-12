export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Agentic AI & Orchestration",
    skills: ["LangGraph", "LangChain", "Multi-Agent Systems", "RAG"],
  },
  {
    category: "LLM & Retrieval",
    skills: ["Pinecone", "Weaviate", "ChromaDB", "Hybrid Retrieval (BM25 + Vector)"],
  },
  {
    category: "Backend & APIs",
    skills: ["Python", "FastAPI", "Celery", "PostgreSQL", "Redis", "SQL"],
  },
  {
    category: "ML & Data",
    skills: ["XGBoost", "scikit-learn", "DistilBERT Fine-Tuning"],
  },
  {
    category: "Automation & Integrations",
    skills: ["n8n", "DocuSign", "Salesforce", "OpenRouter"],
  },
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    category: "Tools & Infra",
    skills: ["Docker", "Git", "pytest", "CI/CD", "Vercel"],
  },
];