import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { SUBJECTS } from '../data/subjects';
import { levelName, pct } from '../logic/adaptive';
import { Bar, Btn, I, IconBox } from '../components/ui';
import { C, ui } from '../styles/theme';

export default function TasksScreen({ navigation }: any) {
  const { progress, active, setActive } = useApp();
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <Text style={ui.h1}>Задания</Text>
        <Text style={ui.muted}>Выберите предмет. У каждого — свой прогресс и траектория.</Text>
        {SUBJECTS.map((s) => {
          const p = progress[s.id];
          const on = active === s.id;
          return (
            <View key={s.id} style={[ui.card, on && { borderWidth: 2, borderColor: C.primary }]}>
              <Pressable onPress={() => setActive(s.id)} style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
                <IconBox n={s.icon} color={s.color} />
                <View style={{ flex: 1 }}>
                  <Text style={ui.h2}>{s.title}</Text>
                  <Text style={ui.muted}>{p?.diagnosed ? `Уровень: ${levelName(p.ability)}` : 'Уровень не определён'}</Text>
                </View>
                {on && <I n="checkmark-circle" s={26} />}
              </Pressable>
              <Bar value={p?.diagnosed ? pct(p.ability) : 0} color={s.color} />
              {p?.diagnosed ? (
                <>
                  <Btn icon="create" title="Практика" onPress={() => { setActive(s.id); navigation.navigate('Quiz', { subject: s.id, mode: 'practice' }); }} />
                  <Btn ghost title="Диагностика заново" onPress={() => navigation.navigate('Quiz', { subject: s.id, mode: 'diagnostic' })} />
                </>
              ) : (
                <Btn icon="clipboard" title="Пройти диагностику" onPress={() => { setActive(s.id); navigation.navigate('Quiz', { subject: s.id, mode: 'diagnostic' }); }} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
