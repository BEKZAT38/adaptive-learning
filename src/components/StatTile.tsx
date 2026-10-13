import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { I } from './Icons';

type Props = { icon: string; v: string; l: string };
export function StatTile({ icon, v, l }: Props) {
  const { colors: C, ui, fs } = useSettings();
  return (
    <View style={[ui.card, { width: '31%', alignItems: 'center', padding: 12 }]}><I n={icon} /><Text style={[ui.h2, { marginTop: 4 }]}>{v}</Text><Text style={{ fontSize: fs(11), color: C.muted }}>{l}</Text></View>
  );
}
