
'use client';

import { useState, use } from 'react';
import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, ArrowRight } from 'lucide-react';
import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import BackButton from '@/components/back-button';
import type { Subject } from '@/lib/types';
import ResourceModal from '@/components/course/resource-modal';

export default function SemesterPage({ params: paramsProp }: { params: Promise<{ courseId: string; semesterId: string }> }) {
  const params = use(paramsProp);
  const course = getCourseById(params.courseId);
  const semesterIdNum = parseInt(params.semesterId, 10);

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="pt-8 pb-12 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <BackButton href={`/courses/${course.id}`} className="mb-8" />
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
    </div>
  );
}
