import { getCourses } from '@/lib/courses-data';
import CourseCard from '@/components/course-card';

const CoursesSection = () => {
  const courses = getCourses();
  return (
    <section id="courses" className="bg-background py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-[42px]">
            Our Courses
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course.name} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <CourseCard 
                id={course.id}
                name={course.name}
                icon={course.icon}
                duration={course.duration}
                description={course.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
