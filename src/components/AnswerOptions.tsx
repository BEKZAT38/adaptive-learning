import React from 'react';
import { Pressable, Text } from 'react-native';
import { C, ui } from '../styles/theme';

type Props = { options: string[]; answer: number; selected: number | null; onSelect: (i: number) => void };
export const AnswerOptions = ({ options, answer, selected, onSelect }: Props) => (
  <>
    {options.map((o, i) => {
      const color = selected === null ? C.line : i === answer ? C.ok : i === selected ? C.bad : C.line;
      return (
        <Pressable key={i} onPress={() => onSelect(i)} style={[ui.card, { marginTop: 10, borderWidth: 2, borderColor: color }]}>
          <Text style={{ fontSize: 16, color: C.text }}>{o}</Text>
        </Pressable>
      );
    })}
  </>
);
