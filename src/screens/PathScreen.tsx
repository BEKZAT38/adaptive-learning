import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { QUESTIONS } from '../data/questions';
import { subjectOf } from '../data/subjects';
import { levelOf } from '../logic/adaptive';
import { Bar, Btn, I } from '../components/ui';
import { C, ui } from '../styles/theme';

export default function PathScreen({ navigation }: any) {
  const { progress, active } = useApp();
  const p = progress[active];
  const sub = subjectOf(active);
  const qs = QUESTIONS.filter((q) => q.subject === active).sort((a, b) => a.level - b.level);
  const topics = Array.from(new Set(qs.map((q) => q.topic)));
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <Text style={ui.h1}>Траектория: {sub.title}</Text>
        <Text style={ui.muted}>Темы открываются по мере роста вашего уровня</Text>
        {!p?.diagnosed && (
          <View style={ui.card}>
            <Text style={ui.h2}>Сначала диагностика</Text>
            <Text style={ui.muted}>Она определит стартовый уровень и откроет темы.</Text>
            <Btn title="Пройти диагностику" onPress={() => navigation.navigate('Quiz', { subject: active, mode: 'diagnostic' })} />
          </View>
        )}
        {topics.map((t, i) => {
          const lvl = Math.min(...qs.filter((q) => q.topic === t).map((q) => q.level));
          const ts = p?.topics[t];
          const mastery = ts ? ts[0] / ts[1] : 0;
          const locked = !p?.diagnosed || lvl > levelOf(p.ability);
          const done = !!ts && mastery >= 0.7;
          return (
            <Pressable key={t} disabled={locked} onPress={() => navigation.navigate('Quiz', { subject: active, mode: 'practice', topic: t })} style={[ui.card, { opacity: locked ? 0.5 : 1 }]}>
              <View style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
                <I n={locked ? 'lock-closed' : done ? 'checkmark-circle' : 'play-circle'} s={30} c={done ? C.ok : locked ? C.muted : sub.color} />
                <View style={{ flex: 1 }}>
                  <Text style={ui.h2}>{i + 1}. {t}</Text>
                  <Text style={ui.muted}>Сложность: {'●'.repeat(lvl)}{'○'.repeat(3 - lvl)} • освоено {Math.round(mastery * 100)}%</Text>
                </View>
              </View>
              <Bar value={mastery} color={sub.color} />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
