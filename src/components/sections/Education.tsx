const education = [
  {
    degree: "Bachelor of Science, Information Technology",
    school: "Air University, Islamabad",
    period: "2022 — 2026",
  },
  {
    degree: "Intermediate (I.C.S)",
    school: "Punjab College, Rawalpindi",
    period: "2020 — 2022",
  },
];

export default function Education() {
  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-bright">
          Education
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {education.map((item) => (
            <div
              key={item.degree}
              className="flex flex-col justify-between gap-1 border-b border-border pb-6 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-fg">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">{item.school}</p>
              </div>
              <p className="font-mono text-xs text-fg-subtle">
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}