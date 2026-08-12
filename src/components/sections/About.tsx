export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
          About
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-fg sm:text-3xl">
          I&apos;d rather ship something that works than talk about something
          that might.
        </h2>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-fg-muted">
          <p>
            I&apos;m a BSIT graduate from Air University, and most of my recent
            time went into building systems that don&apos;t just answer
            questions — they take action. A six-agent pipeline that scores live
            calls in real time. Another that reviews contracts against GDPR and
            HIPAA rules and files them straight into Salesforce. A blockchain
            platform that releases investor funds only when a milestone is
            actually verified.
          </p>
          <p>
            None of these were class assignments. I built them because I
            wanted to know if I could — and then kept going past the point
            where most portfolio projects stop, into the parts that
            don&apos;t demo well: authentication edge cases, flaky test
            suites, the agent that works fine until the fifth retry.
            That&apos;s where I actually learned something.
          </p>
          <p>
            I&apos;m currently looking for AI Automation roles, ideally somewhere building agentic
            systems for real operational problems — not another chatbot
            wrapper.
          </p>
        </div>
      </div>
    </section>
  );
}