export type Role = 'student' | 'teacher';
export type Account = { name: string; login: string; password: string; role: Role };
export type Student = { name: string; group: string; ab: Record<string, number>; acc: Record<string, number>; err: number; sec: number };
