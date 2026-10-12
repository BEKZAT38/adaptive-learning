import { Session, SubjectProgress } from '../types';
import { pct } from './adaptive';

const day = (d: string | Date) => new Date(d).toDateString();
export type Stats = ReturnType<typeof stats>;

export function stats(progress: Record<string, SubjectProgress>, sessions: Session[]) {
  const ps = Object.values(progress);
  const tasks = ps.reduce((a, p) => a + p.total, 0);
  const correct = ps.reduce((a, p) => a + p.correct, 0);
  const sec = sessions.reduce((a, s) => a + s.sec, 0);
  const answered = sessions.reduce((a, s) => a + s.total, 0);
  const diag = ps.filter((p) => p.diagnosed);
  const days = new Set(sessions.map((s) => day(s.date)));
  let streak = 0;
  const d = new Date();
  if (!days.has(day(d))) d.setDate(d.getDate() - 1);
  while (days.has(day(d))) { streak++; d.setDate(d.getDate() - 1); }
  const week = [...Array(7)].map((_, i) => {
    const x = new Date(); x.setDate(x.getDate() - (6 - i));
    const ss = sessions.filter((s) => day(s.date) === day(x));
    const t = ss.reduce((a, s) => a + s.total, 0), c = ss.reduce((a, s) => a + s.correct, 0);
    return { label: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][x.getDay()], acc: t ? Math.round((c / t) * 100) : 0, t };
  });
  const tp = ps.flatMap((p) => Object.entries(p.topics)).map(([topic, [c, t]]) => ({ topic, r: c / t }));
  return {
    tasks, sec, streak, week,
    acc: tasks ? Math.round((correct / tasks) * 100) : 0,
    avgSec: answered ? Math.round(sec / answered) : 0,
    overall: diag.length ? Math.round((diag.reduce((a, p) => a + pct(p.ability), 0) / diag.length) * 100) : 0,
    today: sessions.filter((s) => day(s.date) === day(new Date())).reduce((a, s) => a + s.total, 0),
    strong: tp.filter((x) => x.r >= 0.7).map((x) => x.topic),
    weak: tp.filter((x) => x.r < 0.5).map((x) => x.topic),
  };
}

export const ACH: { id: string; title: string; icon: string; ok: (s: Stats, p: Record<string, SubjectProgress>) => boolean }[] = [
  { id: 'a1', title: 'Первый шаг', icon: 'footsteps', ok: (s) => s.tasks >= 1 },
  { id: 'a2', title: '10 заданий', icon: 'checkmark-done', ok: (s) => s.tasks >= 10 },
  { id: 'a3', title: 'Точность 80%', icon: 'locate', ok: (s) => s.tasks >= 5 && s.acc >= 80 },
  { id: 'a4', title: 'Скорость', icon: 'flash', ok: (s) => s.tasks >= 5 && s.avgSec <= 12 },
  { id: 'a5', title: 'Серия 3 дня', icon: 'flame', ok: (s) => s.streak >= 3 },
  { id: 'a6', title: 'Эксперт', icon: 'trophy', ok: (_, p) => Object.values(p).some((x) => x.diagnosed && x.ability >= 2.5) },
];
