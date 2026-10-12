import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { C, radius } from '../styles/theme';
import { I } from './Icons';

type Props = { title: string; onPress: () => void; ghost?: boolean; disabled?: boolean; icon?: string };
export const Btn = ({ title, onPress, ghost, disabled, icon }: Props) => (
  <Pressable onPress={onPress} disabled={disabled} style={[s.btn, ghost && s.ghost, disabled && { opacity: 0.5 }]}>
    {icon && <I n={icon} s={18} c={ghost ? C.primary : C.bg} />}
    <Text style={[s.bt, ghost && { color: C.primary }]}>{title}</Text>
  </Pressable>
);
const s = StyleSheet.create({
  btn: { backgroundColor: C.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 10 },
  ghost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: C.primary },
  bt: { color: C.bg, fontWeight: '700', fontSize: 15 },
});
