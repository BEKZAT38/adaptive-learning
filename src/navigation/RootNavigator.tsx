import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { useApp } from '../store/AppContext';
import { useSettings } from '../context/SettingsContext';
import AuthScreen from '../screens/AuthScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import StudentScreen from '../screens/StudentScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const { user, ready } = useApp();
  const { colors: C, theme, t } = useSettings();
  if (!ready) return null;
  const base = theme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: 'transparent', card: C.bg, text: C.text, border: C.line, primary: C.primary } };
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={MainTabs} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: true, title: t('Задание') }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: true, title: t('Результат'), headerBackVisible: false }} />
            <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: true, title: t('Студент') }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: t('Настройки') }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
