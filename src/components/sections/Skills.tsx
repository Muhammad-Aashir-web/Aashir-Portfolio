import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
          Capabilities
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-fg sm:text-4xl">
          Skills &amp; Stack
        </h2>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Grouped by how these pieces actually fit together in the systems I
          build, not just a list of tools I&apos;ve heard of.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border px-2.5 py-1 text-xs text-fg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}