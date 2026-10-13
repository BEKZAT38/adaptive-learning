import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';
import { AppProvider } from './src/store/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

// Splash показывается, пока загружаются сохранённые настройки
function Splash() {
  return (
    <View style={{ flex: 1, backgroundColor: '#052E1B', alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name="school" size={64} color="#22C55E" />
      <ActivityIndicator color="#22C55E" style={{ marginTop: 20 }} />
    </View>
  );
}

function Shell() {
  const { ready, theme, colors: C } = useSettings();
  if (!ready) return <Splash />;
  return (
    <AppProvider>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <LinearGradient colors={C.gradient} style={{ flex: 1 }}>
        <View pointerEvents="none" style={{ position: 'absolute', top: -90, right: -70, width: 280, height: 280, borderRadius: 140, backgroundColor: C.glow1 }} />
        <View pointerEvents="none" style={{ position: 'absolute', bottom: -110, left: -90, width: 320, height: 320, borderRadius: 160, backgroundColor: C.glow2 }} />
        <RootNavigator />
      </LinearGradient>
    </AppProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Shell />
    </SettingsProvider>
  );
}
