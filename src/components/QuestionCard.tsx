import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = { topic: string; text: string };
export function QuestionCard({ topic, text }: Props) {
  const { ui, t, fs } = useSettings();
  return (
    <View style={ui.card}>
      <Text style={[ui.muted, { marginBottom: 6 }]}>{t(topic)}</Text>
      <Text style={[ui.h2, { fontSize: fs(20) }]}>{text}</Text>
    </View>
  );
}
