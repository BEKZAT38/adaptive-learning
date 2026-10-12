import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { Btn, I } from '../components/ui';
import { C, ui } from '../styles/theme';
import { Role } from '../types';

export default function AuthScreen() {
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
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}><I n="school" s={44} c={C.bg} /></View>
          <Text style={[ui.h1, { marginTop: 12 }]}>Adaptive Learning</Text>
          <Text style={ui.muted}>Обучение, которое подстраивается под вас</Text>
        </View>
        {reg && <TextInput placeholderTextColor="#8FB9A3" style={ui.input} placeholder="Имя и фамилия" value={name} onChangeText={setName} />}
        <TextInput placeholderTextColor="#8FB9A3" style={ui.input} placeholder="Логин" autoCapitalize="none" value={login} onChangeText={setLogin} />
        <TextInput placeholderTextColor="#8FB9A3" style={ui.input} placeholder="Пароль" secureTextEntry value={pw} onChangeText={setPw} />
        {reg && (
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            {(['student', 'teacher'] as Role[]).map((r) => (
              <Pressable key={r} onPress={() => setRole(r)} style={{ flex: 1, padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1.5, borderColor: role === r ? C.primary : C.line, backgroundColor: role === r ? C.soft : C.card }}>
                <Text style={{ fontWeight: '700', color: role === r ? C.primary : C.muted }}>{r === 'student' ? 'Студент' : 'Преподаватель'}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {err && <Text style={{ color: C.bad, marginTop: 10 }}>{err}</Text>}
        <Btn title={reg ? 'Создать аккаунт' : 'Войти'} onPress={submit} />
        <Btn ghost title={reg ? 'У меня уже есть аккаунт' : 'Создать аккаунт'} onPress={() => { setReg(!reg); setErr(null); }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
