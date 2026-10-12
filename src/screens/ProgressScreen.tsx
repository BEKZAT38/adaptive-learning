import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { subjectOf } from '../data/subjects';
import { stats } from '../logic/stats';
import { Bar, I, IconBox } from '../components/ui';
import { C, ui } from '../styles/theme';

const Tile = ({ icon, v, l }: { icon: string; v: string; l: string }) => (
  <View style={[ui.card, { width: '31%', alignItems: 'center', padding: 12 }]}><I n={icon} /><Text style={[ui.h2, { marginTop: 4 }]}>{v}</Text><Text style={{ fontSize: 11, color: C.muted }}>{l}</Text></View>
);
export default function ProgressScreen() {
  const { progress, sessions } = useApp();
  const st = stats(progress, sessions);
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <Text style={ui.h1}>Мой прогресс</Text>
        <View style={ui.card}>
          <View style={ui.row}><Text style={ui.h2}>Общий прогресс</Text><Text style={[ui.h2, { color: C.primary }]}>{st.overall}%</Text></View>
          <Bar value={st.overall / 100} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tile icon="checkmark-done" v={`${st.tasks}`} l="заданий" />
          <Tile icon="locate" v={`${st.acc}%`} l="верных" />
          <Tile icon="time" v={`${Math.round(st.sec / 60)} мин`} l="обучения" />
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>Результаты по дням</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 110, marginTop: 12 }}>
            {st.week.map((d, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 18, height: Math.max(4, d.acc), borderRadius: 6, backgroundColor: d.t ? C.primary : C.line }} />
                <Text style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{d.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>Сильные и слабые темы</Text>
          <Text style={{ color: C.ok, marginTop: 8 }}>Сильные: {st.strong.join(', ') || '—'}</Text>
          <Text style={{ color: C.bad, marginTop: 4 }}>Слабые: {st.weak.join(', ') || '—'}</Text>
        </View>
        <Text style={[ui.h2, { marginTop: 20 }]}>История занятий</Text>
        {sessions.length === 0 && <Text style={[ui.muted, { marginTop: 8 }]}>Пока пусто — пройдите первый тест.</Text>}
        {sessions.slice(0, 10).map((s, i) => (
          <View key={i} style={[ui.card, ui.row, { padding: 12 }]}>
            <View style={[ui.row, { gap: 10 }]}><IconBox n={subjectOf(s.subject).icon} color={subjectOf(s.subject).color} size={36} /><Text style={ui.h2}>{subjectOf(s.subject).title}</Text></View>
            <Text style={ui.muted}>{s.correct}/{s.total} • {s.avgSec} с • {new Date(s.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
