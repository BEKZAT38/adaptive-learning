import React from 'react';
import { Text, View } from 'react-native';
import { C } from '../styles/theme';
import { IconBox } from './Icons';

type Props = { icon: string; title: string; on: boolean };
export const Badge = ({ icon, title, on }: Props) => (
  <View style={{ width: '31%', alignItems: 'center', marginTop: 12, opacity: on ? 1 : 0.35 }}>
    <IconBox n={on ? icon : 'lock-closed'} color={on ? '#D97706' : C.muted} size={52} />
    <Text style={{ fontSize: 11, color: C.dark, marginTop: 4, textAlign: 'center' }}>{title}</Text>
  </View>
);
