import Link from 'next/link'
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
          <Link
            href="/vault/japan"
            className="group rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Japan 2026</p>
                <p className="text-sm text-neutral-400 mt-1">Living trip itinerary · Apr 19–30</p>
              </div>
              <span className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors text-lg leading-none mt-0.5">→</span>
            </div>
            <div className="mt-4 flex gap-1.5 flex-wrap">
              {['Tokyo', 'Hakone', 'Kyoto', 'Hiroshima'].map(city => (
                <span key={city} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{city}</span>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
