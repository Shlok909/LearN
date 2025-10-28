import { Library, Zap, Target, RefreshCw, type LucideIcon } from 'lucide-react';
import FeatureCard from '@/components/feature-card';

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Library,
    title: 'Comprehensive Resources',
    description: 'Access a vast library of notes, lectures, and practice materials for all your subjects.',
  },
  {
    icon: Zap,
    title: 'Easy Access',
    description: 'Our platform is designed for speed and simplicity, letting you find what you need in seconds.',
  },
  {
    icon: Target,
    title: 'Focused Learning',
    description: 'Utilize AI-powered tools to get personalized study plans and course recommendations.',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'Content is regularly updated to ensure you have the most relevant and current resources.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="bg-card py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Why Choose LearnNova?
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={feature.title} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
