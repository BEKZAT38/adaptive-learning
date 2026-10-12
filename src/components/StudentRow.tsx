import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Avatar } from './Avatar';
import { Bar } from './ProgressBar';
import { I } from './Icons';
import { C, ui } from '../styles/theme';

type Props = { name: string; group: string; err: number; sec: number; acc: number; onPress: () => void };
export function StudentRow({ name, group, err, sec, acc, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[ui.card, ui.row, { gap: 12 }]}>
      <Avatar name={name} size={44} />
      <View style={{ flex: 1 }}>
        <Text style={ui.h2}>{name}</Text>
        <Text style={ui.muted}>{group} • ошибок: {err} • {sec} с/ответ</Text>
        <Bar value={acc / 100} color={acc < 50 ? C.bad : C.primary} />
      </View>
      <Text style={{ fontWeight: '800', color: acc < 50 ? C.bad : C.primary }}>{acc}%</Text>
      <I n="chevron-forward" c={C.muted} s={18} />
    </Pressable>
  );
}
