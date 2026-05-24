import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
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

export const config = {
  matcher: ['/vault', '/vault/:path*'],
}
