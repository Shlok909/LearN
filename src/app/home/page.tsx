import NavigationBar from '@/components/layout/navigation-bar';
import CoursesSection from '@/components/sections/courses-section';
import RecommendationSection from '@/components/sections/recommendation-section';
import Footer from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Welcome to LearNova</h1>
            <p className="text-lg md:text-xl text-muted-foreground">Your journey to knowledge begins now.</p>
        </div>
        <CoursesSection />
        <RecommendationSection />
      </main>
      <Footer />
    </div>
  );
}
