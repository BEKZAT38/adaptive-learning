import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = { name: string; size?: number };
export function Avatar({ name, size = 48 }: Props) {
  const { colors: C } = useSettings();
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: C.onPrimary, fontWeight: '800', fontSize: size / 2.5 }}>{name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</Text>
    </View>
  );
}
