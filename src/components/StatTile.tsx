import React from 'react';
import { Text, View } from 'react-native';
import { C, ui } from '../styles/theme';
import { I } from './Icons';

type Props = { icon: string; v: string; l: string };
export const StatTile = ({ icon, v, l }: Props) => (
  <View style={[ui.card, { width: '31%', alignItems: 'center', padding: 12 }]}><I n={icon} /><Text style={[ui.h2, { marginTop: 4 }]}>{v}</Text><Text style={{ fontSize: 11, color: C.muted }}>{l}</Text></View>
);
