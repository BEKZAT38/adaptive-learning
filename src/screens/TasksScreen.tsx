import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { SUBJECTS } from '../data/subjects';
import { SubjectCard } from '../components/SubjectCard';
import { Mode, TabScreenProps } from '../types';

export default function TasksScreen({ navigation }: TabScreenProps<'Задания'>) {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { progress, active, setActive } = useApp();
  const open = (id: string, mode: Mode) => { setActive(id); navigation.navigate('Quiz', { subject: id, mode }); };
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <FlatList
        data={SUBJECTS}
        keyExtractor={(s) => s.id}
        contentContainerStyle={ui.pad}
        ListHeaderComponent={<><Text style={ui.h1}>{t('Задания')}</Text><Text style={ui.muted}>{t('Выберите предмет. У каждого — свой прогресс и траектория.')}</Text></>}
        renderItem={({ item }) => (
          <SubjectCard subject={item} progress={progress[item.id]} active={active === item.id}
            onSelect={() => setActive(item.id)} onPractice={() => open(item.id, 'practice')} onDiagnostic={() => open(item.id, 'diagnostic')} />
        )}
      />
    </SafeAreaView>
  );
}
