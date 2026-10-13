import { Lang } from '../theme/themes';
import { en } from './en';
import { kk } from './kk';

// Ключ — русский текст. Для 'ru' возвращается он сам, для en/kk — перевод из словаря
export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const dict = lang === 'en' ? en : lang === 'kk' ? kk : undefined;
  const text = dict?.[key] ?? key;
  return vars ? text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? '')) : text;
}
