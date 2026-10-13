import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { TabScreenProps } from '../types';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { levelName } from '../logic/adaptive';
import { ACH, stats } from '../logic/stats';
import { Avatar, Badge, Btn, I } from '../components/ui';

export default function ProfileScreen({ navigation }: TabScreenProps<'Профиль'>) {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { user, progress, sessions, logout, reset } = useApp();
  const st = stats(progress, sessions);
  const best = Math.max(0, ...Object.values(progress).filter((p) => p.diagnosed).map((p) => p.ability));
  const teacher = user?.role === 'teacher';
  return (
    <SafeAreaView style={ui.screen} edges={['top']}>
      <ScrollView contentContainerStyle={ui.pad}>
        <View style={{ alignItems: 'center' }}>
          <Avatar name={user!.name} size={80} />
          <Text style={[ui.h1, { marginTop: 10 }]}>{user!.name}</Text>
          <Text style={ui.muted}>{teacher ? t('Преподаватель') : `${t('Студент')} • ${best ? lvl(best) : t('уровень не определён')}`} • @{user!.login}</Text>
        </View>
        {!teacher && (
          <>
            <View style={[ui.card, ui.row]}>
              <View style={{ alignItems: 'center' }}><I n="flame" c="#D97706" /><Text style={ui.h2}>{st.streak}</Text><Text style={ui.muted}>{t('дней подряд')}</Text></View>
              <View style={{ alignItems: 'center' }}><I n="flash" /><Text style={ui.h2}>{st.avgSec} {t('с')}</Text><Text style={ui.muted}>{t('среднее время')}</Text></View>
              <View style={{ alignItems: 'center' }}><I n="checkmark-done" /><Text style={ui.h2}>{st.tasks}</Text><Text style={ui.muted}>{t('заданий')}</Text></View>
            </View>
            <Text style={[ui.h2, { marginTop: 20 }]}>{t('Достижения')}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {ACH.map((a) => <Badge key={a.id} icon={a.icon} title={t(a.title)} on={a.ok(st, progress)} />)}
            </View>
            <Btn ghost icon="trash" title={t('Сбросить прогресс')} onPress={() => Alert.alert('Сбросить прогресс?', t('Все результаты будут удалены'), [{ text: t('Отмена') }, { text: t('Сбросить'), style: 'destructive', onPress: reset }])} />
          </>
        )}
        <Btn ghost icon="settings" title={t('Настройки')} onPress={() => navigation.navigate('Settings')} />
        <Btn icon="log-out" title={t('Выйти из аккаунта')} onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}
