import React from 'react';
import { Text, View } from 'react-native';
import { Btn } from './Button';
import { I } from './Icons';
import { C, ui } from '../styles/theme';

type Props = { good: boolean; right: string; hint: string; sec: number; last: boolean; onNext: () => void };
export function FeedbackCard({ good, right, hint, sec, last, onNext }: Props) {
  return (
    <View style={[ui.card, { borderLeftWidth: 5, borderLeftColor: good ? C.ok : C.bad }]}>
      <View style={[ui.row, { justifyContent: 'flex-start', gap: 8 }]}>
        <I n={good ? 'checkmark-circle' : 'close-circle'} c={good ? C.ok : C.bad} />
        <Text style={ui.h2}>{good ? 'Верно!' : 'Неверно'}</Text>
      </View>
      {!good && <Text style={{ marginTop: 6, color: C.text }}>Правильный ответ: {right}</Text>}
      <Text style={[ui.muted, { marginTop: 6 }]}>Разбор: {hint}</Text>
      <Text style={[ui.muted, { marginTop: 4 }]}>Время: {sec} с{!good ? ' • тема попадёт в повторение' : ''}</Text>
      <Btn title={last ? 'Завершить' : 'Далее'} onPress={onNext} />
    </View>
  );
}
