
'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function SyllabusModal({ isOpen, onClose, pdfUrl }: SyllabusModalProps) {
  // Use the /preview endpoint for a cleaner embed
  const embedUrl = pdfUrl.replace('/view?usp=drive_link', '/preview');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full w-full max-w-full flex-col p-0 sm:h-[90vh] sm:max-w-3xl">
        {/* Add a visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Course Syllabus</DialogTitle>
        <div className="flex-grow h-full">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title="Syllabus PDF"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
