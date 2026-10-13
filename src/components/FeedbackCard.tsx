import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { Btn } from './Button';
import { I } from './Icons';

type Props = { good: boolean; right: string; hint: string; sec: number; last: boolean; onNext: () => void };
export function FeedbackCard({ good, right, hint, sec, last, onNext }: Props) {
  const { colors: C, ui, t } = useSettings();
  return (
    <View style={[ui.card, { borderLeftWidth: 5, borderLeftColor: good ? C.ok : C.bad }]}>
      <View style={[ui.row, { justifyContent: 'flex-start', gap: 8 }]}>
        <I n={good ? 'checkmark-circle' : 'close-circle'} c={good ? C.ok : C.bad} />
        <Text style={ui.h2}>{good ? t('Верно!') : t('Неверно')}</Text>
      </View>
      {!good && <Text style={{ marginTop: 6, color: C.text }}>{t('Правильный ответ: {right}', { right })}</Text>}
      <Text style={[ui.muted, { marginTop: 6 }]}>{t('Разбор: {hint}', { hint })}</Text>
      <Text style={[ui.muted, { marginTop: 4 }]}>{t('Время: {sec} с', { sec })}{!good ? ` • ${t('тема попадёт в повторение')}` : ''}</Text>
      <Btn title={last ? t('Завершить') : t('Далее')} onPress={onNext} />
    </View>
  );
}
