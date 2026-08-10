import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/vault')) {
    const authCookie = request.cookies.get('vault-auth')
    const isAuthed = authCookie?.value === process.env.VAULT_PASSWORD

    if (pathname === '/vault/login') {
      if (isAuthed) {
        return NextResponse.redirect(new URL('/vault', request.url))
      }
      return NextResponse.next()
    }

    if (!isAuthed) {
      return NextResponse.redirect(new URL('/vault/login', request.url))
    }

    return NextResponse.next()
  }

  const isApi = pathname.startsWith('/api/case-studies/')
  const segments = pathname.split('/').filter(Boolean)
  // '/case-studies/[slug]/...' -> slug at index 1; '/api/case-studies/[slug]/...' -> slug at index 2
  const slug = isApi ? segments[2] : segments[1]
  if (!slug) return NextResponse.next()

  const cookieName = `case-study-auth-${slug}`
  const envVar = `CASE_STUDY_PASSWORD_${slug.toUpperCase().replace(/-/g, '_')}`
  const authCookie = request.cookies.get(cookieName)
  const isAuthed = Boolean(authCookie?.value) && authCookie?.value === process.env[envVar]

  if (pathname === `/case-studies/${slug}/login`) {
    if (isAuthed) {
      return NextResponse.redirect(new URL(`/case-studies/${slug}`, request.url))
    }
    return NextResponse.next()
  }

  if (!isAuthed) {
    if (isApi) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL(`/case-studies/${slug}/login`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/vault', '/vault/:path*', '/case-studies/:path*', '/api/case-studies/:path*'],
}
