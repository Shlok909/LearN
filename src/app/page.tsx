import NavigationBar from '@/components/layout/navigation-bar';
import HeroSection from '@/components/sections/hero-section';
import CoursesSection from '@/components/sections/courses-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';
import RecommendationSection from '@/components/sections/recommendation-section';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <HeroSection />
        <CoursesSection />
        <WhyChooseUsSection />
        <RecommendationSection />
      </main>
      <Footer />
    </div>
  );
}
