import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('erp_auth')
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/woojinerp') && !authCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname === '/' && authCookie) {
    return NextResponse.redirect(new URL('/woojinerp/notices', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/woojinerp/:path*'],
}
