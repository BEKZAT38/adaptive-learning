import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../styles/theme';

export const I = ({ n, s = 22, c = C.primary }: { n: any; s?: number; c?: string }) => <Ionicons name={n} size={s} color={c} />;
export const Btn = ({ title, onPress, ghost, disabled, icon }: { title: string; onPress: () => void; ghost?: boolean; disabled?: boolean; icon?: string }) => (
  <Pressable onPress={onPress} disabled={disabled} style={[s.btn, ghost && s.ghost, disabled && { opacity: 0.5 }]}>
    {icon && <I n={icon} s={18} c={ghost ? C.primary : '#fff'} />}
    <Text style={[s.bt, ghost && { color: C.primary }]}>{title}</Text>
  </Pressable>
);
export const Bar = ({ value, color = C.primary, track = C.line }: { value: number; color?: string; track?: string }) => (
  <View style={[s.track, { backgroundColor: track }]}><View style={[s.fill, { width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, backgroundColor: color }]} /></View>
);
export const IconBox = ({ n, color = C.primary, size = 44 }: { n: any; color?: string; size?: number }) => (
  <View style={{ width: size, height: size, borderRadius: size / 3, backgroundColor: color + '22', alignItems: 'center', justifyContent: 'center' }}><I n={n} c={color} s={size / 2} /></View>
);
export const Badge = ({ icon, title, on }: { icon: string; title: string; on: boolean }) => (
  <View style={{ width: '31%', alignItems: 'center', marginTop: 12, opacity: on ? 1 : 0.35 }}>
    <IconBox n={on ? icon : 'lock-closed'} color={on ? '#D97706' : C.muted} size={52} />
    <Text style={{ fontSize: 11, color: C.dark, marginTop: 4, textAlign: 'center' }}>{title}</Text>
  </View>
);
export const Avatar = ({ name, size = 48 }: { name: string; size?: number }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#fff', fontWeight: '800', fontSize: size / 2.5 }}>{name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</Text>
  </View>
);
const s = StyleSheet.create({
  btn: { backgroundColor: C.primary, borderRadius: 14, padding: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 10 },
  ghost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: C.primary },
  bt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  track: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8 },
  fill: { height: 8, borderRadius: 4 },
});
