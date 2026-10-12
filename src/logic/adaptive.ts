import { Q, SubjectProgress } from '../types';

export const emptyProgress = (): SubjectProgress => ({ ability: 2, diagnosed: false, seen: [], errors: {}, topics: {}, correct: 0, total: 0 });
export const levelOf = (a: number) => Math.min(3, Math.max(1, Math.round(a)));
export const levelName = (a: number) => ['', 'Начальный', 'Средний', 'Продвинутый'][levelOf(a)];
export const pct = (a: number) => (a - 0.5) / 3; // 0..1 для прогресс-бара

const EXPECTED_SEC = [0, 20, 35, 50]; // ожидаемое время на задание по уровню

/** Новая оценка уровня по ошибке/успеху и скорости. */
export function updateAbility(ability: number, level: number, correct: boolean, sec: number, hintUsed: boolean) {
  const fast = sec <= EXPECTED_SEC[level] * 0.5;
  const slow = sec > EXPECTED_SEC[level];
  let d: number;
  if (correct) {
    d = hintUsed ? 0.1 : fast ? 0.4 : slow ? 0.15 : 0.25;
    if (level < ability - 0.5) d *= 0.5; // лёгкое задание даёт меньше роста
  } else {
    d = slow ? -0.2 : -0.35; // быстрая ошибка = угадывание → штраф больше
  }
  return Math.min(3.49, Math.max(0.5, ability + d));
}

/** Выбор следующего задания: близко к уровню, приоритет слабым темам и новым вопросам. */
export function pickNext(pool: Q[], p: SubjectProgress, used: string[], ability: number): Q {
  const score = (x: Q) =>
    -Math.abs(x.level - ability) * 10 + (p.errors[x.topic] || 0) * 2 + (p.seen.includes(x.id) ? -3 : 0) + Math.random();
  return pool.filter((x) => !used.includes(x.id)).sort((a, b) => score(b) - score(a))[0];
}

export const weakTopic = (p?: SubjectProgress) => {
  const e = Object.entries(p?.errors ?? {}).sort((a, b) => b[1] - a[1])[0];
  return e ? e[0] : null;
};
export const accuracy = (p?: SubjectProgress) => (p && p.total ? Math.round((p.correct / p.total) * 100) : 0);
