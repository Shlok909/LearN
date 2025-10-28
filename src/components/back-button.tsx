'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button variant="outline" className={className} onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Go Back
    </Button>
  );
}
