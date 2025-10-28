import { GraduationCap, Microscope, Briefcase, ScrollText, BarChartBig, Laptop, type LucideIcon } from 'lucide-react';

export interface Course {
  icon: LucideIcon;
  name: string;
  duration: string;
  description: string;
}

export const coursesData: Course[] = [
  {
    icon: GraduationCap,
    name: 'BCA',
    duration: '3 Years',
    description: 'Explore the world of computer applications and software development.',
  },
  {
    icon: Microscope,
    name: 'B.Sc',
    duration: '3 Years',
    description: 'Dive into scientific theories and practical research in various fields.',
  },
  {
    icon: Briefcase,
    name: 'B.Com',
    duration: '3 Years',
    description: 'Master the principles of commerce, finance, and accounting.',
  },
  {
    icon: ScrollText,
    name: 'B.A.',
    duration: '3 Years',
    description: 'Engage with humanities, social sciences, and the liberal arts.',
  },
  {
    icon: BarChartBig,
    name: 'BBA',
    duration: '3 Years',
    description: 'Develop leadership and management skills for the business world.',
  },
  {
    icon: Laptop,
    name: 'B.Tech',
    duration: '4 Years',
    description: 'Engineer the future with cutting-edge technology and innovation.',
  },
];
