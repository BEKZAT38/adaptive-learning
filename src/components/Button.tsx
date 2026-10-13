import React from 'react';
import { Pressable, Text } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { radius } from '../theme/themes';
import { I } from './Icons';

type Props = { title: string; onPress: () => void; ghost?: boolean; disabled?: boolean; icon?: string };
export function Btn({ title, onPress, ghost, disabled, icon }: Props) {
  const { colors: C, fs } = useSettings();
  return (
    <Pressable onPress={onPress} disabled={disabled}
      style={[{ backgroundColor: C.primary, borderRadius: radius.md, padding: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 10 }, ghost && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: C.primary }, disabled && { opacity: 0.5 }]}>
      {icon && <I n={icon} s={18} c={ghost ? C.primary : C.onPrimary} />}
      <Text style={{ color: ghost ? C.primary : C.onPrimary, fontWeight: '700', fontSize: fs(15) }}>{title}</Text>
    </Pressable>
  );
}
