
'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const protectedRoutes = ['/home', '/dashboard', '/courses'];
const publicRoutes = ['/login', '/signup', '/verify-email', '/about'];
const landingPage = '/';


export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));
    const isPublicRoute = publicRoutes.some(path => pathname.startsWith(path)) || pathname === landingPage;

    if (user) {
      // User is logged in
      if (!user.emailVerified && user.providerData.some(p => p.providerId === 'password')) {
        // Logged in with email, but not verified
        if (pathname !== '/verify-email') {
          router.replace(`/verify-email?email=${user.email}`);
        }
      } else {
        // Verified user or social login
        if (pathname === '/login' || pathname === '/signup' || pathname === '/verify-email' || pathname === landingPage) {
          router.replace('/home');
        }
      }
    } else {
      // No user is logged in
      if (isProtectedRoute) {
        router.replace('/login');
      }
    }

  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flash of content for unverified users on protected pages
  if (user && !user.emailVerified && user.providerData.some(p => p.providerId === 'password') && pathname !== '/verify-email') {
     return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
