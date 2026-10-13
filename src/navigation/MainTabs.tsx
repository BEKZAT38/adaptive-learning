import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../store/AppContext';
import { useSettings } from '../context/SettingsContext';
import HomeScreen from '../screens/HomeScreen';
import PathScreen from '../screens/PathScreen';
import TasksScreen from '../screens/TasksScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TeacherScreen from '../screens/TeacherScreen';
import { TabParams } from '../types';

const Tab = createBottomTabNavigator<TabParams>();
const ic = (n: any) => ({ color, size }: { color: string; size: number }) => <Ionicons name={n} size={size} color={color} />;

export default function MainTabs() {
  const { user } = useApp();
  const { colors: C, t } = useSettings();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' }, tabBarStyle: { backgroundColor: C.bg, borderTopColor: C.line }, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.muted }}>
      {user?.role === 'teacher' ? (
        <Tab.Screen name="Студенты" component={TeacherScreen} options={{ title: t('Студенты'), tabBarIcon: ic('people') }} />
      ) : (
        <>
          <Tab.Screen name="Главная" component={HomeScreen} options={{ title: t('Главная'), tabBarIcon: ic('home') }} />
          <Tab.Screen name="Траектория" component={PathScreen} options={{ title: t('Траектория'), tabBarIcon: ic('map') }} />
          <Tab.Screen name="Задания" component={TasksScreen} options={{ title: t('Задания'), tabBarIcon: ic('book') }} />
          <Tab.Screen name="Прогресс" component={ProgressScreen} options={{ title: t('Прогресс'), tabBarIcon: ic('stats-chart') }} />
        </>
      )}
      <Tab.Screen name="Профиль" component={ProfileScreen} options={{ title: t('Профиль'), tabBarIcon: ic('person') }} />
    </Tab.Navigator>
  );
}
