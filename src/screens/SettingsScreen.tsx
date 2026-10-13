import React from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { Btn, LangPicker, OptionChips } from '../components/ui';
import { FontScale } from '../theme/themes';

export default function SettingsScreen() {
  const { colors: C, ui, t, theme, fontScale, setTheme, setFontScale, resetSettings } = useSettings();
  return (
    <SafeAreaView style={ui.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <View style={ui.card}>
          <View style={ui.row}>
            <Text style={ui.h2}>{t('Тёмная тема')}</Text>
            <Switch value={theme === 'dark'} onValueChange={(on) => setTheme(on ? 'dark' : 'light')} trackColor={{ true: C.primary, false: C.line }} thumbColor="#fff" />
          </View>
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>{t('Размер шрифта')}</Text>
          <OptionChips value={fontScale} onChange={(v) => setFontScale(v as FontScale)}
            options={[{ value: 'small', label: 'A−' }, { value: 'normal', label: 'A' }, { value: 'large', label: 'A+' }]} />
        </View>
        <View style={ui.card}>
          <Text style={ui.h2}>{t('Язык')}</Text>
          <LangPicker />
        </View>
        <View style={ui.card}>
          <Text style={ui.muted}>{t('Предпросмотр')}</Text>
          <Text style={ui.h2}>{t('Так будет выглядеть текст в приложении')}</Text>
        </View>
        <Btn ghost icon="refresh" title={t('Сбросить настройки')} onPress={resetSettings} />
      </ScrollView>
    </SafeAreaView>
  );
}
