import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, GraduationCap, Microscope, Briefcase, ScrollText, BarChartBig, Laptop } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import BackButton from '@/components/back-button';

const icons: { [key: string]: LucideIcon } = {
  GraduationCap,
  Microscope,
  Briefcase,
  ScrollText,
  BarChartBig,
  Laptop
};

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }
  
  const Icon = icons[course.icon as keyof typeof icons] || Laptop;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-4">
              <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link href="/courses" className="text-muted-foreground hover:text-primary">Courses</Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{course.name}</span>
            </div>
            
            <div className="mb-12 text-center md:mb-16">
              <Icon className="mx-auto mb-4 h-20 w-20 text-primary" />
              <h1 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">{course.fullName}</h1>
              <p className="text-lg font-semibold text-muted-foreground">{course.duration} • {course.totalSemesters} Semesters</p>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {course.semesters.map((semester) => (
                <Link key={semester.id} href={`/courses/${course.id}/semester-${semester.id}`}>
                  <div className="flex h-40 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-center text-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold">{semester.name}</h3>
                  </div>
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
