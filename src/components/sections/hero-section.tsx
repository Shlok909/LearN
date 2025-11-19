import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative flex h-[calc(100vh-70px)] min-h-[500px] w-full items-center justify-center overflow-hidden bg-transparent text-center text-white md:min-h-[600px]">
      <div className="absolute inset-0 z-[1] bg-black/30" />
      <div className="relative z-10 -mt-20 mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
          Welcome to LearNova
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-base text-white/90 md:text-xl">
          Your gateway to comprehensive learning resources across multiple
          subjects.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
           <Button
            asChild
            variant="outline"
            size="lg"
            className="h-auto rounded-full border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-white/10"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-auto rounded-full bg-white px-8 py-3 text-base font-semibold text-primary transition-transform duration-300 hover:scale-105 hover:bg-white/90"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
