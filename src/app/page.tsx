import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 px-6">
      <div className="max-w-lg w-full space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Nick Omori
          </h1>
          <p className="text-lg text-neutral-400">
            Your tagline here.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/portfolio"
            className="group flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 px-5 py-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Portfolio</p>
              <p className="text-sm text-neutral-400 mt-0.5">Work samples and case studies</p>
            </div>
            <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
              →
            </span>
          </Link>

          <Link
            href="/vault"
            className="group flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 px-5 py-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">Vault</p>
              <p className="text-sm text-neutral-400 mt-0.5">Private</p>
            </div>
            <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
              →
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
