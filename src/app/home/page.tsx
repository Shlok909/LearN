
import NavigationBar from '@/components/layout/navigation-bar';
import CoursesSection from '@/components/sections/courses-section';
import RecommendationSection from '@/components/sections/recommendation-section';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-24 text-center md:py-32">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Welcome to LearNova
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Your journey to knowledge begins now.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-6 sm:gap-y-0">
              <Button asChild size="lg">
                <Link href="#courses">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-secondary hover:text-secondary-foreground hover:border-secondary">
                <Link href="#recommendations">Give us your feedback</Link>
              </Button>
            </div>
          </div>
        </section>
        <CoursesSection />
        <RecommendationSection />
      </main>
      <Footer />
    </div>
  );
}
