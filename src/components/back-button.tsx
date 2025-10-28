'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton({ href, className }: { href?: string; className?: string }) {
  const target = href || '/';
  return (
    <Button variant="outline" className={className} asChild>
      <Link href={target}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Link>
    </Button>
  );
}
