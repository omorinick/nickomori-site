export interface CommentRecord {
  id: string
  slideId: string
  xPct: number
  yPct: number
  authorName: string
  text: string
  createdAt: string
  updatedAt: string
  parentId: string | null
}

export interface CommentThread {
  root: CommentRecord
  replies: CommentRecord[]
}

export function commentsKey(slug: string): string {
  return `comments:${slug}`
}

// Only root comments carry a position/pin; replies nest inside their root's
// thread, so grouping is how the client turns the flat list back into pins.
export function groupIntoThreads(records: CommentRecord[]): CommentThread[] {
  const repliesByParent = new Map<string, CommentRecord[]>()
  for (const record of records) {
    if (record.parentId) {
      const list = repliesByParent.get(record.parentId) ?? []
      list.push(record)
      repliesByParent.set(record.parentId, list)
    }
  }

  return records
    .filter((record) => !record.parentId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((root) => ({
      root,
      replies: (repliesByParent.get(root.id) ?? []).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    }))
}

export function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

const MAX_NAME_LENGTH = 60
const MAX_TEXT_LENGTH = 500

export function validateCommentInput(input: {
  slideId?: unknown
  xPct?: unknown
  yPct?: unknown
  authorName?: unknown
  text?: unknown
  parentId?: unknown
}): string | null {
  if (typeof input.authorName !== 'string' || input.authorName.trim().length === 0 || input.authorName.length > MAX_NAME_LENGTH) {
    return `authorName must be 1-${MAX_NAME_LENGTH} characters`
  }
  if (typeof input.text !== 'string' || input.text.trim().length === 0 || input.text.length > MAX_TEXT_LENGTH) {
    return `text must be 1-${MAX_TEXT_LENGTH} characters`
  }

  // A reply inherits its root's position server-side, so it doesn't need to submit one.
  if (input.parentId !== undefined && input.parentId !== null) {
    if (typeof input.parentId !== 'string' || input.parentId.length === 0) {
      return 'parentId must be a non-empty string'
    }
    return null
  }

  if (typeof input.slideId !== 'string' || input.slideId.length === 0) {
    return 'slideId is required'
  }
  if (typeof input.xPct !== 'number' || input.xPct < 0 || input.xPct > 100) {
    return 'xPct must be a number between 0 and 100'
  }
  if (typeof input.yPct !== 'number' || input.yPct < 0 || input.yPct > 100) {
    return 'yPct must be a number between 0 and 100'
  }
  return null
}

export function validateCommentEdit(input: { text?: unknown }): string | null {
  if (typeof input.text !== 'string' || input.text.trim().length === 0 || input.text.length > MAX_TEXT_LENGTH) {
    return `text must be 1-${MAX_TEXT_LENGTH} characters`
  }
  return null
}
