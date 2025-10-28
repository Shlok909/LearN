import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, FileText, Youtube } from 'lucide-react';
import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import type { Resource } from '@/lib/types';


const ResourceLink = ({ resource }: { resource: Resource }) => {
  const Icon = resource.type === 'youtube' ? Youtube : FileText;
  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
      <span>{resource.label}</span>
    </Link>
  );
};


export default function SemesterPage({ params }: { params: { courseId: string, semesterId: string } }) {
  const course = getCourseById(params.courseId);
  const semesterIdNum = parseInt(params.semesterId.replace('semester-', ''), 10);
  const semester = course?.semesters.find(s => s.id === semesterIdNum);

  if (!course || !semester) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center md:mb-16">
              <h1 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">{course.name} - {semester.name}</h1>
              <p className="text-xl text-primary font-semibold">{course.fullName}</p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
            </div>

            {semester.subjects.length > 0 ? (
              <div className="mx-auto grid max-w-4xl gap-8">
                {semester.subjects.map((subject: any) => (
                  <Card key={subject.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <span className="text-3xl">{subject.icon}</span>
                        {subject.name}
                      </CardTitle>
                      <CardDescription>{subject.code && `(${subject.code}) - `}{subject.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="notes">
                          <AccordionTrigger>Notes</AccordionTrigger>
                          <AccordionContent>
                            {subject.resources.notes.length > 0 ? subject.resources.notes.map((res: Resource) => <ResourceLink key={res.id} resource={res} />) : <p className="p-2 text-sm text-muted-foreground">No notes available yet.</p>}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="pyqs">
                          <AccordionTrigger>Previous Year Questions</AccordionTrigger>
                          <AccordionContent>
                            {subject.resources.pyqs.length > 0 ? subject.resources.pyqs.map((res: Resource) => <ResourceLink key={res.id} resource={res} />) : <p className="p-2 text-sm text-muted-foreground">No PYQs available yet.</p>}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="lectures">
                          <AccordionTrigger>Lectures</AccordionTrigger>
                          <AccordionContent>
                            {subject.resources.lectures.length > 0 ? subject.resources.lectures.map((res: Resource) => <ResourceLink key={res.id} resource={res} />) : <p className="p-2 text-sm text-muted-foreground">No lectures available yet.</p>}
                          </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="practicals">
                          <AccordionTrigger>Practicals</AccordionTrigger>
                          <AccordionContent>
                            {subject.resources.practicals.length > 0 ? subject.resources.practicals.map((res: Resource) => <ResourceLink key={res.id} resource={res} />) : <p className="p-2 text-sm text-muted-foreground">No practicals available yet.</p>}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
    </div>
  );
}
