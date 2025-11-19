
import { getCourseById } from '@/lib/courses-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Microscope, Briefcase, ScrollText, BarChartBig, Laptop } from 'lucide-react';
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

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = getCourseById(params.courseId);

  if (!course) {
    notFound();
  }
  
  const Icon = icons[course.icon as keyof typeof icons] || Laptop;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-8 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <BackButton href="/home" className="mb-8" />
            
            <div className="mb-12 text-center md:mb-16">
              <Icon className="mx-auto mb-4 h-16 w-16 md:h-20 md:w-20 text-primary" />
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-5xl">{course.fullName}</h1>
              <p className="text-base md:text-lg font-semibold text-muted-foreground">{course.duration} • {course.totalSemesters} Semesters</p>
              <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {course.semesters.map((semester) => (
                <Link key={semester.id} href={`/courses/${course.id}/${semester.id}`}>
                  <div className="group flex h-32 md:h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-white bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary">{semester.name}</h3>
                    <ArrowRight className="mt-2 h-5 w-5 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
