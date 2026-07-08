import Link from "next/link"
import { ProjectsSection } from "@/components/ProjectsSection"

export default function Home() {
  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
          Product Manager · San Francisco
        </p>
        <h1 data-parallax className="font-heading text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-6 max-w-xl">
          Home.
        </h1>
        <p data-parallax data-parallax-strength="5" className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Digital sandbox &amp; working concepts.
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

      {/* ── Constructive Distractions ── */}
      <ProjectsSection />

      {/* ── Writing ── */}
      <section id="writing" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-border pt-16">
          <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight mb-8">
            Writing
          </h2>

          {/* Epigraph */}
          <blockquote className="mb-8 max-w-lg">
            <p className="text-sm text-muted-foreground leading-relaxed mb-2 italic">
              &ldquo;I don&apos;t know what I think until I write it down.&rdquo;
            </p>
            <p className="text-xs text-foreground-subtle">— Joan Didion</p>
          </blockquote>

          {/* Skeleton placeholder */}
          <div className="space-y-3">
            {[
              { title: "w-2/3", lines: ["w-full", "w-4/5"] },
              { title: "w-1/2", lines: ["w-full", "w-3/4", "w-5/6"] },
              { title: "w-3/5", lines: ["w-full", "w-4/5"] },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card px-5 py-4 animate-pulse"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className={`h-3.5 bg-muted rounded ${card.title}`} />
                  <div className="h-3 bg-muted rounded w-14 flex-shrink-0 mt-0.5" />
                </div>
                <div className="space-y-2">
                  {card.lines.map((w, j) => (
                    <div key={j} className={`h-3 bg-muted rounded ${w}`} />
                  ))}
                </div>
              </div>
            ))}
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
