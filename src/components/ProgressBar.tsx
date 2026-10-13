import React from 'react';
import { View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = { value: number; color?: string; track?: string };
export function Bar({ value, color, track }: Props) {
  const { colors: C } = useSettings();
  return (
    <View style={{ height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8, backgroundColor: track ?? C.line }}>
      <View style={{ height: 8, borderRadius: 4, width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, backgroundColor: color ?? C.primary }} />
    </View>
  );
}
