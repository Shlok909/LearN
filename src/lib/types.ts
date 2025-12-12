export interface Resource {
  id: number;
  label: string;
  url: string;
  type: 'pdf' | 'youtube' | 'external';
}

export interface ResourceCategory {
  notes: Resource[];
  pyqs: Resource[]; // Previous Year Questions
  lectures: Resource[];
  practicals: Resource[];
}

export interface Subject {
  id: string;
  name: string;
  code?: string; // Optional subject code
  icon: string; // Emoji or icon name
  description: string;
  resources: ResourceCategory;
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface Course {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  totalSemesters: number;
  icon: string;
  description: string;
  semesters: Semester[];
  syllabusPdfUrl?: string;
}

export type CoursesData = {
  [key: string]: Course;
};
