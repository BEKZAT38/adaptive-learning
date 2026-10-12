export type Role = 'student' | 'teacher';
export type Mode = 'diagnostic' | 'practice';
export type Account = { name: string; login: string; password: string; role: Role };
export type Q = { id: string; subject: string; level: 1 | 2 | 3; topic: string; text: string; options: string[]; answer: number; hint: string; accept?: string[] };
export type SubjectProgress = { ability: number; diagnosed: boolean; seen: string[]; errors: Record<string, number>; topics: Record<string, [number, number]>; correct: number; total: number };
export type Session = { subject: string; mode: Mode; date: string; correct: number; total: number; avgSec: number; sec: number; ability: number };
export type RootStackParams = {
  Auth: undefined;
  Tabs: undefined;
  Quiz: { subject: string; mode: Mode; topic?: string };
  Result: { session: Session };
  Student: { index: number };
};
