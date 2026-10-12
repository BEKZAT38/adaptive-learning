import React from 'react';
import { Text, View } from 'react-native';
import { C } from '../styles/theme';

type Props = { name: string; size?: number };
export const Avatar = ({ name, size = 48 }: Props) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: C.bg, fontWeight: '800', fontSize: size / 2.5 }}>{name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</Text>
  </View>
);
