import { StyleSheet } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export type FontScale = 'small' | 'normal' | 'large';
export type Lang = 'ru' | 'en' | 'kk';
export type Settings = { theme: ThemeMode; fontScale: FontScale; lang: Lang };

export type AppTheme = {
  background: string; bg: string; card: string; primary: string; dark: string; text: string; muted: string;
  soft: string; line: string; ok: string; bad: string; onPrimary: string;
  gradient: readonly [string, string, string]; glow1: string; glow2: string;
};
// Все цвета приложения хранятся здесь, на экранах используются через useSettings()
export const themes: Record<ThemeMode, AppTheme> = {
  light: { background: '#F3F8F4', bg: '#F3F8F4', card: '#FFFFFF', primary: '#16A34A', dark: '#14532D', text: '#14532D', muted: '#5F7A6B', soft: '#DCFCE7', line: '#D5E6DB', ok: '#16A34A', bad: '#DC2626', onPrimary: '#FFFFFF', gradient: ['#F3F8F4', '#E6F4EA', '#D6EEDD'], glow1: '#22C55E22', glow2: '#16A34A18' },
  dark: { background: '#052E1B', bg: '#052E1B', card: 'rgba(16, 64, 44, 0.92)', primary: '#22C55E', dark: '#ECFDF5', text: '#ECFDF5', muted: '#8FB9A3', soft: '#14532D', line: '#1F6A47', ok: '#4ADE80', bad: '#F87171', onPrimary: '#052E1B', gradient: ['#031A10', '#0A3D27', '#0F5A38'], glow1: '#22C55E22', glow2: '#16A34A1A' },
};
export const SCALE: Record<FontScale, number> = { small: 0.85, normal: 1, large: 1.2 };
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24 };
export const radius = { sm: 12, md: 16, lg: 20 };

export const makeUi = (C: AppTheme, k: number) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'transparent' },
  pad: { padding: spacing.md, paddingBottom: 40 },
  h1: { fontSize: Math.round(24 * k), fontWeight: '800', color: C.dark },
  h2: { fontSize: Math.round(17 * k), fontWeight: '700', color: C.dark },
  muted: { color: C.muted, fontSize: Math.round(13 * k) },
  card: { backgroundColor: C.card, borderRadius: radius.lg, padding: spacing.md, marginTop: 12, borderWidth: 1, borderColor: C.line },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  input: { backgroundColor: C.card, borderRadius: radius.sm, padding: 14, borderWidth: 1, borderColor: C.line, marginTop: 10, color: C.text, fontSize: Math.round(15 * k) },
});
