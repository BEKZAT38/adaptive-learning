import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Subject, SubjectProgress } from '../types';
import { levelName, pct } from '../logic/adaptive';
import { Bar } from './ProgressBar';
import { Btn } from './Button';
import { I, IconBox } from './Icons';
import { C, ui } from '../styles/theme';

type Props = { subject: Subject; progress?: SubjectProgress; active: boolean; onSelect: () => void; onPractice: () => void; onDiagnostic: () => void };
export function SubjectCard({ subject: s, progress: p, active, onSelect, onPractice, onDiagnostic }: Props) {
  return (
    <View style={[ui.card, active && { borderWidth: 2, borderColor: C.primary }]}>
      <Pressable onPress={onSelect} style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
        <IconBox n={s.icon} color={s.color} />
        <View style={{ flex: 1 }}>
          <Text style={ui.h2}>{s.title}</Text>
          <Text style={ui.muted}>{p?.diagnosed ? `Уровень: ${levelName(p.ability)}` : 'Уровень не определён'}</Text>
        </View>
        {active && <I n="checkmark-circle" s={26} />}
      </Pressable>
      <Bar value={p?.diagnosed ? pct(p.ability) : 0} color={s.color} />
      {p?.diagnosed ? (
        <>
          <Btn icon="create" title="Практика" onPress={onPractice} />
          <Btn ghost title="Диагностика заново" onPress={onDiagnostic} />
        </>
      ) : (
        <Btn icon="clipboard" title="Пройти диагностику" onPress={onDiagnostic} />
      )}
    </View>
  );
}
