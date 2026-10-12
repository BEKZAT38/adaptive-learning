import React, { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QUESTIONS } from '../data/questions';
import { emptyProgress, pickNext, updateAbility } from '../logic/adaptive';
import { useApp } from '../store/AppContext';
import { Bar, Btn, I } from '../components/ui';
import { C, ui } from '../styles/theme';
import { Q, RootStackParams, Session, SubjectProgress } from '../types';

type Props = NativeStackScreenProps<RootStackParams, 'Quiz'>;
const norm = (s: string) => s.toLowerCase().replace(/;/g, '').replace(/\s+/g, ' ').trim();

export default function QuizScreen({ route, navigation }: Props) {
  const { subject, mode, topic } = route.params;
  const { progress, finish } = useApp();
  const base = progress[subject] ?? emptyProgress();
  const pool = useMemo(() => QUESTIONS.filter((x) => x.subject === subject && (!topic || x.topic === topic)), [subject, topic]);
  const total = topic ? pool.length : Math.min(pool.length, mode === 'diagnostic' ? 6 : 5);
  const start: SubjectProgress = { ...base, ability: mode === 'diagnostic' ? 2 : base.ability, errors: { ...base.errors }, topics: { ...base.topics } };

  const [p, setP] = useState(start);
  const [q, setQ] = useState<Q>(() => pickNext(pool, start, [], start.ability));
  const [used, setUsed] = useState<string[]>([]);
  const [res, setRes] = useState<{ good: boolean; sel: number; sec: number } | null>(null);
  const [text, setText] = useState('');
  const [hint, setHint] = useState(false);
  const [ok, setOk] = useState(0);
  const [secs, setSecs] = useState(0);
  const t0 = useRef(Date.now());

  const submit = (good: boolean, sel: number) => {
    if (res) return;
    const sec = Math.round((Date.now() - t0.current) / 1000);
    setRes({ good, sel, sec });
    setOk((o) => o + (good ? 1 : 0));
    setSecs((s) => s + sec);
    setUsed((u) => [...u, q.id]);
    setP((prev) => {
      const t = prev.topics[q.topic] ?? [0, 0];
      return {
        ...prev,
        ability: updateAbility(prev.ability, q.level, good, sec, hint),
        errors: good ? prev.errors : { ...prev.errors, [q.topic]: (prev.errors[q.topic] || 0) + 1 },
        topics: { ...prev.topics, [q.topic]: [t[0] + (good ? 1 : 0), t[1] + 1] },
      };
    });
  };

  const n = used.length;
  const next = () => {
    if (n >= total) {
      const s: Session = { subject, mode, date: new Date().toISOString(), correct: ok, total: n, avgSec: Math.round(secs / n), sec: secs, ability: p.ability };
      finish(s, { ...p, diagnosed: true, seen: Array.from(new Set([...base.seen, ...used])), correct: base.correct + ok, total: base.total + n });
      navigation.replace('Result', { session: s });
      return;
    }
    setQ(pickNext(pool, p, used, p.ability));
    setRes(null); setText(''); setHint(false);
    t0.current = Date.now();
  };

  const isInput = !!q.accept;
  const right = isInput ? q.accept![0] : q.options[q.answer];
  return (
    <SafeAreaView style={ui.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={ui.pad} keyboardShouldPersistTaps="handled">
        <View style={ui.row}>
          <Text style={ui.muted}>{topic ? topic : mode === 'diagnostic' ? 'Диагностика' : 'Практика'} • {Math.min(n + (res ? 0 : 1), total)}/{total}</Text>
          <Text style={ui.muted}>Сложность: {'●'.repeat(q.level)}{'○'.repeat(3 - q.level)}</Text>
        </View>
        <Bar value={n / total} />
        <View style={ui.card}>
          <Text style={[ui.muted, { marginBottom: 6 }]}>{q.topic}</Text>
          <Text style={[ui.h2, { fontSize: 20 }]}>{q.text}</Text>
        </View>
        {isInput ? (
          <>
            <TextInput style={[ui.input, { fontFamily: 'monospace' }]} placeholder="Ваш ответ" autoCapitalize="none" autoCorrect={false} editable={!res} value={text} onChangeText={setText} />
            {!res && <Btn icon="checkmark" title="Проверить" disabled={!text.trim()} onPress={() => submit(q.accept!.some((a) => norm(a) === norm(text)), -1)} />}
          </>
        ) : (
          q.options.map((o, i) => {
            const color = !res ? C.line : i === q.answer ? C.ok : i === res.sel ? C.bad : C.line;
            return (
              <Pressable key={i} onPress={() => submit(i === q.answer, i)} style={[ui.card, { marginTop: 10, borderWidth: 2, borderColor: color }]}>
                <Text style={{ fontSize: 16, color: C.text }}>{o}</Text>
              </Pressable>
            );
          })
        )}
        {!res && !hint && <Btn ghost icon="bulb" title="Подсказка" onPress={() => setHint(true)} />}
        {hint && !res && <Text style={{ marginTop: 12, color: C.muted }}>Подсказка: {q.hint}</Text>}
        {res && (
          <View style={[ui.card, { borderLeftWidth: 5, borderLeftColor: res.good ? C.ok : C.bad }]}>
            <View style={[ui.row, { justifyContent: 'flex-start', gap: 8 }]}>
              <I n={res.good ? 'checkmark-circle' : 'close-circle'} c={res.good ? C.ok : C.bad} />
              <Text style={ui.h2}>{res.good ? 'Верно!' : 'Неверно'}</Text>
            </View>
            {!res.good && <Text style={{ marginTop: 6, color: C.text }}>Правильный ответ: {right}</Text>}
            <Text style={[ui.muted, { marginTop: 6 }]}>Разбор: {q.hint}</Text>
            <Text style={[ui.muted, { marginTop: 4 }]}>Время: {res.sec} с{!res.good ? ' • тема попадёт в повторение' : ''}</Text>
            <Btn title={n >= total ? 'Завершить' : 'Далее'} onPress={next} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
