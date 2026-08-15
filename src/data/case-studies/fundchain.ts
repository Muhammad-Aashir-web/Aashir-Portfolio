import { CaseStudy } from "./types";

export const fundchain: CaseStudy = {
  slug: "fundchain",
  name: "FundChain — Business Investment Platform on Solana",
  tagline:
    "A milestone-driven crowdfunding platform on Solana, built with a three-person team as our Final Year Project — on-chain escrow, investor governance voting, AI-driven scam and risk scoring, personalized recommendations, and a support chatbot.",

  contribution:
    "FundChain was a three-person Final Year Project built with my two classmates. The platform itself — Solana escrow, milestone voting, KYC, wallet authentication, and deployment — was a team effort. My individual contribution was four modules: the AI-powered risk analysis and scam detection pipeline, the personalized investment recommendation engine, the platform support chatbot, and the tutorial/onboarding feedback system. The sections below focus on that work specifically.",

  problem:
    "Existing crowdfunding platforms release funds to creators up front with little investor protection, offer backers no meaningful role in how their money is used once pledged, and have no systematic way to flag likely scam campaigns before investors put money into them.",

  solution:
    "FundChain ties fund release to verified milestones instead of releasing capital up front: investors vote on whether a creator's submitted proof of progress justifies releasing the next tranche, on-chain escrow enforces that outcome, and every campaign is scored for risk before it's even visible to investors. My four modules sit on top of that foundation: an AI pipeline that screens every submitted campaign for scam risk, a recommendation engine that matches investors to campaigns based on their stated risk tolerance and preferences, a support chatbot answering platform questions on every page, and a tutorial/feedback system that walks first-time users through the platform.",

  architecture:
    "The frontend is a React 18 app (Vite, React Router v6, Tailwind, Framer Motion) with role-based routing across three dashboards — Investor, Creator, Administrator. The backend runs entirely on Supabase: PostgreSQL 15 with row-level security policies enforced at the database level, 15 serverless Edge Functions on Deno handling investment processing, wallet management, escrow operations, and recommendation generation, plus Supabase Auth for JWT-based sessions. On-chain operations go through the Solana wallet adapter and Solana Web3.js, with Phantom Wallet handling SOL-to-FC token conversion and transaction signing. My AI work runs as a standalone Python FastAPI service on Render: a TF-IDF + Logistic Regression model scores scam likelihood from campaign text, difflib's SequenceMatcher checks plagiarism against existing campaign descriptions, and a wallet-age heuristic adds a third risk signal — all three combine into one weighted final_risk_score shown to investors as a color-coded badge. The OpenRouter GPT API powers the chatbot, integrated on every page. The recommendation engine runs as a TypeScript Edge Function (`recommend_projects`) inside Supabase rather than the AI service, scoring active campaigns against each investor's stated preferences.",

  stack: [
    {
      name: "scikit-learn (TF-IDF + Logistic Regression)",
      why: "Scam-detection model for the risk analysis pipeline — chosen over a heavier model since only a small labeled training set of crowdfunding-style descriptions was available, and the model needed to score every submission within a 5-second response requirement.",
    },
    {
      name: "difflib SequenceMatcher",
      why: "Plagiarism detection, comparing each new campaign description against existing ones by text similarity — simple, fast, and interpretable rather than requiring a separate embedding-based similarity model.",
    },
    {
      name: "FastAPI (on Render)",
      why: "Hosts the standalone AI service serving the risk analysis pipeline as its own deployable unit, separate from the main Supabase backend.",
    },
    {
      name: "OpenRouter GPT API",
      why: "Powers the platform chatbot's natural language responses, and is also used elsewhere in the platform for KYC description analysis.",
    },
    {
      name: "Supabase Edge Functions (TypeScript, Deno)",
      why: "The recommendation engine runs as its own Edge Function, scoring campaigns against investor preferences with a weighted formula rather than depending on the separate AI service.",
    },
  ],

  features: [
    "Every submitted campaign is automatically scored for risk before investors ever see it — combining an ML scam-likelihood score, a plagiarism check against existing campaigns, and a wallet-age-based risk signal into one weighted score, shown as a color-coded badge (green/amber/red).",
    "Admins can see the individual component scores behind any risk flag, not just the final number, and override the AI's assessment with a documented justification.",
    "Personalized campaign recommendations weighted across risk alignment (32%), category match (22%), collaborative signals (20%), popularity (14%), and region match (12%) — with campaigns exceeding an investor's stated maximum risk tolerance excluded entirely, not just down-ranked.",
    "A platform-wide support chatbot, available on every page, answering questions about FundChain's features, the investment process, and the token system.",
    "A tutorial overlay guiding first-time users through core features across their first two visits, plus real-time inline validation feedback across all platform forms.",
  ],

  challenges: [
    {
      title: "The scam-detection model alone wasn't accurate enough on the data available",
      problem:
        "The AI scam detection service, built around a TF-IDF and Logistic Regression model, needed multiple iterations to reach adequate accuracy — the available training dataset of labeled crowdfunding-style descriptions was small, and the model's probability score alone wasn't reliable enough to trust as the sole risk signal.",
      investigation:
        "Rather than trying to improve the ML model in isolation with no more training data available, the real opportunity was recognizing that scam risk has signal outside the description text — plagiarism against existing campaigns, and a creator's wallet age and activity history, both correlate with risk independent of what the text model alone can learn.",
      decision:
        "Combined the ML model's probability with a text-similarity plagiarism score and a wallet-age-based risk score into one weighted final score (60% ML score, 25% plagiarism, 15% wallet risk), rather than relying on the ML model by itself.",
      result:
        "A more reliable, explainable composite risk score than the ML model alone produced — though performance on genuinely novel scam patterns not resembling anything in the small training set remains a real, acknowledged limitation, not something fully solved by combining signals.",
    },
    {
      title: "Making risk tolerance a hard filter, not just a weighted input",
      problem:
        "A naive recommendation approach — ranking by popularity or funding progress — would ignore what an individual investor actually said they wanted, and could easily surface high-risk campaigns to a risk-averse investor just because they were popular.",
      investigation:
        "The recommendation engine needed to balance several real signals (category fit, collaborative filtering, popularity, region) without letting any of them override an investor's explicitly stated risk tolerance, which had to matter more than a weighted average would naturally give it.",
      decision:
        "Built a weighted scoring formula across five signals, but excluded campaigns exceeding an investor's maximum stated risk tolerance from the recommendation list entirely — a hard filter applied before scoring, not a lower-weighted factor within it.",
      result:
        "Recommendations that respect an investor's stated risk preference as a real boundary, not a soft suggestion the algorithm can weigh against popularity.",
    },
    {
      title: "Finding an LLM model that OpenRouter actually still served",
      problem:
        "Wiring the chatbot to OpenRouter's GPT API sounded straightforward, but several of the specific model names initially tried were already deprecated or no longer served — requests failed or returned no usable response.",
      investigation:
        "The integration code itself wasn't the problem; model availability on OpenRouter changes over time, and some model names referenced in documentation or examples had already been retired by the time of building.",
      decision:
        "Worked through OpenRouter's actually-current model list methodically instead of assuming a commonly-referenced model name would still be live, until finding one that responded reliably.",
      result:
        "A working chatbot integration, and a concrete lesson that third-party model availability needs to be verified directly against the provider's live model list, not assumed from documentation that may already be stale.",
    },
  ],

  learnings: [
    "Combining multiple independent risk signals into one score is as much a judgment call about how much to trust each signal as it is a modeling problem — the weighting itself is a real design decision, not just arithmetic.",
    "Respecting a stated user preference sometimes means applying it as a hard filter rather than one weighted signal among several — a risk-averse investor shouldn't see a high-risk campaign at all, no matter how well it scores on other criteria.",
    "Fast-moving third-party APIs need their current state checked directly, not assumed from tutorials or documentation that can go stale within months.",
  ],

  repoUrl: "https://github.com/JawadAsif77/fundchain",
};
