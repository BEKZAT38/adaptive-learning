import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { DEMO_STUDENTS, SUBJECTS } from '../data/subjects';
import { levelName, pct } from '../logic/adaptive';
import { avgAcc } from './TeacherScreen';
import { Avatar, Bar, I } from '../components/ui';
import { C, ui } from '../styles/theme';

export default function StudentScreen({ route }: NativeStackScreenProps<RootStackParams, 'Student'>) {
  const s = DEMO_STUDENTS[route.params.index];
  const weak = [...SUBJECTS].sort((a, b) => s.acc[a.id] - s.acc[b.id])[0];
  return (
    <SafeAreaView style={ui.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <View style={{ alignItems: 'center' }}>
          <Avatar name={s.name} size={72} />
          <Text style={[ui.h1, { marginTop: 8 }]}>{s.name}</Text>
          <Text style={ui.muted}>{s.group} • успеваемость {avgAcc(s.acc)}% • ошибок {s.err} • {s.sec} с/ответ</Text>
        </View>
        {SUBJECTS.map((x) => (
          <View key={x.id} style={ui.card}>
            <View style={ui.row}>
              <View style={[ui.row, { gap: 8 }]}><I n={x.icon} c={x.color} /><Text style={ui.h2}>{x.title}</Text></View>
              <Text style={{ color: s.acc[x.id] < 50 ? C.bad : C.text }}>{levelName(s.ab[x.id])} • {s.acc[x.id]}%</Text>
            </View>
            <Bar value={pct(s.ab[x.id])} color={x.color} />
          </View>
        ))}
        <View style={[ui.card, { borderLeftWidth: 5, borderLeftColor: C.bad }]}>
          <Text style={ui.h2}>Рекомендация</Text>
          <Text style={[ui.muted, { marginTop: 4 }]}>Больше всего трудностей по предмету «{weak.title}» ({s.acc[weak.id]}%). Назначьте дополнительную практику по этой теме и разберите типичные ошибки.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
