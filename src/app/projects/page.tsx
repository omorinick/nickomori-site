export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Projects
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Side projects and tinkering
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              Nothing here yet
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              Projects will appear here as they're added.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
