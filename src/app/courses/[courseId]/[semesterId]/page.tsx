
'use client';

import { useState, use } from 'react';
import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, ArrowRight, AlertCircle } from 'lucide-react';
import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import BackButton from '@/components/back-button';
import type { Subject } from '@/lib/types';
import ResourceModal from '@/components/course/resource-modal';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function SemesterPage({ params: paramsProp }: { params: Promise<{ courseId: string; semesterId: string }> }) {
  const params = use(paramsProp);
  const course = getCourseById(params.courseId);
  const semesterIdNum = parseInt(params.semesterId, 10);

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);


  if (!course || isNaN(semesterIdNum)) {
    notFound();
  }
  
  const semester = course.semesters.find((s) => s.id === semesterIdNum);

  if (!semester) {
    notFound();
  }
  
  const handleOpenModal = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleCloseModal = () => {
    setSelectedSubject(null);
  };

  const isBcaSem1 = course.id === 'bca' && semester.id === 1;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="relative pt-8 pb-12 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <BackButton href={`/courses/${course.id}`} className="text-white" />
              {isBcaSem1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsInfoModalOpen(true)}
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="sr-only">Important Information</span>
                </Button>
              )}
            </div>
            
            <div className="mb-12 text-center md:mb-16">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-5xl">{course.name} - {semester.name}</h1>
              <p className="text-lg md:text-xl text-primary font-semibold">{course.fullName}</p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
            </div>

            {semester.subjects.length > 0 ? (
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {semester.subjects.map((subject: any) => (
                  <Card key={subject.id} className="flex h-full transform-gpu flex-col overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-border hover:border-white">
                    <CardHeader className="items-center text-center">
                      <div className="mb-4 text-5xl">{subject.icon}</div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      {subject.code && <CardDescription>{subject.code}</CardDescription>}
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col justify-between p-6">
                       <p className="mb-4 text-sm text-muted-foreground md:text-base">{subject.description}</p>
                       <button onClick={() => handleOpenModal(subject)} className="mt-auto inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                         Access Resources <ArrowRight className="ml-2 h-4 w-4" />
                       </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">Subjects for this semester will be updated soon.</p>
                <Book className="mx-auto mt-4 h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {selectedSubject && (
        <ResourceModal
          subject={selectedSubject}
          onClose={handleCloseModal}
        />
      )}

      <AlertDialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Important Information</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <ul className="list-disc space-y-2 pl-5 pt-2 text-left text-card-foreground">
                <li>The Practicals prints which you are able to see in the pdf will be provided by the teacher staff.</li>
                <li>In semester 1 there are only two practical related subjects: "Programming with C" and "Basics of Computer Architecture".</li>
                <li>Credits for the Practical records go to 'Savi Sorte' and for Vedic Maths notes 'Anuj Shindhe'.</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
