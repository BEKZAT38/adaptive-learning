import { StyleSheet } from 'react-native';
export const C = { bg: '#F3F8F4', card: '#FFFFFF', primary: '#16A34A', dark: '#14532D', text: '#14532D', muted: '#6B7F72', soft: '#DCFCE7', line: '#E3EDE6', ok: '#16A34A', bad: '#DC2626' };
export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  pad: { padding: 16, paddingBottom: 40 },
  h1: { fontSize: 24, fontWeight: '800', color: C.dark },
  h2: { fontSize: 17, fontWeight: '700', color: C.dark },
  muted: { color: C.muted, fontSize: 13 },
  card: { backgroundColor: C.card, borderRadius: 20, padding: 16, marginTop: 12, shadowColor: '#14532D', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  input: { backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.line, marginTop: 10, color: C.dark },
});
