
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  if (!email) {
    // Redirect to signup if email is not in the query params
    if (typeof window !== 'undefined') {
      router.replace('/signup');
    }
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="mb-8 text-5xl font-bold text-white">LearNova</h1>
      <Card className="w-full max-w-md border-white">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-foreground">
            A verification email has been sent to <span className="font-bold">{email}</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox (and spam folder) and click the link to verify your account. Once verified, you can log in.
          </p>
          <Button asChild className="w-full" variant="secondary">
            <Link href="/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
