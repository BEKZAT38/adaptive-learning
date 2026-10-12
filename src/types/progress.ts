export type Mode = 'diagnostic' | 'practice';
export type SubjectProgress = { ability: number; diagnosed: boolean; seen: string[]; errors: Record<string, number>; topics: Record<string, [number, number]>; correct: number; total: number };
export type Session = { subject: string; mode: Mode; date: string; correct: number; total: number; avgSec: number; sec: number; ability: number };
