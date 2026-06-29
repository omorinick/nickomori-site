import Link from "next/link"

const stats = [
  { value: "8+", label: "Years in product" },
  { value: "12", label: "Projects shipped" },
  { value: "3", label: "AI tools in prod" },
]

const projects = [
  {
    title: "Assumption Mapper",
    type: "AI Tool",
    href: "/projects/pm-toolkit",
    description:
      "Describe a product idea or feature. Get a structured assumption map across the five Teresa Torres discovery dimensions — in seconds.",
  },
  {
    title: "AI Skills & Automations",
    type: "PM Workflow",
    href: "/projects/ai-skills-automations",
    description:
      "A working library of automated workflows and domain-encoded AI skills built at work to solve real operational problems.",
  },
  {
    title: "Living Prototype",
    type: "Skill",
    href: "/projects/living-prototype",
    description:
      "A skill for turning raw content into an interactive web presentation — animated data, live demos, without the constraints of slides.",
  },
  {
    title: "Backseat Driver",
    type: "In progress",
    href: "/projects/backseat-driver",
    description:
      "A car-maintenance advisor that works for the owner, not the shop. Real-time second opinion at the moment of decision.",
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
          Building things<br />worth building.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Experiments at the intersection of AI and product work. A digital sandbox for ideas that deserve to exist.
        </p>
        <div className="flex gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            View work →
          </Link>
          <a
            href="https://www.linkedin.com/in/nickomori/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-border-hover transition-colors"
          >
            About me ↗
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
        <div className="flex flex-col gap-3">
          {projects.map(({ title, type, href, description }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-start justify-between rounded-xl border border-border bg-card px-5 py-5 hover:border-border-hover transition-colors"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <p className="font-medium text-foreground">{title}</p>
                  <span className="text-xs font-medium text-primary">{type}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-6 mt-0.5 flex-shrink-0">
                →
              </span>
            </Link>
          ))}
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
            Ideas worth thinking through. On product, AI, and building things.
          </p>
          <div className="rounded-xl border border-border bg-card px-6 py-8 max-w-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nothing published yet — I build before I write. When there&apos;s something worth saying, it&apos;ll be here.
            </p>
          </div>
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
