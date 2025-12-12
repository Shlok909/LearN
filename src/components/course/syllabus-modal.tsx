
'use client';

import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { BookX, X } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export default function SyllabusModal({ isOpen, onClose, pdfUrl }: SyllabusModalProps) {
  const embedUrl = pdfUrl?.replace('/view?usp=drive_link', '/preview');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-full w-full flex-col p-0 sm:h-[90vh] sm:max-w-3xl" showCloseButton={false}>
        <DialogTitle className="sr-only">Course Syllabus</DialogTitle>
        
        <DialogClose className="absolute left-4 top-4 z-20 rounded-full p-1 bg-accent text-accent-foreground transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {embedUrl ? (
          <div className="h-full flex-grow">
            <iframe
              src={embedUrl}
              className="h-full w-full border-0"
              title="Syllabus PDF"
            ></iframe>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <BookX className="h-20 w-20 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Syllabus Not Available</h2>
            <p className="text-lg text-muted-foreground">Will be uploaded soon!!!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
