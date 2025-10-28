import Image from 'next/image';
import Footer from '@/components/layout/footer';
import NavigationBar from '@/components/layout/navigation-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const founders = [
  {
    name: 'Jane Doe',
    role: 'CEO & Co-Founder',
    bio: 'Jane is a passionate educator with a vision to make learning accessible to everyone. Her expertise in curriculum design ensures the highest quality content on LearnNova.',
    imageUrl: 'https://picsum.photos/seed/founder1/400/400',
    imageHint: 'woman portrait',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'John Smith',
    role: 'CTO & Co-Founder',
    bio: 'John is the technical mastermind behind LearnNova. With a background in scalable systems, he ensures our platform is fast, reliable, and user-friendly.',
    imageUrl: 'https://picsum.photos/seed/founder2/400/400',
    imageHint: 'man portrait',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavigationBar />
      <main className="flex-grow">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center md:mb-16">
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                About LearnNova
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                Empowering the next generation of learners through accessible, high-quality educational resources.
              </p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary" />
            </div>

            <div className="mx-auto max-w-4xl rounded-lg bg-card p-8 text-center shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-primary">Our Mission</h2>
              <p className="text-base leading-relaxed text-card-foreground">
                At LearnNova, our mission is to break down the barriers to education. We believe that every student deserves the opportunity to succeed, regardless of their background. We are committed to providing a comprehensive, easy-to-use platform that equips students with the knowledge and tools they need to excel in their academic journey. From detailed course materials to AI-powered personalized recommendations, we are redefining the future of learning.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Meet Our Founders
              </h2>
              <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
            </div>

            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
              {founders.map((founder) => (
                <Card key={founder.name} className="overflow-hidden text-center">
                  <CardHeader className="p-0">
                    <div className="relative h-64 w-full">
                      <Image
                        src={founder.imageUrl}
                        alt={`Portrait of ${founder.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={founder.imageHint}
                      />
                    </div>
                    <div className="p-6">
                      <CardTitle className="text-2xl">{founder.name}</CardTitle>
                      <p className="font-semibold text-primary">{founder.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{founder.bio}</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <Link href={founder.socials.github} className="text-muted-foreground transition-colors hover:text-primary"><Github /></Link>
                      <Link href={founder.socials.linkedin} className="text-muted-foreground transition-colors hover:text-primary"><Linkedin /></Link>
                      <Link href={founder.socials.twitter} className="text-muted-foreground transition-colors hover:text-primary"><Twitter /></Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
