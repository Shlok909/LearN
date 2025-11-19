
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/about', '/login', '/signup'];

function isPublic(pathname: string, paths: string[]) {
    return paths.some(path => {
        if (path.endsWith('/')) {
            return pathname === path || pathname.startsWith(`${path}`);
        }
        return pathname === path;
    });
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('firebase-auth-edge-token')?.value
  const { pathname } = request.nextUrl

  const isPublicRoute = isPublic(pathname, publicPaths) || pathname.startsWith('/courses');

  if (!currentUser && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (currentUser && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
