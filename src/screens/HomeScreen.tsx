import React from 'react';
import { TabScreenProps } from '../types';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { subjectOf } from '../data/subjects';
import { levelName, weakTopic } from '../logic/adaptive';
import { ACH, stats } from '../logic/stats';
import { Avatar, Bar, Badge, Btn, IconBox } from '../components/ui';
import { C, ui } from '../styles/theme';

export default function HomeScreen({ navigation }: TabScreenProps<'Главная'>) {
  const { user, progress, sessions, active } = useApp();
  const st = stats(progress, sessions);
  const p = progress[active];
  const sub = subjectOf(active);
  const weak = weakTopic(p);
  const go = () => navigation.navigate('Quiz', { subject: active, mode: p?.diagnosed ? 'practice' : 'diagnostic' });
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <View style={[ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
          <Avatar name={user!.name} />
          <View><Text style={ui.h1}>Привет, {user!.name.split(' ')[0]}!</Text><Text style={ui.muted}>Сегодня отличный день для практики</Text></View>
        </View>
        <View style={[ui.card, { backgroundColor: '#15803D' }]}>
          <Text style={{ color: '#DCFCE7' }}>Мой прогресс</Text>
          <Text style={{ color: '#fff', fontSize: 40, fontWeight: '800' }}>{st.overall}%</Text>
          <Bar value={st.overall / 100} color="#fff" track="#ffffff55" />
          <Text style={{ color: '#fff', marginTop: 10 }}>{sub.title} • уровень: {p?.diagnosed ? levelName(p.ability).toLowerCase() : 'не определён'}</Text>
        </View>
        <View style={ui.card}>
          <View style={ui.row}><Text style={ui.h2}>Цель на сегодня</Text><Text style={ui.muted}>{Math.min(st.today, 5)} / 5 заданий</Text></View>
          <Bar value={st.today / 5} />
        </View>
        <Btn icon="play" title="Продолжить обучение" onPress={go} />
        <View style={[ui.card, ui.row, { justifyContent: 'flex-start', gap: 12 }]}>
          <IconBox n="bulb" color="#D97706" />
          <View style={{ flex: 1 }}>
            <Text style={ui.h2}>Следующее задание</Text>
            <Text style={ui.muted}>{p?.diagnosed ? (weak ? `Повторение темы: ${weak}` : 'Практика по вашему уровню') : 'Диагностика: определим ваш уровень'}</Text>
          </View>
        </View>
        <Text style={[ui.h2, { marginTop: 20 }]}>Последние достижения</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {ACH.slice(0, 3).map((a) => <Badge key={a.id} icon={a.icon} title={a.title} on={a.ok(st, progress)} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
