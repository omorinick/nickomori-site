export interface CommentIdentity {
  name: string
}

const STORAGE_KEY = 'nickomori-comment-identity'

export function getStoredIdentity(): CommentIdentity | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CommentIdentity
  } catch {
    return null
  }
}

export function storeIdentity(name: string): CommentIdentity {
  const identity: CommentIdentity = { name }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
  return identity
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
