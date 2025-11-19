
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/home', '/dashboard'];
const publicOnlyRoutes = ['/login', '/signup', '/'];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('firebase-auth-edge-token')?.value
  const { pathname } = request.nextUrl

  if (protectedRoutes.some(path => pathname.startsWith(path)) && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (publicOnlyRoutes.includes(pathname) && currentUser) {
     if (pathname.startsWith('/')) {
        const url = request.nextUrl.clone()
        url.pathname = '/home'
        return NextResponse.redirect(url)
     }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
