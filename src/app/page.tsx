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

          {/* Coming soon placeholder */}
          <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-10 flex flex-col items-center justify-center text-center select-none">
            <p className="text-xs font-medium text-foreground-subtle uppercase tracking-widest mb-3">Coming soon</p>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-4 italic">
              &ldquo;I don&apos;t know what I think until I write it down.&rdquo;
            </p>
            <p className="text-xs text-foreground-subtle">— Joan Didion</p>
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
