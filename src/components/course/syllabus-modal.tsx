
'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { BookX } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export default function SyllabusModal({ isOpen, onClose, pdfUrl }: SyllabusModalProps) {
  const embedUrl = pdfUrl?.replace('/view?usp=drive_link', '/preview');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-full w-full flex-col p-0 sm:h-[90vh] sm:max-w-3xl">
        <DialogTitle className="sr-only">Course Syllabus</DialogTitle>
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
