import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { AppProvider } from './src/store/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import { gradient } from './src/styles/theme';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <LinearGradient colors={gradient} style={{ flex: 1 }}>
        <View pointerEvents="none" style={{ position: 'absolute', top: -90, right: -70, width: 280, height: 280, borderRadius: 140, backgroundColor: '#22C55E22' }} />
        <View pointerEvents="none" style={{ position: 'absolute', bottom: -110, left: -90, width: 320, height: 320, borderRadius: 160, backgroundColor: '#16A34A1A' }} />
        <RootNavigator />
      </LinearGradient>
    </AppProvider>
  );
}
