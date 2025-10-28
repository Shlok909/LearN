'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton({ className }: { className?: string }) {
  return (
    <Button variant="outline" className={className} asChild>
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Link>
    </Button>
  );
}
