import type { Course, CoursesData } from './types';

export const coursesData: CoursesData = {
  bca: {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelors of Computer Application',
    duration: '4 Years',
    totalSemesters: 8,
    icon: 'GraduationCap',
    description: 'Degree is a professional degree. The course is designed to provide students with the knowledge and skills required to succeed in computer science and information technology.',
    semesters: [
      {
        id: 1,
        name: 'Semester 1',
        subjects: [
          {
            id: '1',
            name: 'Data Structures',
            code: 'BCA101',
            icon: '📊',
            description: 'Master the fundamentals of data organization and algorithms.',
            resources: {
              notes: [
                { id: 1, label: 'Link 1 II', url: '#', type: 'pdf' },
              ],
              pyqs: [
                { id: 1, label: 'Data structures summer 2019', url: '#', type: 'pdf' },
              ],
              lectures: [
                { id: 1, label: 'Link 1 II', url: '#', type: 'youtube' },
              ],
              practicals: [{ id: 1, label: 'Link 1 II', url: '#', type: 'pdf' }],
            },
          },
          {
            id: '2',
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
            id: 'web-technology-sem1',
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
      
      /* !!!!!!!!!!!          BCA Semester 2         !!!!!!!!!!*/
      { id: 2, name: 'Semester 2', subjects: [
        {
          id: 'data-structure',
          name: 'Data Structure',
          code: 'BCA101',
          icon: '📊',
          description: 'Master the fundamentals of data organization and algorithms.',
          resources: {
            notes: [
              { id: 1, label: 'Unit - 1 ', url: '#', type: 'pdf' },
              { id: 2, label: 'Unit - 2', url: '#', type: 'pdf' },
              { id: 3, label: 'Unit - 3', url: '#', type: 'pdf' },
              { id: 4, label: 'Unit - 4', url: '#', type: 'pdf' },
            ],
            pyqs: [
              { id: 1, label: 'Data structures summer 2019',   url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-2227-summer-2019.pdf', type: 'pdf' },
              { id: 2, label: 'Data structures summer 2018_1', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-paper-3-summer-2018.pdf', type: 'pdf' },
              { id: 3, label: 'Data structures summer 2018_2', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-summer-2018.pdf', type: 'pdf' },
              { id: 4, label: 'Data structures winter 2018', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-winter-2018.pdf', type: 'pdf' },
              { id: 5, label: 'Data structures summer 2017', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-summer-2017.pdf', type: 'pdf' },
              { id: 6, label: 'Data structures winter 2017', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-winter-2017.pdf', type: 'pdf' },
              { id: 7, label: 'Data structures summer 2016', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-summer-2016.pdf', type: 'pdf' },
              { id: 8, label: 'Data structures winter 2016',url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-structures-winter-2016.pdf', type: 'pdf' },
            ],
            lectures: [
              { id: 1, label: 'Link 1 ', url: 'https://youtu.be/MdG0Vw9f1A4?si=QmF6df5SHgZDYQHo', type: 'youtube' },
              { id: 2, label: 'Link 2 ', url: 'https://youtu.be/J0OvDNmAWNw?si=nVjGorUrDjT_szES', type: 'youtube' },
              { id: 3, label: 'Link 3 ', url: 'https://youtu.be/OkS9YkfW50s?si=K38UEmaOUJO1Vlch', type: 'youtube' },
              { id: 4, label: 'Link 4 ', url: 'https://youtu.be/0rIcIgpl664?si=OdJqoytAzn1qgmlQ', type: 'youtube' },
              { id: 5, label: 'Link 5 ', url: 'https://youtube.com/playlist?list=PLqleLpAMfxGAf5rrWdm92WMK3-gsrxgz5&si=GDZBrnXzwnYeksqi', type: 'youtube' },
              { id: 6, label: 'Link 6 ', url: 'https://youtu.be/8TVaEGeaGGc?si=A-JLzxn_8XkO-Bo9', type: 'youtube' },
              { id: 7, label: 'Link 7 ', url: 'https://youtu.be/zeNnWyEcqSk?si=RJXNYpKpsn4fxUmm', type: 'youtube' },
              { id: 8, label: 'Link 8 ', url: 'https://youtu.be/3Ut-Hha-tmk?si=XuCrUhXS24rCUM2U', type: 'youtube' },
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
          resources: { 
            notes: [
              { id: 1, label: 'Link 1 II', url: '#', type: 'pdf' },
              { id: 2, label: 'Link 2 II', url: '#', type: 'pdf' },
              { id: 3, label: 'Link 3 II', url: '#', type: 'pdf' },
              { id: 4, label: 'Link 4 II', url: '#', type: 'pdf' },
            ], 
            pyqs: [
              { id: 1, label: 'link 1', url: 'https://i.postimg.cc/gk82SYrg/IMG-20250520-WA0017.jpg', type: 'pdf' },
              { id: 2, label: 'link 2', url: '#', type: 'pdf' },
            ], 
            lectures: [
              { id: 1, label: 'Link 1 ', url: 'https://youtube.com/playlist?list=PLIEVEMAFhG48wZr7qyD4coAuF0EgieTz-&si=iqqsz9crtgRbSEf5', type: 'youtube' },
              { id: 2, label: 'Link 2 ', url: 'https://youtube.com/playlist?list=PLNpnnvxnB2dvFiYlWGsRSpoJme9NaPgle&si=cJ7cg2F9uR2Ucx5e', type: 'youtube' },
              { id: 3, label: 'Link 3 ', url: 'https://youtu.be/KpkoDha-gR4?si=3cqMfslbRddKfPPh', type: 'youtube' },
              { id: 4, label: 'Link 4 ', url: 'https://youtu.be/W-OikE_-n-o?si=HyV2aYtNHOuSbsZY', type: 'youtube' },
              { id: 5, label: 'Link 5 ', url: 'https://youtu.be/7dxt1vcJQQk?si=ovGizf7FZrkFdSg3', type: 'youtube' },
              { id: 6, label: 'Link 6 ', url: 'https://youtu.be/jpU73yXBIWo?si=nPRtMbO9155JGG0Y', type: 'youtube' },
              { id: 7, label: 'Link 7 ', url: 'https://youtu.be/RbsVIvUQEBA?si=wMfjAX2RhJXL1o7I', type: 'youtube' },
              { id: 8, label: 'Link 8',  url: 'https://youtu.be/Dl85IEp8IRs?si=KpdLxq9_AJ1xc9JE', type: 'youtube' },  
              { id: 9, label: 'Link 9',  url: 'https://youtu.be/IusiYyQBTfo?si=-wW5a85NT5muGFhK', type: 'youtube' }, 
              { id: 10,label: 'Link 10', url: 'https://youtu.be/B1Ysu9xlmW0?si=XY-JeJCBiIij7dDp', type: 'youtube' },
            ], 
            practicals: [] 
          },
        },
        
        {
          id: 'dbms-sem2',
          name: 'Database Management System',
          code: 'BCA103',
          icon: '🗄️',
          description: 'Learn to design, implement, and manage databases effectively.',
          resources: { 
            notes: [
              { id: 1, label: 'Link 1', url: '#', type: 'pdf' },
              { id: 2, label: 'Link 2', url: '#', type: 'pdf' },
              { id: 3, label: 'Link 3', url: '#', type: 'pdf' },
              { id: 4, label: 'Link 4', url: '#', type: 'pdf' },
            ], 
            pyqs: [
              { id: 1, label: 'DBMS summer 2019',   url: 'https://www.rtmnuonline.com/papers/bca-3-sem-data-base-management-system-2226-summer-2019.pdf', type: 'pdf' },
              { id: 2, label: 'DBMS summer 2018',   url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-paper-2-summer-2018.pdf', type: 'pdf' },
              { id: 3, label: 'DBMS summer 2018_2', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-summer-2018.pdf', type: 'pdf' },
              { id: 4, label: 'DBMS winter 2018', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-winter-2018.pdf', type: 'pdf' },
              { id: 5, label: 'DBMS summer 2017', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-summer-2017.pdf', type: 'pdf' },
              { id: 6, label: 'DBMS winter 2017', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-winter-2017.pdf', type: 'pdf' },
              { id: 7, label: 'DBMS summer 2016', url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-summer-2016.pdf', type: 'pdf' },
              { id: 8, label: 'DBMS winter 2016',url: 'https://www.rtmnuonline.com/papers/bca-3-sem-database-management-system-winter-2016.pdf', type: 'pdf' },
            ], 
            lectures: [
              { id: 1, label: 'Link 1 ', url: 'https://youtu.be/YRnjGeQbsHQ?si=Yx00NuCfJHqN4-e3', type: 'youtube' },
              { id: 2, label: 'Link 2 ', url: 'https://youtu.be/jzuzxEFoiss?si=JO-X39h39MWq2v9I', type: 'youtube' },
              { id: 3, label: 'Link 3 ', url: 'https://youtu.be/dl00fOOYLOM?si=kyrAI2Q8i_v62W6a', type: 'youtube' },
              { id: 4, label: 'Link 4 ', url: 'https://youtu.be/J0OvDNmAWNw?si=I-cJuHjL6gI-5Zjv', type: 'youtube' },
              { id: 5, label: 'Link 5 ', url: 'https://youtu.be/viJzDvom2Yc?si=0pycMTlnkqOtY8al', type: 'youtube' },
              { id: 6, label: 'Link 6 ', url: 'https://youtube.com/playlist?list=PLYwpaL_SFmcBU4HS74xGTK1cAFbY0rdVY&si=gnYk_t18icBGYPj-', type: 'youtube' },
              { id: 7, label: 'Link 7 ', url: 'https://youtube.com/playlist?list=PLqleLpAMfxGDEClbx9ymd-KWDDJrx_W8C&si=MS46cOJ9IeFcT4Cp', type: 'youtube' },
              { id: 8, label: 'Link 8',  url: 'https://youtube.com/playlist?list=PLBvTTYUOHEmcbkKi6G-7tg0sUnQwujApt&si=qVYZKuN3T42Lw_-o', type: 'youtube' },  
              { id: 9, label: 'Link 9  (Unit- 1)', url: 'https://youtu.be/ptlIJiIByMc?si=UeMYRSvjUQDW0PrY', type: 'youtube' }, 
              { id: 10,label: 'Link 10 (Unit- 2)', url: 'https://youtu.be/jRReZoQi1hw?si=QwQbFJAMZqsu9MEX', type: 'youtube' },
              { id: 11,label: 'Link 11 (Unit- 3)', url: 'https://youtu.be/VAd8Audkxro?si=7dZWox_h3kK5kpfa', type: 'youtube' },
              { id: 12,label: 'Link 12 (Unit- 4)', url: 'https://youtu.be/0Skq_YqrHjg?si=ZxHTvNHy4f21ol7t', type: 'youtube' },
              { id: 13,label: 'Link 13', url: 'https://youtu.be/oR6IXFrJBEk?si=uNYjX4mp-M2LD08h', type: 'youtube' },
            ], 
            practicals: [] 
          }
        },
        { id: 'cpp-sem2', name: 'C++', code: 'BCA105', icon: '⚡', description: 'Master object-oriented programming with C++.', resources: { notes: [], pyqs: [], lectures: [], practicals: [] } },
        { id: 'operating-system-sem2', name: 'Operating System', code: 'BCA106', icon: '💻', description: 'Understand how operating systems work.', resources: { notes: [], pyqs: [], lectures: [], practicals: [] } }],
    },
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
    description: 'Explore scientific concepts and develop analytical skills across various science disciplines.',
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
    description: 'Gain expertise in commerce, accounting, and business management.',
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
    description: 'Explore humanities, social sciences, and liberal arts subjects.',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: [] },
      { id: 2, name: 'Semester 2', subjects: [] },
      { id: 3, name: 'Semester 3', subjects: [] },
      { id: 4, name: 'Semester 4', subjects: [] },
      { id_5: 'Semester 5', subjects: [] },
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
    description: 'Develop business management and administration skills.',
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
