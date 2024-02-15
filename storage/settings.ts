import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNullable } from '@util';

const SETTINGS = '@settings';

export type SettingsObject = {
  bioAuth: boolean;
  darkTheme: boolean;
};

async function set(settings: SettingsObject) {
  await AsyncStorage.setItem(SETTINGS, JSON.stringify(settings));
}

async function get(): Promise<SettingsObject | null> {
  const value = await AsyncStorage.getItem(SETTINGS);
  if (isNullable(value)) {
    return null;
  }
  return JSON.parse(value);
}

async function setBioAuth(enabled: boolean): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    await set({ bioAuth: enabled, darkTheme: false });
  } else {
    if (currentSettings.bioAuth !== enabled) {
      await set({ ...currentSettings, bioAuth: enabled });
    }
  }
  return enabled;
}

async function setDarkTheme(enabled: boolean): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    await set({ bioAuth: false, darkTheme: enabled });
  } else {
    if (currentSettings.darkTheme !== enabled) {
      await set({ ...currentSettings, darkTheme: enabled });
    }
  }
  return enabled;
}

async function getBioAuth(): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    return false;
  }
  return currentSettings.bioAuth;
}

async function getDarkTheme(): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    return false;
  }
  return currentSettings.darkTheme;
}

export default { setBioAuth, getBioAuth, setDarkTheme, getDarkTheme };
