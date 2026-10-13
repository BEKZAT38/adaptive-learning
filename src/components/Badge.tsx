import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { IconBox } from './Icons';

type Props = { icon: string; title: string; on: boolean };
export function Badge({ icon, title, on }: Props) {
  const { colors: C, t, fs } = useSettings();
  return (
    <View style={{ width: '31%', alignItems: 'center', marginTop: 12, opacity: on ? 1 : 0.35 }}>
      <IconBox n={on ? icon : 'lock-closed'} color={on ? '#D97706' : C.muted} size={52} />
      <Text style={{ fontSize: fs(11), color: C.dark, marginTop: 4, textAlign: 'center' }}>{t(title)}</Text>
    </View>
  );
}
