import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from '@types';
import { isNullable } from '@util';

const LOGIN = '@login';

type SerializableLogin = {
  cpf: string;
  password: string;
  lastAccessedAt: string;
};

async function set(login: Login) {
  const serializable: SerializableLogin = {
    ...login,
    lastAccessedAt: login.lastAccessedAt.toISOString(),
  };
  await AsyncStorage.setItem(LOGIN, JSON.stringify(serializable));
}

async function get(): Promise<Login | null> {
  const login = await AsyncStorage.getItem(LOGIN);
  if (isNullable(login)) {
    return null;
  }
  const deserialized: SerializableLogin = JSON.parse(login);
  return {
    ...deserialized,
    lastAccessedAt: new Date(deserialized.lastAccessedAt),
  };
}

export default { get, set };
