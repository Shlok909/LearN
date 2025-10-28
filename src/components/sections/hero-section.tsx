import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedHeroBackground from './animated-hero-background';

const HeroSection = () => {
  return (
    <section className="relative flex h-[calc(100vh-70px)] min-h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-accent text-center text-white">
      <AnimatedHeroBackground />
      <div className="relative z-10 mx-auto max-w-2xl px-4">
        <h1 className="mb-5 text-4xl font-bold md:text-[56px]">
          Welcome to LearnNova
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-base text-white/90 md:text-xl">
          Your gateway to comprehensive learning resources across multiple subjects.
        </p>
        <Button
          asChild
          size="lg"
          className="h-auto rounded-full bg-white px-12 py-4 text-lg font-semibold text-primary transition-transform duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
        >
          <Link href="#courses">Explore Courses</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
