import Link from "next/link"

const stats = [
  { value: "8+", label: "Years in product" },
  { value: "Countless", label: "Constructive distractions" },
  { value: "0", label: "Slide decks" },
]

const projects = [
  {
    title: "Theme Playground",
    type: "Tool",
    href: "/theme-playground.html",
    external: true,
    description: "Live color and typography explorer. Pick a palette, preview the full design system, export CSS tokens.",
  },
  {
    title: "Assumption Mapper",
    type: "AI Tool",
    href: "/projects/pm-toolkit",
    external: false,
    description: "Describe a product idea. Get a full assumption map across the five Torres discovery dimensions — instantly.",
  },
  {
    title: "AI Skills & Automations",
    type: "PM Workflow",
    href: "/projects/ai-skills-automations",
    external: false,
    description: "Five automations and seven domain-encoded skills that run my PM workflow at work.",
  },
  {
    title: "Living Prototype",
    type: "Skill",
    href: "/projects/living-prototype",
    external: false,
    description: "Raw narrative → interactive web presentation. No slides, no constraints.",
  },
  {
    title: "Backseat Driver",
    type: "In progress",
    href: "/projects/backseat-driver",
    external: false,
    description: "Car-maintenance advisor that works for the owner, not the shop.",
  },
]

export default function Home() {
  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
          Product Manager · San Francisco
        </p>
        <h1 className="font-heading text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-6 max-w-xl">
          Building to learn.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Ideas, experiments, and constructive distractions.
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Explore Projects →
          </Link>
          <a
            href="https://www.linkedin.com/in/nickomori/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-border-hover transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div key={value} className="bg-card border border-border rounded-xl p-6">
              <p className="font-heading text-3xl font-bold text-primary mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Constructive Distractions ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight mb-2">
          Constructive Distractions
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Projects built to think, not just to ship.
        </p>
        <div className="border-t border-border">
          {projects.map(({ title, type, href, external, description }) =>
            external ? (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-border py-5 hover:opacity-70 transition-opacity"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-0.5">
                    <span className="font-heading text-lg font-bold text-foreground">{title}</span>
                    <span className="text-xs font-medium text-primary flex-shrink-0">{type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">↗</span>
              </a>
            ) : (
              <Link
                key={title}
                href={href}
                className="group flex items-center gap-4 border-b border-border py-5 hover:opacity-70 transition-opacity"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-0.5">
                    <span className="font-heading text-lg font-bold text-foreground">{title}</span>
                    <span className="text-xs font-medium text-primary flex-shrink-0">{type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">→</span>
              </Link>
            )
          )}
        </div>
        <div className="mt-5">
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* ── Writing ── */}
      <section id="writing" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-border pt-16">
          <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight mb-2">
            Writing
          </h2>
          <p className="text-sm text-muted-foreground mb-10">
            Ideas worth thinking through.
          </p>
          <blockquote className="border-l-2 border-primary pl-6 py-1 max-w-2xl">
            <p className="text-base text-foreground leading-relaxed mb-3">
              &ldquo;The faster we make our ideas tangible, the sooner we can evaluate them, refine them, and zero in on the best solution.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground">
              — Tim Brown, <span className="italic">Change by Design</span>
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© 2026 nickomori.com</p>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/nickomori/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/vault" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Vault
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
