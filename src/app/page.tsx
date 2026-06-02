import Link from "next/link"
import { MouseSpotlight } from "@/components/MouseSpotlight"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <MouseSpotlight />

      <div className="relative z-10 max-w-lg w-full space-y-10">
        <div className="space-y-2">
          <div className="text-5xl font-light text-white/30 tracking-widest select-none">
            大森
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Nick Omori
          </h1>
          <p className="text-lg text-neutral-400">
            Digital sandbox & working concepts.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/portfolio"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 px-5 py-4 hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-white">Constructive Distractions</p>
              <p className="text-sm text-neutral-400 mt-0.5">Projects and automations.</p>
            </div>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
          </Link>

          <Link
            href="/vault"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 px-5 py-4 hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-white">Vault</p>
              <p className="text-sm text-neutral-400 mt-0.5">Less than half-baked ideas.</p>
            </div>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
          </Link>
        </nav>
      </div>
      <footer className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <a
          href="https://www.linkedin.com/in/nickomori/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          LinkedIn
        </a>
      </footer>
    </main>
  )
}
