import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../styles/theme';

export const I = ({ n, s = 22, c = C.primary }: { n: any; s?: number; c?: string }) => <Ionicons name={n} size={s} color={c} />;
export const IconBox = ({ n, color = C.primary, size = 44 }: { n: any; color?: string; size?: number }) => (
  <View style={{ width: size, height: size, borderRadius: size / 3, backgroundColor: color + '22', alignItems: 'center', justifyContent: 'center' }}><I n={n} c={color} s={size / 2} /></View>
);
