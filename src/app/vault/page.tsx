import { logout } from './actions'

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Vault
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Personal artifacts & tools
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              Nothing here yet
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              Artifacts will appear here as you add them.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
