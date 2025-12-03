
'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const protectedRoutes = ['/home', '/dashboard', '/courses'];
const publicRoutes = ['/login', '/signup', '/verify-email', '/about', '/forgot-password'];
const landingPage = '/';


export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    // Only set initial load to false after the first check is complete
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
    
    const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));

    if (user) {
      // User is logged in
      if (user.emailVerified) {
        // Verified user (or social login), should not be on auth pages or landing page
        if (pathname === '/login' || pathname === '/signup' || pathname === '/verify-email' || pathname === landingPage) {
          router.replace('/home');
        }
      } else if (user.providerData.some(p => p.providerId === 'password')) {
        // Logged in with email, but not verified. Must be on verify-email page.
        // Allow navigation to /login from /verify-email.
        if (pathname !== '/verify-email' && pathname !== '/login') {
          router.replace(`/verify-email?email=${user.email}`);
        }
      }
    } else {
      // No user is logged in, they can only access public routes
      if (isProtectedRoute) {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router, pathname, isInitialLoad]);

  // Show a full-screen loader ONLY during the initial authentication check.
  if (isInitialLoad && isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flash of unverified content on protected routes while redirecting.
  if (user && !user.emailVerified && user.providerData.some(p => p.providerId === 'password') && pathname !== '/verify-email' && pathname !== '/login') {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Once initial load is complete, render children immediately.
  return <>{children}</>;
}
