import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
          Featured Work
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-fg sm:text-4xl">
          Projects
        </h2>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Three systems, each with a real backend, a real architecture, and
          real trade-offs — not tutorial clones.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
