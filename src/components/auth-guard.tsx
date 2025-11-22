
'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const protectedRoutes = ['/home', '/dashboard'];
const publicOnlyRoutes = ['/login', '/signup', '/'];
const verificationRoute = '/verify-email';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));
    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);
    const isVerificationRoute = pathname.startsWith(verificationRoute);

    if (user) {
      if (!user.emailVerified && user.providerData.some(p => p.providerId === 'password')) {
        // User is signed in with email/password but not verified
        if (!isVerificationRoute) {
          router.replace(`/verify-email?email=${user.email}`);
        }
      } else {
        // Verified user (or social login)
        if (isPublicOnlyRoute || isVerificationRoute) {
          router.replace('/home');
        }
      }
    } else {
      // No user
      if (isProtectedRoute) {
        router.replace('/login');
      }
    }

  }, [user, isUserLoading, router, pathname]);

  // While loading, show a full-screen loader to prevent content flashing
  if (isUserLoading || (user && !user.emailVerified && user.providerData.some(p => p.providerId === 'password') && !pathname.startsWith(verificationRoute)) ) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // If auth state is determined, render the children
  return <>{children}</>;
}
