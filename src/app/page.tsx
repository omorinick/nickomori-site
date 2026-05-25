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
            Toying with ideas.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/portfolio"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 px-5 py-4 hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-white">Portfolio</p>
              <p className="text-sm text-neutral-400 mt-0.5">Work samples and case studies</p>
            </div>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
          </Link>

          <Link
            href="/vault"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 px-5 py-4 hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-white">Vault</p>
              <p className="text-sm text-neutral-400 mt-0.5">Private</p>
            </div>
            <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">→</span>
          </Link>
        </nav>
      </div>
    </main>
  )
}
