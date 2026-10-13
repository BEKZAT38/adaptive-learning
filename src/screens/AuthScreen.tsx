import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { LangPicker } from '../components/LangPicker';
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { Btn, I } from '../components/ui';
import { Role } from '../types';

export default function AuthScreen() {
  const { colors: C, ui, t, fs, lvl } = useSettings();
  const { signIn, register } = useApp();
  const [reg, setReg] = useState(false);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pw, setPw] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [err, setErr] = useState<string | null>(null);
  const submit = () => setErr(reg ? register({ name, login, password: pw, role }) : signIn(login, pw));
  return (
    <SafeAreaView style={ui.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <LangPicker />
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}><I n="school" s={44} c={C.onPrimary} /></View>
          <Text style={[ui.h1, { marginTop: 12 }]}>Adaptive Learning</Text>
          <Text style={ui.muted}>{t('Обучение, которое подстраивается под вас')}</Text>
        </View>
        {reg && <TextInput placeholderTextColor={C.muted} style={ui.input} placeholder={t('Имя и фамилия')} value={name} onChangeText={setName} />}
        <TextInput placeholderTextColor={C.muted} style={ui.input} placeholder={t('Логин')} autoCapitalize="none" value={login} onChangeText={setLogin} />
        <TextInput placeholderTextColor={C.muted} style={ui.input} placeholder={t('Пароль')} secureTextEntry value={pw} onChangeText={setPw} />
        {reg && (
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            {(['student', 'teacher'] as Role[]).map((r) => (
              <Pressable key={r} onPress={() => setRole(r)} style={{ flex: 1, padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1.5, borderColor: role === r ? C.primary : C.line, backgroundColor: role === r ? C.soft : C.card }}>
                <Text style={{ fontWeight: '700', color: role === r ? C.primary : C.muted }}>{r === 'student' ? t('Студент') : t('Преподаватель')}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {err && <Text style={{ color: C.bad, marginTop: 10 }}>{t(err)}</Text>}
        <Btn title={reg ? t('Создать аккаунт') : t('Войти')} onPress={submit} />
        <Btn ghost title={reg ? t('У меня уже есть аккаунт') : t('Создать аккаунт')} onPress={() => { setReg(!reg); setErr(null); }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
