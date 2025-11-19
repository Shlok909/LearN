
import NavigationBar from '@/components/layout/navigation-bar';
import HeroSection from '@/components/sections/hero-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar hideNavLinks={true} />
      <main className="flex-grow">
        <HeroSection />
        <WhyChooseUsSection />
      </main>
      <Footer />
    </div>
  );
}
