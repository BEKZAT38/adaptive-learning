import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QUESTIONS } from '../data/questions';
import { emptyProgress, pickNext, updateAbility } from '../logic/adaptive';
import { useApp } from '../store/AppContext';
import { Bar, Btn } from '../components/ui';
import { QuestionCard } from '../components/QuestionCard';
import { AnswerOptions } from '../components/AnswerOptions';
import { FeedbackCard } from '../components/FeedbackCard';
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

  const accept = q.accept;
  return (
    <SafeAreaView style={ui.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={ui.pad} keyboardShouldPersistTaps="handled">
        <View style={ui.row}>
          <Text style={ui.muted}>{topic ? topic : mode === 'diagnostic' ? 'Диагностика' : 'Практика'} • {Math.min(n + (res ? 0 : 1), total)}/{total}</Text>
          <Text style={ui.muted}>Сложность: {'●'.repeat(q.level)}{'○'.repeat(3 - q.level)}</Text>
        </View>
        <Bar value={n / total} />
        <QuestionCard topic={q.topic} text={q.text} />
        {accept ? (
          <>
            <TextInput style={[ui.input, { fontFamily: 'monospace' }]} placeholder="Ваш ответ" autoCapitalize="none" autoCorrect={false} editable={!res} value={text} onChangeText={setText} />
            {!res && <Btn icon="checkmark" title="Проверить" disabled={!text.trim()} onPress={() => submit(accept.some((a) => norm(a) === norm(text)), -1)} />}
          </>
        ) : (
          <AnswerOptions options={q.options} answer={q.answer} selected={res ? res.sel : null} onSelect={(i) => submit(i === q.answer, i)} />
        )}
        {!res && !hint && <Btn ghost icon="bulb" title="Подсказка" onPress={() => setHint(true)} />}
        {hint && !res && <Text style={{ marginTop: 12, color: C.muted }}>Подсказка: {q.hint}</Text>}
        {res && <FeedbackCard good={res.good} right={accept ? accept[0] : q.options[q.answer]} hint={q.hint} sec={res.sec} last={n >= total} onNext={next} />}
      </ScrollView>
    </SafeAreaView>
  );
}
