import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const EMAIL = "aashirnaveed2004@gmail.com";
const GITHUB_URL = "https://github.com/Muhammad-Aashir-web";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-aashir1";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="rounded-2xl border border-border bg-surface px-8 py-16 text-center sm:px-16">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
          Get in touch
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-fg sm:text-4xl">
          Let&apos;s build something that takes action.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
          I&apos;m currently looking for AI Automation Engineer and AI
          Engineer roles. If you&apos;re hiring, or just want to talk about
          agentic systems, reach out.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={`mailto:${EMAIL}`} variant="primary" external>
            <Mail size={16} />
            {EMAIL}
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
