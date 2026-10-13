import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { QUESTIONS } from '../data/questions';
import { subjectOf } from '../data/subjects';
import { levelOf } from '../logic/adaptive';
import { Btn } from '../components/Button';
import { TopicRow } from '../components/TopicRow';
import { TabScreenProps } from '../types';

type Item = { title: string; level: number; mastery: number; locked: boolean; done: boolean };

export default function PathScreen({ navigation }: TabScreenProps<'Траектория'>) {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { progress, active } = useApp();
  const p = progress[active];
  const sub = subjectOf(active);
  const qs = QUESTIONS.filter((q) => q.subject === active).sort((a, b) => a.level - b.level);
  const items: Item[] = Array.from(new Set(qs.map((q) => q.topic))).map((title) => {
    const level = Math.min(...qs.filter((q) => q.topic === title).map((q) => q.level));
    const ts = p?.topics[title];
    const mastery = ts ? ts[0] / ts[1] : 0;
    return { title, level, mastery, locked: !p?.diagnosed || level > levelOf(p.ability), done: !!ts && mastery >= 0.7 };
  });
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <FlatList
        data={items}
        keyExtractor={(t) => t.title}
        contentContainerStyle={ui.pad}
        ListHeaderComponent={
          <View>
            <Text style={ui.h1}>{t('Траектория: {sub}', { sub: t(sub.title) })}</Text>
            <Text style={ui.muted}>{t('Темы открываются по мере роста вашего уровня')}</Text>
            {!p?.diagnosed && (
              <View style={ui.card}>
                <Text style={ui.h2}>{t('Сначала диагностика')}</Text>
                <Text style={ui.muted}>{t('Она определит стартовый уровень и откроет темы.')}</Text>
                <Btn title={t('Пройти диагностику')} onPress={() => navigation.navigate('Quiz', { subject: active, mode: 'diagnostic' })} />
              </View>
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <TopicRow index={index} title={t(item.title)} level={item.level} mastery={item.mastery} locked={item.locked} done={item.done} color={sub.color}
            onPress={() => navigation.navigate('Quiz', { subject: active, mode: 'practice', topic: item.title })} />
        )}
      />
    </SafeAreaView>
  );
}
