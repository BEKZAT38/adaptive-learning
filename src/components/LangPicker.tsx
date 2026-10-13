import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Lang } from '../theme/themes';
import { OptionChips } from './OptionChips';

export function LangPicker() {
  const { lang, setLang } = useSettings();
  return (
    <OptionChips value={lang} onChange={(v) => setLang(v as Lang)}
      options={[{ value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }, { value: 'kk', label: 'Қазақша' }]} />
  );
}
