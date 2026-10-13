import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { radius } from '../theme/themes';

type Props = { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void };
export function OptionChips({ options, value, onChange }: Props) {
  const { colors: C, fs } = useSettings();
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable key={o.value} onPress={() => onChange(o.value)} style={{ flex: 1, padding: 12, borderRadius: radius.sm, alignItems: 'center', borderWidth: 1.5, borderColor: on ? C.primary : C.line, backgroundColor: on ? C.soft : 'transparent' }}>
            <Text style={{ fontWeight: '700', fontSize: fs(15), color: on ? C.primary : C.muted }}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
