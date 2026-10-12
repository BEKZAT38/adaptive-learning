import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { C } from '../styles/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { useApp } from '../store/AppContext';
import AuthScreen from '../screens/AuthScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import StudentScreen from '../screens/StudentScreen';
import MainTabs from './MainTabs';

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: 'transparent', card: C.bg, text: C.text, border: C.line, primary: C.primary } };
const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  const { user, ready } = useApp();
  if (!ready) return null;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={MainTabs} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: true, title: 'Задание' }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: true, title: 'Результат', headerBackVisible: false }} />
            <Stack.Screen name="Student" component={StudentScreen} options={{ headerShown: true, title: 'Студент' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
