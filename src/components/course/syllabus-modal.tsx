
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function SyllabusModal({ isOpen, onClose, pdfUrl }: SyllabusModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full w-full max-w-full flex-col p-0 sm:h-[90vh] sm:max-w-5xl sm:p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Course Syllabus</DialogTitle>
          <DialogDescription>
            This is the official syllabus document. You can scroll to view the content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow p-0">
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
