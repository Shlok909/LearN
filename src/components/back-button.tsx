'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton({ href, className }: { href?: string; className?: string }) {
  const target = href || '/';
  return (
    <Button variant="outline" className={className} asChild size="default">
      <Link href={target}>
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Go Back</span>
      </Link>
    </Button>
  );
}
