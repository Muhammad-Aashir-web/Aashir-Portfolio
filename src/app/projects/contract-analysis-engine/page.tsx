import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const project = projects.find((p) => p.slug === "contract-analysis-engine");
  if (!project) return notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
        Case Study
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-fg sm:text-4xl">
        {project.name}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-fg-muted">
        {project.description}
      </p>
      <p className="mt-12 rounded-lg border border-border bg-surface p-6 font-mono text-sm text-fg-subtle">
        Full case study — problem, architecture, engineering decisions, and
        screenshots — coming in a later build step.
      </p>
    </main>
  );
}