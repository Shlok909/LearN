
'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { FileText, Youtube, BookOpen, FlaskConical, PencilRuler, ExternalLink } from 'lucide-react';

// Mock types for demonstration
interface Resource {
  id: number;
  label: string;
  url: string;
  type: string;
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  resources: {
    notes: Resource[];
    pyqs: Resource[];
    lectures: Resource[];
    practicals: Resource[];
  };
}

interface ResourceModalProps {
  subject: Subject;
  onClose: () => void;
  onOpenVideo: (videoId: string) => void;
}

const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2] && match[2].length === 11) ? match[2] : null;
};

const isYouTubePlaylist = (url: string): boolean => {
  return url.includes('playlist?list=');
};

const ResourceLink = ({ resource, isPlaylist = false }: { resource: Resource, isPlaylist?: boolean }) => {
  const Icon = resource.type === 'youtube' ? Youtube : FileText;
  const label = isPlaylist ? `${resource.label} [Playlist]` : resource.label;
  return (
    <li>
      <Link
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
        <span className="flex-grow">{label}</span>
        <ExternalLink className="ml-2 h-3 w-3 flex-shrink-0" />
      </Link>
    </li>
  );
};

const YoutubeLink = ({ resource, onClick }: { resource: Resource; onClick: (videoId: string) => void }) => {
  const videoId = getYouTubeVideoId(resource.url);
  if (!videoId) {
    // This can happen if the URL is a playlist or an invalid video link
    // We'll render it as a direct link.
    return <ResourceLink resource={resource} isPlaylist={isYouTubePlaylist(resource.url)} />;
  }

  return (
    <li>
      <button
        onClick={() => onClick(videoId)}
        className="flex w-full items-center rounded-md p-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Youtube className="mr-3 h-4 w-4 flex-shrink-0" />
        <span className="flex-grow">{resource.label} [One - Short]</span>
      </button>
    </li>
  );
};

export default function ResourceModal({ subject, onClose, onOpenVideo }: ResourceModalProps) {
  
  const renderResourceList = (resources: Resource[], isLecture = false) => {
    if (resources.length === 0) {
      return <p className="px-2 py-4 text-sm text-muted-foreground italic">No resources available yet.</p>;
    }

    return (
      <ul className="space-y-1 py-2">
        {resources.map((resource) => {
          if (isLecture) {
             const isPlaylist = isYouTubePlaylist(resource.url);
             if(isPlaylist) {
                return <ResourceLink key={resource.id} resource={resource} isPlaylist={true} />;
             }
             const videoId = getYouTubeVideoId(resource.url);
             if (videoId) {
                return <YoutubeLink key={resource.id} resource={resource} onClick={onOpenVideo} />;
             }
          }
          // Fallback for non-lecture resources or non-youtube lecture links
          return <ResourceLink key={resource.id} resource={resource} />;
        })}
      </ul>
    );
  };

  return (
      <Dialog open={!!subject} onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <span className="text-3xl">{subject.icon}</span>
              {subject.name}
            </DialogTitle>
            <DialogDescription className="pt-2">{subject.description}</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Accordion type="multiple" className="w-full" defaultValue={['notes']}>
              <AccordionItem value="notes">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" /> Notes
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderResourceList(subject.resources.notes)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pyqs">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <PencilRuler className="h-5 w-5" /> Previous Year Questions
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderResourceList(subject.resources.pyqs)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="lectures">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5" /> Lectures
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderResourceList(subject.resources.lectures, true)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="practicals">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5" /> Practicals
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderResourceList(subject.resources.practicals)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
  );
}

