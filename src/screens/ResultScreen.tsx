import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { subjectOf } from '../data/subjects';
import { levelName } from '../logic/adaptive';
import { useApp } from '../store/AppContext';
import { Btn, I } from '../components/ui';

export default function ResultScreen({ route, navigation }: NativeStackScreenProps<RootStackParams, 'Result'>) {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { session: s } = route.params;
  const { progress } = useApp();
  const tp = Object.entries(progress[s.subject]?.topics ?? {}).map(([k, [c, n]]) => ({ k, r: c / n }));
  const strong = tp.filter((x) => x.r >= 0.7).map((x) => t(x.k)).join(', ');
  const weak = tp.filter((x) => x.r < 0.5).map((x) => t(x.k)).join(', ');
  const ratio = s.correct / s.total;
  const advice = ratio >= 0.85 ? t('Отлично! Система предложит более сложные задания.') : ratio >= 0.5 ? t('Стабильный результат — продолжаем на этом уровне.') : t('Повторим тему и вернёмся к более простым задачам.');
  return (
    <SafeAreaView style={[ui.screen, { padding: 16 }]} edges={['bottom']}>
      <ScrollView>
        <View style={[ui.card, { alignItems: 'center' }]}>
          <I n={ratio >= 0.5 ? 'trophy' : 'refresh-circle'} s={48} c={ratio >= 0.5 ? '#D97706' : C.primary} />
          <Text style={ui.muted}>{t(subjectOf(s.subject).title)} • {s.mode === 'diagnostic' ? t('диагностика') : t('практика')}</Text>
          <Text style={{ fontSize: fs(44), fontWeight: '800', color: C.dark }}>{s.correct} {t('из')} {s.total}</Text>
          <Text style={ui.h2}>{t('Уровень')}: {lvl(s.ability)}</Text>
          <Text style={[ui.muted, { marginTop: 6 }]}>{t('Среднее время ответа')}: {s.avgSec} {t('с')}</Text>
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>{t('Рекомендация')}</Text>
          <Text style={[ui.muted, { marginTop: 4 }]}>{advice}</Text>
          {!!strong && <Text style={{ marginTop: 8, color: C.ok }}>{t('Сильные темы')}: {strong}</Text>}
          {!!weak && <Text style={{ marginTop: 4, color: C.bad }}>{t('Требует повторения')}: {weak}</Text>}
        </View>
        <Btn title={s.mode === 'diagnostic' ? t('Начать обучение') : t('Продолжить обучение')} onPress={() => navigation.replace('Tabs')} />
      </ScrollView>
    </SafeAreaView>
  );
}
