import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEMO_STUDENTS, avgAcc } from '../data/students';
import { Bar } from '../components/ProgressBar';
import { StudentRow } from '../components/StudentRow';
import { C, ui } from '../styles/theme';
import { TabScreenProps } from '../types';

export default function TeacherScreen({ navigation }: TabScreenProps<'Студенты'>) {
  const [q, setQ] = useState('');
  const list = DEMO_STUDENTS.map((s, i) => ({ s, i })).filter(({ s }) => s.name.toLowerCase().includes(q.toLowerCase()));
  const group = Math.round(DEMO_STUDENTS.reduce((a, s) => a + avgAcc(s.acc), 0) / DEMO_STUDENTS.length);
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <FlatList
        data={list}
        keyExtractor={({ s }) => s.name}
        contentContainerStyle={ui.pad}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={ui.h1}>Панель преподавателя</Text>
            <Text style={ui.muted}>Демонстрационные данные группы</Text>
            <View style={[ui.card, { backgroundColor: C.primary }]}>
              <Text style={{ color: '#DCFCE7' }}>Общая успеваемость</Text>
              <Text style={{ color: '#fff', fontSize: 38, fontWeight: '800' }}>{group}%</Text>
              <Bar value={group / 100} color="#fff" track="#ffffff55" />
            </View>
            <TextInput style={ui.input} placeholder="Поиск студента" value={q} onChangeText={setQ} />
          </View>
        }
        ListEmptyComponent={<Text style={[ui.muted, { marginTop: 12 }]}>Никого не найдено</Text>}
        renderItem={({ item: { s, i } }) => (
          <StudentRow name={s.name} group={s.group} err={s.err} sec={s.sec} acc={avgAcc(s.acc)} onPress={() => navigation.navigate('Student', { index: i })} />
        )}
      />
    </SafeAreaView>
  );
}
