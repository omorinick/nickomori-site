export interface CommentRecord {
  id: string
  slideId: string
  xPct: number
  yPct: number
  authorName: string
  ownerToken: string
  text: string
  createdAt: string
  updatedAt: string
}

export type PublicComment = Omit<CommentRecord, 'ownerToken'> & { isOwner: boolean }

export function commentsKey(slug: string): string {
  return `comments:${slug}`
}

export function toPublicComment(record: CommentRecord, viewerToken: string): PublicComment {
  const { ownerToken, ...rest } = record
  return { ...rest, isOwner: ownerToken === viewerToken }
}

const MAX_NAME_LENGTH = 60
const MAX_TEXT_LENGTH = 500

export function validateCommentInput(input: {
  slideId?: unknown
  xPct?: unknown
  yPct?: unknown
  authorName?: unknown
  ownerToken?: unknown
  text?: unknown
}): string | null {
  if (typeof input.slideId !== 'string' || input.slideId.length === 0) {
    return 'slideId is required'
  }
  if (typeof input.xPct !== 'number' || input.xPct < 0 || input.xPct > 100) {
    return 'xPct must be a number between 0 and 100'
  }
  if (typeof input.yPct !== 'number' || input.yPct < 0 || input.yPct > 100) {
    return 'yPct must be a number between 0 and 100'
  }
  if (typeof input.authorName !== 'string' || input.authorName.trim().length === 0 || input.authorName.length > MAX_NAME_LENGTH) {
    return `authorName must be 1-${MAX_NAME_LENGTH} characters`
  }
  if (typeof input.ownerToken !== 'string' || input.ownerToken.length === 0) {
    return 'ownerToken is required'
  }
  if (typeof input.text !== 'string' || input.text.trim().length === 0 || input.text.length > MAX_TEXT_LENGTH) {
    return `text must be 1-${MAX_TEXT_LENGTH} characters`
  }
  return null
}

export function validateCommentEdit(input: { text?: unknown; ownerToken?: unknown }): string | null {
  if (typeof input.ownerToken !== 'string' || input.ownerToken.length === 0) {
    return 'ownerToken is required'
  }
  if (typeof input.text !== 'string' || input.text.trim().length === 0 || input.text.length > MAX_TEXT_LENGTH) {
    return `text must be 1-${MAX_TEXT_LENGTH} characters`
  }
  return null
}
