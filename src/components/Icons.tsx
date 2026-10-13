import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';

export function I({ n, s = 22, c }: { n: any; s?: number; c?: string }) {
  const { colors: C } = useSettings();
  return <Ionicons name={n} size={s} color={c ?? C.primary} />;
}
export function IconBox({ n, color, size = 44 }: { n: any; color?: string; size?: number }) {
  const { colors: C } = useSettings();
  const col = color ?? C.primary;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 3, backgroundColor: col + '22', alignItems: 'center', justifyContent: 'center' }}><I n={n} c={col} s={size / 2} /></View>
  );
}
