
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

interface YoutubeThumbnailModalProps {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function YoutubeThumbnailModal({ videoId, isOpen, onClose }: YoutubeThumbnailModalProps) {
  if (!isOpen || !videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Video Preview</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Link href={videoUrl} target="_blank" rel="noopener noreferrer" className="block w-full cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <Image
              src={thumbnailUrl}
              alt="YouTube video thumbnail"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
              data-ai-hint="youtube thumbnail"
            />
          </Link>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Click the thumbnail to watch the video on YouTube.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

