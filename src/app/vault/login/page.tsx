import { login } from '../actions'

export default async function VaultLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === '1'

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Vault
          </h1>
          <p className="text-sm text-neutral-400 mt-1">Private access only</p>
        </div>
        <form action={login} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Passphrase"
            autoFocus
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
          />
          {hasError && (
            <p className="text-sm text-red-500">Incorrect passphrase.</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
