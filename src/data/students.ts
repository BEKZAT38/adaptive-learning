import { Student } from '../types';

// Демо-студенты для панели преподавателя (ab — уровень 0.5–3.5, acc — % верных)
export const DEMO_STUDENTS: Student[] = [
  { name: 'Айдана Кенжебек', group: 'ИС-21', ab: { sql: 2.9, math: 2.8, cs: 2.5, eng: 1.6, phys: 2.1 }, acc: { sql: 88, math: 86, cs: 78, eng: 52, phys: 65 }, err: 14, sec: 11 },
  { name: 'Данияр Сатыбалды', group: 'ИС-21', ab: { sql: 1.9, math: 1.4, cs: 2.9, eng: 2.2, phys: 1.2 }, acc: { sql: 61, math: 41, cs: 90, eng: 70, phys: 38 }, err: 31, sec: 18 },
  { name: 'Мадина Токтарова', group: 'ИС-22', ab: { sql: 2.4, math: 2.1, cs: 2.0, eng: 3.1, phys: 2.4 }, acc: { sql: 72, math: 68, cs: 66, eng: 92, phys: 72 }, err: 19, sec: 14 },
  { name: 'Ерлан Бахытов', group: 'ИС-22', ab: { sql: 1.1, math: 1.0, cs: 1.3, eng: 1.5, phys: 1.1 }, acc: { sql: 45, math: 35, cs: 44, eng: 48, phys: 30 }, err: 47, sec: 26 },
];
export const avgAcc = (a: Record<string, number>) => Math.round(Object.values(a).reduce((x, y) => x + y, 0) / Object.values(a).length);
