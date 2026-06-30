import Link from "next/link"
import { ProjectsSection } from "@/components/ProjectsSection"

const stats = [
  { value: "8+", label: "Years in product" },
  { value: "Countless", label: "Distractions" },
  { value: "0", label: "Slide decks" },
]


export default function Home() {
  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
          Product Manager · San Francisco
        </p>
        <h1 data-parallax className="font-heading text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-6 max-w-xl">
          Building to learn.
        </h1>
        <p data-parallax data-parallax-strength="5" className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
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
      <ProjectsSection />

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
