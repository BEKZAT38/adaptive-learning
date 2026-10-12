import { StyleSheet } from 'react-native';
// Тёмно-зелёная тема: меняя значения здесь, меняется всё приложение
export const C = { bg: '#052E1B', card: 'rgba(16, 64, 44, 0.92)', primary: '#22C55E', dark: '#ECFDF5', text: '#ECFDF5', muted: '#8FB9A3', soft: '#14532D', line: '#1F6A47', ok: '#4ADE80', bad: '#F87171' };
export const gradient = ['#031A10', '#0A3D27', '#0F5A38'] as const; // фон приложения
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24 };
export const radius = { sm: 12, md: 16, lg: 20 };
export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'transparent' },
  pad: { padding: spacing.md, paddingBottom: 40 },
  h1: { fontSize: 24, fontWeight: '800', color: C.dark },
  h2: { fontSize: 17, fontWeight: '700', color: C.dark },
  muted: { color: C.muted, fontSize: 13 },
  card: { backgroundColor: C.card, borderRadius: radius.lg, padding: spacing.md, marginTop: 12, borderWidth: 1, borderColor: C.line },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  input: { backgroundColor: C.card, borderRadius: radius.sm, padding: 14, borderWidth: 1, borderColor: C.line, marginTop: 10, color: C.text },
});
