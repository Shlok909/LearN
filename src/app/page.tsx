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
        <div className="animate-slide-up-fade-in" style={{ animationDelay: '100ms', opacity: 0 }}>
          <HeroSection />
        </div>
        <div className="animate-slide-up-fade-in" style={{ animationDelay: '200ms', opacity: 0 }}>
          <CoursesSection />
        </div>
        <div className="animate-slide-up-fade-in" style={{ animationDelay: '300ms', opacity: 0 }}>
          <WhyChooseUsSection />
        </div>
        <div className="animate-slide-up-fade-in" style={{ animationDelay: '400ms', opacity: 0 }}>
          <RecommendationSection />
        </div>
      </main>
      <div className="animate-slide-up-fade-in" style={{ animationDelay: '500ms', opacity: 0 }}>
        <Footer />
      </div>
    </div>
  );
}
