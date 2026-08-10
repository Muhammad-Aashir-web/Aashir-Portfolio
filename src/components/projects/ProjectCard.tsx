import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-fg">
            {project.name}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-fg-subtle transition-colors group-hover:text-accent-bright"
          />
        </div>

        {project.status === "active" && (
          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-warning">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            In progress
          </span>
        )}

        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-fg-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
