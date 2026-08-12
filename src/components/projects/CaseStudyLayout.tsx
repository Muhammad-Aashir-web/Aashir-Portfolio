import { ExternalLink } from "lucide-react";
import { CaseStudy } from "@/data/case-studies/types";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function CaseStudyLayout({ study }: { study: CaseStudy }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32">
      {/* Header */}
      <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
        Case Study
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
        {study.name}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-fg-muted">
        {study.tagline}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={study.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-fg transition-colors hover:bg-surface-hover"
        >
          <GithubIcon size={16} />
          Repository
        </a>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-dim"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>

      {/* Problem */}
      <Section title="The Problem">
        <p>{study.problem}</p>
      </Section>

      {/* Solution */}
      <Section title="The Solution">
        <p>{study.solution}</p>
      </Section>

      {/* Architecture */}
      <Section title="Architecture">
        <p>{study.architecture}</p>
      </Section>

      {/* Tech Stack */}
      <Section title="Tech Stack">
        <div className="flex flex-col gap-4">
          {study.stack.map((item) => (
            <div key={item.name}>
              <span className="font-mono text-sm text-fg">{item.name}</span>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section title="Key Features">
        <ul className="flex flex-col gap-3">
          {study.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-sm leading-relaxed text-fg-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-bright" />
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      {/* Challenges */}
      <Section title="Engineering Challenges &amp; Decisions">
        <div className="flex flex-col gap-8">
          {study.challenges.map((challenge) => (
            <div
              key={challenge.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-base font-semibold text-fg">
                {challenge.title}
              </h3>
              <dl className="mt-4 flex flex-col gap-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-warning">
                    Problem
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {challenge.problem}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                    Investigation
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {challenge.investigation}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-accent-bright">
                    Decision
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {challenge.decision}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-success">
                    Result
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {challenge.result}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* Learnings */}
      <Section title="Learnings">
        <ul className="flex flex-col gap-3">
          {study.learnings.map((learning) => (
            <li
              key={learning}
              className="flex gap-3 text-sm leading-relaxed text-fg-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
              {learning}
            </li>
          ))}
        </ul>
      </Section>

      {/* Known Limitations — disclosed deliberately, not hidden */}
      {study.limitations && study.limitations.length > 0 && (
        <Section title="Known Limitations">
          <ul className="flex flex-col gap-3">
            {study.limitations.map((limitation) => (
              <li
                key={limitation}
                className="flex gap-3 text-sm leading-relaxed text-fg-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" />
                {limitation}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-mono text-xs uppercase tracking-widest text-fg-muted">
        {title}
      </h2>
      <div className="mt-4 text-base leading-relaxed text-fg">{children}</div>
    </section>
  );
}
