import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, FontScale, Lang, SCALE, Settings, ThemeMode, makeUi, themes } from '../theme/themes';
import { translate } from '../i18n';
import { levelName } from '../logic/adaptive';

type Vars = Record<string, string | number>;
type SettingsContextValue = Settings & {
  ready: boolean;
  colors: AppTheme;
  ui: ReturnType<typeof makeUi>;
  fs: (size: number) => number;
  t: (key: string, vars?: Vars) => string;
  lvl: (ability: number) => string;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  setLang: (value: Lang) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = '@adaptive_learning_settings';
// При первом запуске берём системную тему устройства
const initialSettings = (): Settings => ({ theme: Appearance.getColorScheme() === 'light' ? 'light' : 'dark', fontScale: 'normal', lang: 'ru' });

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => { if (saved) setSettings((cur) => ({ ...cur, ...JSON.parse(saved) })); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(() => {});
  }, [settings, ready]);

  const colors = themes[settings.theme];
  const k = SCALE[settings.fontScale];
  const ui = useMemo(() => makeUi(colors, k), [colors, k]);
  const t = (key: string, vars?: Vars) => translate(settings.lang, key, vars);

  const value: SettingsContextValue = {
    ...settings, ready, colors, ui, t,
    fs: (size) => Math.round(size * k),
    lvl: (ability) => t(levelName(ability)),
    setTheme: (theme) => setSettings((cur) => ({ ...cur, theme })),
    setFontScale: (fontScale) => setSettings((cur) => ({ ...cur, fontScale })),
    setLang: (lang) => setSettings((cur) => ({ ...cur, lang })),
    resetSettings: () => setSettings(initialSettings()),
  };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be inside SettingsProvider');
  return value;
}
