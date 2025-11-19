'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const protectedRoutes = ['/home', '/dashboard'];
const publicOnlyRoutes = ['/login', '/signup', '/'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      // Wait until the user's auth state is determined
      return;
    }

    const isProtectedRoute = protectedRoutes.some(path => pathname.startsWith(path));
    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);

    if (!user && isProtectedRoute) {
      // If user is not logged in and tries to access a protected route, redirect to login
      router.replace('/login');
    }

    if (user && isPublicOnlyRoute) {
      // If user is logged in and tries to access a public-only route, redirect to home
      router.replace('/home');
    }
  }, [user, isUserLoading, router, pathname]);

  // While loading, show a full-screen loader to prevent content flashing
  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // If auth state is determined, render the children
  return <>{children}</>;
}
