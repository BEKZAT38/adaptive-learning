export const SUBJECTS = [
  { id: 'sql', title: 'SQL', icon: 'server', color: '#16A34A' },
  { id: 'math', title: 'Математика', icon: 'calculator', color: '#4F46E5' },
  { id: 'cs', title: 'Информатика', icon: 'laptop', color: '#0891B2' },
  { id: 'eng', title: 'English', icon: 'language', color: '#D97706' },
  { id: 'phys', title: 'Физика', icon: 'planet', color: '#DB2777' },
];
export const subjectOf = (id: string) => SUBJECTS.find((s) => s.id === id)!;

type Rec = Record<string, number>;
// Демо-студенты для панели преподавателя: ab — уровень (0.5–3.5), acc — % верных, err — число ошибок, sec — среднее время ответа
export const DEMO_STUDENTS: { name: string; group: string; ab: Rec; acc: Rec; err: number; sec: number }[] = [
  { name: 'Айдана Кенжебек', group: 'ИС-21', ab: { sql: 2.9, math: 2.8, cs: 2.5, eng: 1.6, phys: 2.1 }, acc: { sql: 88, math: 86, cs: 78, eng: 52, phys: 65 }, err: 14, sec: 11 },
  { name: 'Данияр Сатыбалды', group: 'ИС-21', ab: { sql: 1.9, math: 1.4, cs: 2.9, eng: 2.2, phys: 1.2 }, acc: { sql: 61, math: 41, cs: 90, eng: 70, phys: 38 }, err: 31, sec: 18 },
  { name: 'Мадина Токтарова', group: 'ИС-22', ab: { sql: 2.4, math: 2.1, cs: 2.0, eng: 3.1, phys: 2.4 }, acc: { sql: 72, math: 68, cs: 66, eng: 92, phys: 72 }, err: 19, sec: 14 },
  { name: 'Ерлан Бахытов', group: 'ИС-22', ab: { sql: 1.1, math: 1.0, cs: 1.3, eng: 1.5, phys: 1.1 }, acc: { sql: 45, math: 35, cs: 44, eng: 48, phys: 30 }, err: 47, sec: 26 },
];
