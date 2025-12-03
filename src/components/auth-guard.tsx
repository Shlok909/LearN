
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
    // Don't do anything until Firebase auth state is determined
    if (isUserLoading) {
      return;
    }

    // Mark initial load as complete after the first auth check.
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
    
    const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));

    if (user) {
      // --- User is logged in ---
      if (user.emailVerified) {
        // If a verified user is on an auth page or the landing page, redirect them to home.
        if (pathname === '/login' || pathname === '/signup' || pathname === '/verify-email' || pathname === landingPage) {
          router.replace('/home');
        }
      } else if (user.providerData.some(p => p.providerId === 'password')) {
        // If an unverified email user is NOT on the verify-email or login page, redirect them.
        if (pathname !== '/verify-email' && pathname !== '/login') {
          router.replace(`/verify-email?email=${user.email}`);
        }
      }
    } else {
      // --- No user is logged in ---
      // If an unauthenticated user tries to access a protected route, redirect to login.
      if (isProtectedRoute) {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router, pathname, isInitialLoad]);

  // --- Render Logic ---

  // 1. Show a full-screen loader ONLY during the very initial authentication check.
  if (isUserLoading && isInitialLoad) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // 2. If a logged-in user with an unverified email is being redirected,
  // show a loader to prevent a flash of protected content.
  const isUnverifiedAndNeedsRedirect =
    user &&
    !user.emailVerified &&
    user.providerData.some(p => p.providerId === 'password') &&
    pathname !== '/verify-email' &&
    pathname !== '/login';

  if (isUnverifiedAndNeedsRedirect) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // 3. For all other cases (including navigating between authenticated pages), render the children immediately.
  return <>{children}</>;
}
