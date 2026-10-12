import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEMO_STUDENTS, SUBJECTS } from '../data/subjects';
import { Avatar, Bar, I } from '../components/ui';
import { C, ui } from '../styles/theme';

export const avgAcc = (a: Record<string, number>) => Math.round(Object.values(a).reduce((x, y) => x + y, 0) / Object.values(a).length);

export default function TeacherScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const list = DEMO_STUDENTS.map((s, i) => ({ s, i })).filter(({ s }) => s.name.toLowerCase().includes(q.toLowerCase()));
  const group = Math.round(DEMO_STUDENTS.reduce((a, s) => a + avgAcc(s.acc), 0) / DEMO_STUDENTS.length);
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad} keyboardShouldPersistTaps="handled">
        <Text style={ui.h1}>Панель преподавателя</Text>
        <Text style={ui.muted}>Демонстрационные данные группы</Text>
        <View style={[ui.card, { backgroundColor: C.primary }]}>
          <Text style={{ color: '#DCFCE7' }}>Общая успеваемость</Text>
          <Text style={{ color: '#fff', fontSize: 38, fontWeight: '800' }}>{group}%</Text>
          <Bar value={group / 100} color="#fff" track="#ffffff55" />
        </View>
        <TextInput style={ui.input} placeholder="Поиск студента" value={q} onChangeText={setQ} />
        {list.map(({ s, i }) => {
          const a = avgAcc(s.acc);
          return (
            <Pressable key={s.name} onPress={() => navigation.navigate('Student', { index: i })} style={[ui.card, ui.row, { gap: 12 }]}>
              <Avatar name={s.name} size={44} />
              <View style={{ flex: 1 }}>
                <Text style={ui.h2}>{s.name}</Text>
                <Text style={ui.muted}>{s.group} • ошибок: {s.err} • {s.sec} с/ответ</Text>
                <Bar value={a / 100} color={a < 50 ? C.bad : C.primary} />
              </View>
              <Text style={{ fontWeight: '800', color: a < 50 ? C.bad : C.primary }}>{a}%</Text>
              <I n="chevron-forward" c={C.muted} s={18} />
            </Pressable>
          );
        })}
        {list.length === 0 && <Text style={[ui.muted, { marginTop: 12 }]}>Никого не найдено</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
