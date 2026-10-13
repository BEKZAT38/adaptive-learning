import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Mode, Session } from './progress';

export type RootStackParams = {
  Auth: undefined;
  Tabs: undefined;
  Quiz: { subject: string; mode: Mode; topic?: string };
  Result: { session: Session };
  Student: { index: number };
  Settings: undefined;
};
export type TabParams = { Главная: undefined; Траектория: undefined; Задания: undefined; Прогресс: undefined; Профиль: undefined; Студенты: undefined };
export type TabScreenProps<T extends keyof TabParams> = CompositeScreenProps<BottomTabScreenProps<TabParams, T>, NativeStackScreenProps<RootStackParams>>;
