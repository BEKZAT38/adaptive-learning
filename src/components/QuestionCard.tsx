import React from 'react';
import { Text, View } from 'react-native';
import { ui } from '../styles/theme';

type Props = { topic: string; text: string };
export const QuestionCard = ({ topic, text }: Props) => (
  <View style={ui.card}>
    <Text style={[ui.muted, { marginBottom: 6 }]}>{topic}</Text>
    <Text style={[ui.h2, { fontSize: 20 }]}>{text}</Text>
  </View>
);
