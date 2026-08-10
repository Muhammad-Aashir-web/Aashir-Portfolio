import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const GITHUB_URL = "https://github.com/Muhammad-Aashir-web";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-aashir1";
const EMAIL = "aashirnaveed2004@gmail.com";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-xs text-fg-subtle">
          &copy; {year} Muhammad Aashir. Built with Next.js.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="#projects"
            className="text-xs text-fg-muted transition-colors hover:text-fg"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="text-xs text-fg-muted transition-colors hover:text-fg"
          >
            Contact
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="text-fg-muted transition-colors hover:text-fg"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
