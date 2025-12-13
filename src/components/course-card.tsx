import type { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <Link href={`/courses/${id}`} className="block h-full group">
      <Card className="h-full transform-gpu overflow-hidden text-center transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-white">
        <CardHeader className="items-center pb-4">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{name}</h3>
          <p className="text-sm font-semibold text-primary">{duration}</p>
        </CardHeader>
        <CardContent className="flex flex-col">
          <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-auto self-center rounded-lg text-primary group-hover:text-secondary inline-flex items-center justify-center gap-2">
            Access Resources <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
