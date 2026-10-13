import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Subject, SubjectProgress } from '../types';
import { pct } from '../logic/adaptive';
import { useSettings } from '../context/SettingsContext';
import { Bar } from './ProgressBar';
import { Btn } from './Button';
import { I, IconBox } from './Icons';

type Props = { subject: Subject; progress?: SubjectProgress; active: boolean; onSelect: () => void; onPractice: () => void; onDiagnostic: () => void };
export function SubjectCard({ subject: s, progress: p, active, onSelect, onPractice, onDiagnostic }: Props) {
  const { colors: C, ui, t, lvl } = useSettings();
  return (
    <View style={[ui.card, active && { borderWidth: 2, borderColor: C.primary }]}>
      <Pressable onPress={onSelect} style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
        <IconBox n={s.icon} color={s.color} />
        <View style={{ flex: 1 }}>
          <Text style={ui.h2}>{t(s.title)}</Text>
          <Text style={ui.muted}>{p?.diagnosed ? `${t('Уровень')}: ${lvl(p.ability)}` : t('Уровень не определён')}</Text>
        </View>
        {active && <I n="checkmark-circle" s={26} />}
      </Pressable>
      <Bar value={p?.diagnosed ? pct(p.ability) : 0} color={s.color} />
      {p?.diagnosed ? (
        <>
          <Btn icon="create" title={t('Практика')} onPress={onPractice} />
          <Btn ghost title={t('Диагностика заново')} onPress={onDiagnostic} />
        </>
      ) : (
        <Btn icon="clipboard" title={t('Пройти диагностику')} onPress={onDiagnostic} />
      )}
    </View>
  );
}
