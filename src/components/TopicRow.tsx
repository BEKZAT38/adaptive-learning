import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Bar } from './ProgressBar';
import { I } from './Icons';
import { C, ui } from '../styles/theme';

type Props = { index: number; title: string; level: number; mastery: number; locked: boolean; done: boolean; color: string; onPress: () => void };
export function TopicRow({ index, title, level, mastery, locked, done, color, onPress }: Props) {
  return (
    <Pressable disabled={locked} onPress={onPress} style={[ui.card, { opacity: locked ? 0.5 : 1 }]}>
      <View style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
        <I n={locked ? 'lock-closed' : done ? 'checkmark-circle' : 'play-circle'} s={30} c={done ? C.ok : locked ? C.muted : color} />
        <View style={{ flex: 1 }}>
          <Text style={ui.h2}>{index + 1}. {title}</Text>
          <Text style={ui.muted}>Сложность: {'●'.repeat(level)}{'○'.repeat(3 - level)} • освоено {Math.round(mastery * 100)}%</Text>
        </View>
      </View>
      <Bar value={mastery} color={color} />
    </Pressable>
  );
}
