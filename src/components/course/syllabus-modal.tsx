
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function SyllabusModal({ isOpen, onClose, pdfUrl }: SyllabusModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full w-full max-w-full flex-col p-0 sm:h-[90vh] sm:max-w-3xl">
        <div className="flex-grow h-full">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="Syllabus PDF"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
