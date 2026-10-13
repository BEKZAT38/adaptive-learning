import React from 'react';
import { Pressable, Text } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = { options: string[]; answer: number; selected: number | null; onSelect: (i: number) => void };
export function AnswerOptions({ options, answer, selected, onSelect }: Props) {
  const { colors: C, ui, fs } = useSettings();
  return (
    <>
      {options.map((o, i) => {
        const color = selected === null ? C.line : i === answer ? C.ok : i === selected ? C.bad : C.line;
        return (
          <Pressable key={i} onPress={() => onSelect(i)} style={[ui.card, { marginTop: 10, borderWidth: 2, borderColor: color }]}>
            <Text style={{ fontSize: fs(16), color: C.text }}>{o}</Text>
          </Pressable>
        );
      })}
    </>
  );
}
