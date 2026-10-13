import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { subjectOf } from '../data/subjects';
import { stats } from '../logic/stats';
import { Bar, IconBox, StatTile as Tile } from '../components/ui';

export default function ProgressScreen() {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { progress, sessions } = useApp();
  const st = stats(progress, sessions);
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <Text style={ui.h1}>{t('Мой прогресс')}</Text>
        <View style={ui.card}>
          <View style={ui.row}><Text style={ui.h2}>{t('Общий прогресс')}</Text><Text style={[ui.h2, { color: C.primary }]}>{st.overall}%</Text></View>
          <Bar value={st.overall / 100} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tile icon="checkmark-done" v={`${st.tasks}`} l={t('заданий')} />
          <Tile icon="locate" v={`${st.acc}%`} l={t('верных')} />
          <Tile icon="time" v={`${Math.round(st.sec / 60)} ${t('мин')}`} l={t('обучения')} />
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>{t('Результаты по дням')}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 110, marginTop: 12 }}>
            {st.week.map((d, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 18, height: Math.max(4, d.acc), borderRadius: 6, backgroundColor: d.t ? C.primary : C.line }} />
                <Text style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{t(d.label)}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>{t('Сильные и слабые темы')}</Text>
          <Text style={{ color: C.ok, marginTop: 8 }}>{t('Сильные')}: {st.strong.map((x) => t(x)).join(', ') || '—'}</Text>
          <Text style={{ color: C.bad, marginTop: 4 }}>{t('Слабые')}: {st.weak.map((x) => t(x)).join(', ') || '—'}</Text>
        </View>
        <Text style={[ui.h2, { marginTop: 20 }]}>{t('История занятий')}</Text>
        {sessions.length === 0 && <Text style={[ui.muted, { marginTop: 8 }]}>{t('Пока пусто — пройдите первый тест.')}</Text>}
        {sessions.slice(0, 10).map((s, i) => (
          <View key={i} style={[ui.card, ui.row, { padding: 12 }]}>
            <View style={[ui.row, { gap: 10 }]}><IconBox n={subjectOf(s.subject).icon} color={subjectOf(s.subject).color} size={36} /><Text style={ui.h2}>{t(subjectOf(s.subject).title)}</Text></View>
            <Text style={ui.muted}>{s.correct}/{s.total} • {s.avgSec} {t('с')} • {new Date(s.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
