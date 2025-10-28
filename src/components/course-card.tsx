import type { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon, GraduationCap, Microscope, Briefcase, ScrollText, BarChartBig, Laptop } from 'lucide-react';

const icons: { [key: string]: LucideIcon } = {
  GraduationCap,
  Microscope,
  Briefcase,
  ScrollText,
  BarChartBig,
  Laptop
};

export interface CourseCardProps {
  id: string;
  icon: string;
  name: string;
  duration: string;
  description: string;
}

const CourseCard: FC<CourseCardProps> = ({ id, icon, name, duration, description }) => {
  const Icon = icons[icon as keyof typeof icons] || Laptop;
  return (
    <Card className="h-full transform-gpu overflow-hidden text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader className="items-center pb-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{name}</h3>
        <p className="text-sm font-semibold text-primary">{duration}</p>
      </CardHeader>
      <CardContent className="flex flex-col">
        <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Button asChild size="lg" className="mt-auto self-center rounded-lg hover:bg-secondary">
          <Link href={`/courses/${id}`}>
            Access Resources <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
