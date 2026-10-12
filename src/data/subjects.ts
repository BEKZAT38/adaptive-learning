import { Subject } from '../types';
export const SUBJECTS: Subject[] = [
  { id: 'sql', title: 'SQL', icon: 'server', color: '#16A34A' },
  { id: 'math', title: 'Математика', icon: 'calculator', color: '#4F46E5' },
  { id: 'cs', title: 'Информатика', icon: 'laptop', color: '#0891B2' },
  { id: 'eng', title: 'English', icon: 'language', color: '#D97706' },
  { id: 'phys', title: 'Физика', icon: 'planet', color: '#DB2777' },
];
export const subjectOf = (id: string) => SUBJECTS.find((s) => s.id === id)!;

