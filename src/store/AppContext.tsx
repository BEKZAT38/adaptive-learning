import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Session, SubjectProgress } from '../types';

type Data = { progress: Record<string, SubjectProgress>; sessions: Session[] };
type Ctx = {
  ready: boolean; user: Account | null; progress: Record<string, SubjectProgress>; sessions: Session[]; active: string;
  setActive: (id: string) => void;
  register: (a: Account) => string | null; signIn: (login: string, pw: string) => string | null;
  logout: () => void; reset: () => void; finish: (s: Session, p: SubjectProgress) => void;
};
const KEY = 'adaptive_v2';
const AppCtx = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [login, setLogin] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, Data>>({});
  const [active, setActive] = useState('sql');

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) { const d = JSON.parse(raw); setAccounts(d.accounts); setLogin(d.login); setData(d.data); setActive(d.active); }
    }).catch(() => {}).finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify({ accounts, login, data, active })).catch(() => {});
  }, [ready, accounts, login, data, active]);

  const user = accounts.find((a) => a.login === login) ?? null;
  const cur: Data = data[login ?? ''] ?? { progress: {}, sessions: [] };
  const put = (fn: (d: Data) => Data) => setData((all) => ({ ...all, [login ?? '']: fn(all[login ?? ''] ?? { progress: {}, sessions: [] }) }));

  const value: Ctx = {
    ready, user, active, setActive, progress: cur.progress, sessions: cur.sessions,
    register: (a) => {
      if (!a.name.trim() || !a.login.trim() || a.password.length < 4) return 'Заполните все поля, пароль — от 4 символов';
      if (accounts.some((x) => x.login === a.login.trim())) return 'Такой логин уже существует';
      setAccounts((l) => [...l, { ...a, login: a.login.trim(), name: a.name.trim() }]); setLogin(a.login.trim()); return null;
    },
    signIn: (l, pw) => {
      const a = accounts.find((x) => x.login === l.trim() && x.password === pw);
      if (!a) return 'Неверный логин или пароль';
      setLogin(a.login); return null;
    },
    logout: () => setLogin(null),
    reset: () => put(() => ({ progress: {}, sessions: [] })),
    finish: (s, p) => put((d) => ({ progress: { ...d.progress, [s.subject]: p }, sessions: [s, ...d.sessions] })),
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
