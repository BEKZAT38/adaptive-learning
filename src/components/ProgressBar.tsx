import React from 'react';
import { StyleSheet, View } from 'react-native';
import { C } from '../styles/theme';

type Props = { value: number; color?: string; track?: string };
export const Bar = ({ value, color = C.primary, track = C.line }: Props) => (
  <View style={[s.track, { backgroundColor: track }]}><View style={[s.fill, { width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, backgroundColor: color }]} /></View>
);
const s = StyleSheet.create({
  track: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8 },
  fill: { height: 8, borderRadius: 4 },
});
