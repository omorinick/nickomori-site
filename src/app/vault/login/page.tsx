import { login } from '../actions'

export default async function VaultLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === '1'

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Vault
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Private access only</p>
        </div>
        <form action={login} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Passphrase"
            autoFocus
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {hasError && (
            <p className="text-sm text-destructive">Incorrect passphrase.</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
