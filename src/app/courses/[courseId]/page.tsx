import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center md:mb-16">
              <h1 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">{course.fullName}</h1>
              <p className="text-xl text-primary font-semibold">({course.name})</p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {course.semesters.map((semester) => (
                <Link key={semester.id} href={`/courses/${course.id}/semester-${semester.id}`}>
                  <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary" />
                        {semester.name}
                      </CardTitle>
                      <CardDescription>
                        {semester.subjects.length > 0
                          ? `${semester.subjects.length} subjects`
                          : 'Subjects coming soon'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-end">
                       <p className="flex items-center text-sm font-semibold text-primary">
                         View Subjects <ArrowRight className="ml-2 h-4 w-4" />
                       </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
