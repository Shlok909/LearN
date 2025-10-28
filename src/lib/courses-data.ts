import type { Course, CoursesData } from './types';

export const coursesData: CoursesData = {
  bca: {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelors of Computer Application',
    duration: '4 Years',
    totalSemesters: 8,
    icon: 'GraduationCap',
    description: 'Explore the world of computer applications and software development.',
    semesters: [
      {
        id: 1,
        name: 'Semester 1',
        subjects: [
          {
            id: 'data-structure',
            name: 'Data Structure',
            code: 'BCA101',
            icon: '📊',
            description: 'Master the fundamentals of data organization and algorithms.',
            resources: {
              notes: [
                { id: 1, label: 'Link 1 II', url: '#', type: 'pdf' },
                { id: 2, label: 'Link 2 II', url: '#', type: 'pdf' },
              ],
              pyqs: [
                { id: 1, label: 'Data structures summer 2019', url: '#', type: 'pdf' },
                { id: 2, label: 'Data structures summer 2018_1', url: '#', type: 'pdf' },
                { id: 3, label: 'Data structures summer 2018_2', url: '#', type: 'pdf' },
              ],
              lectures: [
                { id: 1, label: 'Link 1 II', url: '#', type: 'youtube' },
                { id: 2, label: 'Link 2 II', url: '#', type: 'youtube' },
              ],
              practicals: [{ id: 1, label: 'Link 1 II', url: '#', type: 'pdf' }],
            },
          },
          {
            id: 'constitution-india',
            name: 'Constitution of India',
            code: 'BCA102',
            icon: '📜',
            description: 'Explore the foundational document of Indian democracy.',
            resources: { notes: [], pyqs: [], lectures: [], practicals: [] },
          },
          {
            id: 'dbms',
            name: 'Database Management System',
            code: 'BCA103',
            icon: '🗄️',
            description: 'Learn to design, implement, and manage databases effectively.',
            resources: { notes: [], pyqs: [], lectures: [], practicals: [] },
          },
          {
            id: 'web-technology',
            name: 'Web Technology',
            code: 'BCA104',
            icon: '🌐',
            description: 'Dive into modern web development. HTML, CSS, JavaScript, and frameworks.',
            resources: { notes: [], pyqs: [], lectures: [], practicals: [] },
          },
          { id: 'cpp', name: 'C++', code: 'BCA105', icon: '⚡', description: 'Master object-oriented programming with C++.', resources: { notes: [], pyqs: [], lectures: [], practicals: [] } },
          { id: 'operating-system', name: 'Operating System', code: 'BCA106', icon: '💻', description: 'Understand how operating systems work.', resources: { notes: [], pyqs: [], lectures: [], practicals: [] } },
        ],
      },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id: 5, name: 'Semester 5', subjects: [] },
      { id: 6, name: 'Semester 6', subjects: [] },
      { id: 7, name: 'Semester 7', subjects: [] },
      { id: 8, name: 'Semester 8', subjects: [] },
    ],
  },
  bsc: {
    id: 'bsc',
    name: 'B.Sc',
    fullName: 'Bachelor of Science',
    duration: '3 Years',
    totalSemesters: 6,
    icon: 'Microscope',
    description: 'Dive into scientific theories and practical research in various fields.',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: [] },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id: 5, name: 'Semester 5', subjects: [] },
      { id: 6, name: 'Semester 6', subjects: [] },
    ],
  },
  bcom: {
    id: 'bcom',
    name: 'B.Com',
    fullName: 'Bachelor of Commerce',
    duration: '3 Years',
    totalSemesters: 6,
    icon: 'Briefcase',
    description: 'Master the principles of commerce, finance, and accounting.',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: [] },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id: 5, name: 'Semester 5', subjects: [] },
      { id: 6, name: 'Semester 6', subjects: [] },
    ],
  },
  ba: {
    id: 'ba',
    name: 'B.A.',
    fullName: 'Bachelor of Arts',
    duration: '3 Years',
    totalSemesters: 6,
    icon: 'ScrollText',
    description: 'Engage with humanities, social sciences, and the liberal arts.',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: [] },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id: 5, name: 'Semester 5', subjects: [] },
      { id: 6, name: 'Semester 6', subjects: [] },
    ],
  },
  bba: {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    duration: '3 Years',
    totalSemesters: 6,
    icon: 'BarChartBig',
    description: 'Develop leadership and management skills for the business world.',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: [] },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id: 5, name: 'Semester 5', subjects: [] },
      { id: 6, name: 'Semester 6', subjects: [] },
    ],
  },
  btech: {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology',
    duration: '4 Years',
    totalSemesters: 8,
    icon: 'Laptop',
    description: 'Engineer the future with cutting-edge technology and innovation.',
    semesters: [],
  },
};

export function getCourses() {
  return Object.values(coursesData);
}

export function getCourseById(id: string): Course | undefined {
  return coursesData[id];
}
