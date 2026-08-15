export type StackItem = {
  name: string;
  why: string;
};

export type Challenge = {
  title: string;
  problem: string;
  investigation: string;
  decision: string;
  result: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  contribution?: string;
  problem: string;
  solution: string;
  architecture: string;
  architectureDiagram?: string;
  architectureDiagramAlt?: string;
  stack: StackItem[];
  features: string[];
  challenges: Challenge[];
  learnings: string[];
  limitations?: string[];
  repoUrl: string;
  liveUrl?: string;
};
